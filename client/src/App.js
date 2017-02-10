import React, { Component } from 'react';
import PlayerList from './components/PlayerList';
import { get as getPlayers } from './data/players';
import { get as getPositions } from './data/positions';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players : []
    };

    this.handlePlayerSelect = this.handlePlayerSelect.bind(this);
  }

  componentDidMount() {
    getPlayers()
    .then((data) => { this.setState({ players : data }) })
    
    getPositions()
    .then((data) => { console.log(data) })
  }

  handlePlayerSelect(id) {
    console.log(id);
  }

  render() {
    return (
      <div>
        { this.state.players.length ? <PlayerList onPlayerSelect={this.handlePlayerSelect} data={this.state.players} /> : null }
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