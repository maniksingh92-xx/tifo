import React, { Component } from 'react';
import PlayerList from './components/PlayerList';
import PlayerInfo from './components/PlayerInfo';
import TeamLayout from './components/TeamLayout';
import { get as getPlayers } from './data/players';
import { get as getPositions } from './data/positions';
import { get as getTeam, update as updateTeam } from './data/team';

import _findKey from 'lodash/findKey';
import _find from 'lodash/find';
import _filter from 'lodash/filter';
import _indexOf from 'lodash/indexOf';
import _orderBy from 'lodash/orderBy';

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
      balance: null
    };

    this.handlePlayerSelect = this.handlePlayerSelect.bind(this);
    this.handlePositionSelect = this.handlePositionSelect.bind(this);
    this.handleSortPlayersChange = this.handleSortPlayersChange.bind(this);
    this.handleAssignPlayerToPosition = this.handleAssignPlayerToPosition.bind(this);
    this.setActivePosition = this.setActivePosition.bind(this);
    this.setPlayerToPosition = this.setPlayerToPosition.bind(this);
    this.getPlayers = getPlayers.bind(this);
    this.getPositions = getPositions.bind(this);
    this.getTeam = getTeam.bind(this)
    this.updateTeam = updateTeam.bind(this);
    this.filterPlayerList = this.filterPlayerList.bind(this);
    this.sortPlayerList = this.sortPlayerList.bind(this);
  }

  componentDidMount() {

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
                  balance: data.balance
                });
                this.setActivePosition(_findKey(this.state.team, function (o) { return o == null }));
              });
          })
      });
  }

  componentDidUpdate(prevProps, prevState) {}

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

  setActivePosition(pos) {
    var filteredPlayerList = this.filterPlayerList(this.players, this.state.posAssoc, pos);
    this.setState({
      colSortDirs : {},
      displayPlayerId: this.state.team[pos] ? this.state.team[pos].id : filteredPlayerList[0].id,
      players: filteredPlayerList,
      activePosition: pos
    });
  }

  setPlayerToPosition(player, pos) {
    var update = {};
    update[pos] = player;
    var updatedTeam = Object.assign({}, this.state.team, update);
    
    this.updateTeam({team: updatedTeam}).then((data) => {
      this.setState({
        team: data.team,
        balance: data.balance
      });
    }).catch((e) => {alert("OMG")});
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
    return (
      <div>
        {
          this.state.activePosition === null ? null :
            (
              <div className="d-flex flex-wrap">
                <PlayerList
                  onSortPlayersChange={this.handleSortPlayersChange}
                  colSortDirs={this.state.colSortDirs}
                  onPlayerSelect={this.handlePlayerSelect}
                  data={this.state.players}
                  activePosition={this.state.activePosition} />
                <PlayerInfo
                  data={displayPlayer}
                  team={this.state.team}
                  posAssoc={this.state.posAssoc[displayPlayer.Position]}
                  activePosition={this.state.activePosition}
                  onAssignPlayerToPostion={this.handleAssignPlayerToPosition} />
                <TeamLayout
                  onPositionSelect={this.handlePositionSelect}
                  data={this.state.team}
                  activePosition={this.state.activePosition}
                  formation={[4,3,3]} />
              </div>
            )
        }
      </div>
    )
  }
}

// export default function App() {

//   var playerData = [];

//   getPlayers()
//   .then((data) => {playerData = data});

//   return (
//     <div>
//       {playerData.length ? (<PlayerList players={playerData} />) : null}
//     </div>
//   );
// }