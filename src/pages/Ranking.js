import React from 'react';
import PropTypes from 'prop-types';
import './Ranking.css';

class Ranking extends React.Component {
  state = {
    listRanking: [],
  };

  componentDidMount() {
    const ONE_NEGATIVE = -1;
    this.setState({
      listRanking: JSON.parse(localStorage.getItem('ranking'))
        .sort((a, b) => (a.score > b.score ? ONE_NEGATIVE : 1)),
    });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { listRanking } = this.state;
    return (
      <main className="ranking-page">
        <h1
          id="ranking"
          data-testid="ranking-title"
          className="title is-2 has-text-white"
        >
          Ranking
        </h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
          className="button is-link"
        >
          Início
        </button>
        <ul>
          { listRanking.map(({ name, gravatarEmail, score, hash }, index) => (
            <li key={ index } className="card is-size-6">
              <img
                src={ `https://www.gravatar.com/avatar/${hash}` }
                alt="foto-perfil"
              />
              <div className="m-2 li-container">
                <p className="has-text-weight-semibold">
                  <span data-testid={ `player-name-${index}` }>{ name }</span>
                </p>
                <p>
                  <span>{ gravatarEmail }</span>
                </p>
                <p className="has-text-weight-semibold has-text-link">
                  Score:
                  {' '}
                  <span data-testid={ `player-score-${index}` }>{ score }</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </main>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
