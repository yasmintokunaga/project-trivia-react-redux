import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  componentDidMount() {
    const { score, name, gravatarEmail } = this.props;
    const updateRanking = {
      name,
      gravatarEmail,
      score,
      hash: MD5(gravatarEmail).toString(),
    };

    const ranking = localStorage.getItem('ranking')
      ? JSON.parse(localStorage.getItem('ranking')) : [];
    ranking.push(updateRanking);
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleBtnRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const THREE = 3;
    return (
      <>
        <Header />
        <p data-testid="feedback-text">
          {
            assertions < THREE ? 'Could be better...' : 'Well Done!'
          }
        </p>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <button
          data-testid="btn-play-again"
          onClick={ this.handleClick }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleBtnRanking }
        >
          Ranking
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
