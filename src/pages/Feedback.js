import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import './Feedback.css';

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
      <div className="feedback-page">
        <Header />
        <main className="box">
          <p
            data-testid="feedback-text"
            className={
              `title is-3 ${assertions < THREE ? 'has-text-danger' : 'has-text-success'}`
            }
          >
            {
              assertions < THREE ? 'Could be better...' : 'Well Done!'
            }
          </p>
          <p>
            <span className="has-text-weight-semibold">Pontuação total:</span>
            {' '}
            <span data-testid="feedback-total-score">{ score }</span>
          </p>
          <p>
            <span className="has-text-weight-semibold">Quantidade de acertos:</span>
            {' '}
            <span data-testid="feedback-total-question">{ assertions }</span>
          </p>
          <div>
            <button
              data-testid="btn-play-again"
              onClick={ this.handleClick }
              className="button is-link is-outlined mr-2"
            >
              Play Again
            </button>
            <button
              type="button"
              data-testid="btn-ranking"
              onClick={ this.handleBtnRanking }
              className="button is-link"
            >
              Ranking
            </button>
          </div>
        </main>
      </div>
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
