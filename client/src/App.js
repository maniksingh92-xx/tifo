import React, { Component } from 'react';
import PlayerList from './components/PlayerList';
import PlayerInfo from './components/PlayerInfo';
import { TeamLayout, TeamList } from './components/TeamLayout';
import { TeamDetails } from './components/TeamDetails';
import { get as getPlayers } from './data/players';
import { get as getPositions } from './data/positions';
import { get as getTeam, update as updateTeam, del as deleteTeam } from './data/team';

import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';

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
      }
    };

    this.handlePlayerSelect = this.handlePlayerSelect.bind(this);
    this.handlePositionSelect = this.handlePositionSelect.bind(this);
    this.handleSortPlayersChange = this.handleSortPlayersChange.bind(this);
    this.handleAssignPlayerToPosition = this.handleAssignPlayerToPosition.bind(this);
    this.handleClearTeam = this.handleClearTeam.bind(this);
    this.setActivePosition = this.setActivePosition.bind(this);
    this.setPlayerToPosition = this.setPlayerToPosition.bind(this);
    this.filterPlayerList = this.filterPlayerList.bind(this);
    this.sortPlayerList = this.sortPlayerList.bind(this);

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
    this.setState({ displayPlayerId: id })
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
      })
  }

  setActivePosition(pos) {
    var filteredPlayerList = this.filterPlayerList(this.players, this.state.posAssoc, pos);
    this.setState({
      colSortDirs: {},
      displayPlayerId: this.state.team[pos] ? this.state.team[pos].id : filteredPlayerList[0].id,
      players: filteredPlayerList,
      activePosition: pos
    });
  }

  setPlayerToPosition(player, pos) {
    var update = {};
    update[pos] = player;
    var updatedTeam = Object.assign({}, this.state.team, update);

    this.updateTeam({ team: updatedTeam }).then((data) => {
      this.setState({
        team: data.team,
        balance: data.balance,
        teamAttributes: data.teamAttributes
      });
    }).catch((e) => { alert("OMG") });
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

  render() {
    var displayPlayer = _find(this.state.players, { id: this.state.displayPlayerId });
    if (displayPlayer) {
      var displayPlayerAssignedPosition = null;
      _forOwn(this.state.team, function (player, pos) {
        if (player && player.id === displayPlayer.id) displayPlayerAssignedPosition = pos;
      });

      return (
        <div>
          <Paper
            zDepth={2}
            rounded={false}
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              bottom: 0,
              "overflowY": "auto",
              width: 320
            }}
            >
            <TeamList
              onPositionSelect={this.handlePositionSelect}
              onClearTeam={this.handleClearTeam}
              team={this.state.team}
              activePosition={this.state.activePosition} />
          </Paper>

          <div
            style={{
              position: "fixed",
              left: 326,
              top: 0,
              bottom: 0,
              right: 0,
              padding: "16px 16px 16px 10px",
              "overflowY": "auto"
            }}
            >
            <div className="d-flex flex-column" style={{ width : 320 }}>
              <PlayerInfo
                player={displayPlayer}
                assignedPosition={displayPlayerAssignedPosition}
                team={this.state.team}
                posAssoc={this.state.posAssoc[displayPlayer.Position]}
                activePosition={this.state.activePosition}
                onAssignPlayerToPostion={this.handleAssignPlayerToPosition} />
              <TeamDetails
                balance={this.state.balance}
                teamAttributes={this.state.teamAttributes} />
            </div>
          </div>
        </div>
      )
    } else {
      return <div>loading ...</div>
    }
  }

  // render() {
  //   var displayPlayer = _find(this.state.players, { id: this.state.displayPlayerId });
  //   return (
  //     <div>
  //       {
  //         this.state.activePosition === null ? null :
  //           (
  //             <div className="d-flex flex-wrap">
  //               <PlayerList
  //                 onSortPlayersChange={this.handleSortPlayersChange}
  //                 colSortDirs={this.state.colSortDirs}
  //                 onPlayerSelect={this.handlePlayerSelect}
  //                 data={this.state.players}
  //                 activePosition={this.state.activePosition} />
  //               <PlayerInfo
  //                 data={displayPlayer}
  //                 team={this.state.team}
  //                 posAssoc={this.state.posAssoc[displayPlayer.Position]}
  //                 activePosition={this.state.activePosition}
  //                 onAssignPlayerToPostion={this.handleAssignPlayerToPosition} />
  //               <TeamLayout
  //                 onPositionSelect={this.handlePositionSelect}
  //                 onClearTeam={this.handleClearTeam}
  //                 data={this.state.team}
  //                 activePosition={this.state.activePosition}
  //                 formation={[4, 3, 3]}
  //                 balance={this.state.balance} />
  //             </div>
  //           )
  //       }
  //     </div>
  //   )
  // }

}
