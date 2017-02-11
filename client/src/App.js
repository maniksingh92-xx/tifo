import React, { Component } from 'react';
import PlayerList from './components/PlayerList';
import PlayerInfo from './components/PlayerInfo';
import { get as getPlayers } from './data/players';
import { get as getPositions } from './data/positions';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players : [],
      posAssoc : {},
      displayPlayerId: 0
    };

    this.handlePlayerSelect = this.handlePlayerSelect.bind(this);
  }

  componentDidMount() {
    getPlayers()
    .then((data) => { this.setState({ players : data }) })
    
    getPositions()
    .then((data) => { this.setState({ posAssoc : data }) })
  }

  handlePlayerSelect(id) {
    this.setState({ displayPlayerId : id })
  }

  render() {
    var displayPlayer = this.state.players[this.state.displayPlayerId];
    return (
      <div>
        {
          !this.state.players.length ? null :
          (
            <div>
              <PlayerInfo data={displayPlayer} posAssoc={this.state.posAssoc[displayPlayer.Position]} />
              <PlayerList onPlayerSelect={this.handlePlayerSelect} data={this.state.players} />
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