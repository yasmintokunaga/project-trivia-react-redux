import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  state = {
    gravatarUrl: '',
  };

  componentDidMount() {
    const email = localStorage.getItem('email');
    const hash = md5(email);
    this.setState({ gravatarUrl: `https://www.gravatar.com/avatar/${hash}` });
  }

  render() {
    const { playerName, score } = this.props;
    const { gravatarUrl } = this.state;

    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ gravatarUrl }
          alt="Profile"
        />
        <h2 data-testid="header-player-name">{playerName}</h2>
        <h3 data-testid="header-score">{`Score: ${score}`}</h3>
      </header>
    );
  }
}

Header.propTypes = {
  playerName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default Header;
