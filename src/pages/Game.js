import React from 'react';
import Header from '../components/Header';

class Game extends React.Component {
  state = {
    playerName: '',
    score: 0,
  };

  componentDidMount() {
    const playerName = localStorage.getItem('name') || '';
    this.setState({ playerName });
  }

  render() {
    const { playerName, score } = this.state;

    return (
      <div>
        <Header playerName={ playerName } score={ score } />
        <div>Game</div>
      </div>
    );
  }
}

export default Game;
