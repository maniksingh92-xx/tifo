import React, { Component } from 'react';
import PlayerList from './components/PlayerList';
import { get as getPlayers } from './data/players';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players : []
    };

  }

  componentDidMount() {
    getPlayers()
    .then((data) => { this.setState({ players : data }) })
  }

  render() {
    return (
      <div>
        { this.state.players.length ? <PlayerList data={this.state.players} /> : null }
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