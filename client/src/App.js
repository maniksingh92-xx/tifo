import React, { Component } from 'react';
import PlayerList from './components/PlayerList';
import PlayerInfo from './components/PlayerInfo';
import { TeamList } from './components/TeamLayout';
import { TeamDetails } from './components/TeamDetails';
import { RecommendedPlayerList } from './components/RecommendedPlayerList';
import { get as getPlayers } from './data/players';
import { get as getPositions } from './data/positions';
import { get as getTeam, update as updateTeam, del as deleteTeam } from './data/team';
import { blueGrey300, pink50, green100, orange900, grey900 } from 'material-ui/styles/colors';

import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';

import _findKey from 'lodash/findKey';
import _find from 'lodash/find';
import _filter from 'lodash/filter';
import _indexOf from 'lodash/indexOf';
import _orderBy from 'lodash/orderBy';
import _forOwn from 'lodash/forOwn';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.players = [];
    this.state = {
      players: [],
      posAssoc: {},
      colSortDirs: {},
      displayPlayerId: null,
      activePosition: null,
      team: {
        "LW": null,
        "ST": null,
        "RW": null,
        "RM": null,
        "CM": null,
        "LM": null,
        "LB": null,
        "LCB": null,
        "RCB": null,
        "RB": null,
        "GK": null
      },
      balance: null,
      teamAttributes: {
        "attack": 0,
        "mid": 0,
        "defence": 0
      },
      recommendedPlayers: null,
      snackbarOpen: false,
      snackbarMessage: ""
    };

    this.handlePlayerSelect = this.handlePlayerSelect.bind(this);
    this.handlePositionSelect = this.handlePositionSelect.bind(this);
    this.handleSortPlayersChange = this.handleSortPlayersChange.bind(this);
    this.handleAssignPlayerToPosition = this.handleAssignPlayerToPosition.bind(this);
    this.handleClearTeam = this.handleClearTeam.bind(this);

    this.displayPlayer = this.displayPlayer.bind(this);
    this.setActivePosition = this.setActivePosition.bind(this);
    this.setPlayerToPosition = this.setPlayerToPosition.bind(this);
    this.filterPlayerList = this.filterPlayerList.bind(this);
    this.sortPlayerList = this.sortPlayerList.bind(this);
    this.showSnackbar = this.showSnackbar.bind(this);
    this.handleSnackbarRequestClose = this.handleSnackbarRequestClose.bind(this);

    this.getPlayers = getPlayers.bind(this);
    this.getPositions = getPositions.bind(this);
    this.getTeam = getTeam.bind(this)
    this.updateTeam = updateTeam.bind(this);
    this.deleteTeam = deleteTeam.bind(this);
  }

  componentWillMount() {

    this.getPlayers()
      .then((data) => {
        this.players = data;
        this.getPositions()
          .then((data) => {
            this.setState({ posAssoc: data });
            this.getTeam()
              .then((data) => {
                this.setState({
                  team: data.team,
                  balance: data.balance,
                  teamAttributes: data.teamAttributes
                });
                this.setActivePosition(_findKey(this.state.team, function (o) { return o == null }));
              });
          })
      });
  }

  componentDidUpdate(prevProps, prevState) { }

  handlePlayerSelect(id) {
    this.displayPlayer(id);
  }

  handlePositionSelect(pos) {
    this.setActivePosition(pos);
  }

  handleSortPlayersChange(columnKey) {
    this.sortPlayerList(columnKey);
  }

  handleAssignPlayerToPosition(player, pos) {
    this.setPlayerToPosition(player, pos);
  }

  handleClearTeam() {
    this.deleteTeam()
      .then((data) => {
        this.setState({
          team: data.team,
          balance: data.balance,
          teamAttributes: data.teamAttributes
        });
        this.showSnackbar(`Team cleared!`)
      })
  }

  displayPlayer(id) {
    this.setState({ displayPlayerId: id })
  }

  setActivePosition(pos) {
    var filteredPlayerList = this.filterPlayerList(this.players, this.state.posAssoc, pos);
    this.displayPlayer(this.state.team[pos] ? this.state.team[pos].id : filteredPlayerList[0].id);
    this.setState({
      colSortDirs: {},
      players: filteredPlayerList,
      activePosition: pos
    });
  }

  setPlayerToPosition(player, pos) {
    if ((this.state.balance +
        (this.state.team[pos] ? this.state.team[pos].Price : 0) -
        player.Price) < 0) {
      this.showSnackbar(`Error: Insufficient funds for ${player.Name}, release expensive player(s)`);
      return;
    }
    var assignedPlayer = _find(this.state.team, { id: player.id });
    if (assignedPlayer) {
      this.showSnackbar(`Error: ${player.Name} is already assigned to ${pos}`);
      return;
    }
    var update = {};
    update[pos] = player;
    var updatedTeam = Object.assign({}, this.state.team, update);

    this.updateTeam({ team: updatedTeam }).then((data) => {
      this.setState({
        team: data.team,
        balance: data.balance,
        teamAttributes: data.teamAttributes
      });
      this.showSnackbar(`${player.Name} assigned to ${pos}`);
    }).catch((e) => { this.showSnackbar(`Error updating team!`) });
  }

  sortPlayerList(columnKey) {
    const SortTypes = {
      ASC: 'asc',
      DESC: 'desc',
    };

    var sortDir = reverseSortDirection(this.state.colSortDirs[columnKey]);
    this.setState((prevState, props) => ({
      players: _orderBy(prevState.players, [columnKey, "Rating"], [sortDir, "desc"]),
      colSortDirs: { [columnKey]: sortDir }
    }));


    function reverseSortDirection(sortDir) {
      return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
    }
  }

  filterPlayerList(players, posAssoc, pos) {
    return _filter(players, filterFunc);

    function filterFunc(player) {
      return _indexOf(posAssoc[pos], player.Position) > -1;
    }
  }

  showSnackbar(message) {
    this.setState({
      snackbarOpen: true,
      snackbarMessage: message
    });
  }

  handleSnackbarRequestClose() {
    this.setState({ snackbarOpen: false });
  }  

  render() {
    var displayPlayer = _find(this.players, { id: this.state.displayPlayerId });
    if (displayPlayer) {
      var displayPlayerAssignedPosition = null;
      _forOwn(this.state.team, function (player, pos) {
        if (player && player.id === displayPlayer.id) displayPlayerAssignedPosition = pos;
      });

      return (
        <div>
          <Snackbar
            open={this.state.snackbarOpen}
            message={this.state.snackbarMessage}
            autoHideDuration={6000}
            onRequestClose={this.handleSnackbarRequestClose}
          />
          <Paper
            zDepth={2}
            rounded={false}
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              bottom: 0,
              "overflowY": "auto",
              width: 320,
              backgroundColor: orange900
            }}
            >
            <TeamList
              onPositionSelect={this.handlePositionSelect}
              onClearTeam={this.handleClearTeam}
              team={this.state.team}
              activePosition={this.state.activePosition} />
          </Paper>

          <div
            className="d-flex flex-column"
            style={{
              position: "fixed",
              left: 320,
              top: 0,
              bottom: 0,
              right: 0,
              padding: "16px 16px 16px 10px",
              overflowY: "auto",
              backgroundColor: grey900
            }}
            >
            <div className="d-flex align-items-start" style={{ marginBottom: 16, height: 334 }}>
              <PlayerInfo
                player={displayPlayer}
                assignedPosition={displayPlayerAssignedPosition}
                posAssoc={this.state.posAssoc[displayPlayer.Position]}
                activePosition={this.state.activePosition}
                onAssignPlayerToPostion={this.handleAssignPlayerToPosition} />
              <TeamDetails
                balance={this.state.balance}
                teamAttributes={this.state.teamAttributes} />
              <RecommendedPlayerList
                activePosition={this.state.activePosition}
                onAssignPlayerToPostion={this.handleAssignPlayerToPosition}
                displayPlayerId={this.state.displayPlayerId} />
            </div>
            <div className="d-flex">
              <PlayerList
                onSortPlayersChange={this.handleSortPlayersChange}
                colSortDirs={this.state.colSortDirs}
                onPlayerSelect={this.handlePlayerSelect}
                players={this.state.players}
                activePosition={this.state.activePosition} />
            </div>
          </div>
        </div>
      )
    } else {
      return <div>loading ...</div>
    }
  }

}
