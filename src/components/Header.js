import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import './Header.css';

class Header extends Component {
  render() {
    const { playerName, score, email } = this.props;
    const hash = md5(email);
    const gravatarUrl = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <header className="box container-header">
        <img
          data-testid="header-profile-picture"
          src={ gravatarUrl }
          alt="Profile"
        />
        <h2
          className="mt-3 title is-3"
          data-testid="header-player-name"
        >
          {playerName}
        </h2>
        <span className="mt-1 subtitle is-4">
          Score:
          {' '}
          <h3 data-testid="header-score">{score}</h3>
        </span>
      </header>
    );
  }
}

Header.propTypes = {
  playerName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.player.name,
  score: state.player.score,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
