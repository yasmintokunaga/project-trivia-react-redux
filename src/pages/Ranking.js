import React from 'react';
import PropTypes from 'prop-types';

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
      <>
        <h1 id="ranking" data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          Início
        </button>
        <ul>
          { listRanking.map(({ name, gravatarEmail, score, hash }, index) => (
            <li key={ index }>
              <p>
                Nome:
                {' '}
                <span data-testid={ `player-name-${index}` }>{ name }</span>
              </p>
              <p>
                Email:
                {' '}
                <span>{ gravatarEmail }</span>
              </p>
              <p>
                Score:
                {' '}
                <span data-testid={ `player-score-${index}` }>{ score }</span>
              </p>
              <img
                src={ `https://www.gravatar.com/avatar/${hash}` }
                alt="foto-perfil"
              />
            </li>
          ))}
        </ul>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Ranking;
