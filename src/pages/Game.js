import React from 'react';
import Header from '../components/Header';
import { fetchQuestionsAnswers } from '../services/fetch';
import PropTypes from 'prop-types';

class Game extends React.Component {
  state = {
    playerName: '',
    score: 0,
    currentQuestion: {},
    shuffleAnswers: [],
  };

  componentDidMount() {
    const playerName = localStorage.getItem('name') || '';
    this.setState({ playerName });
    this.returnFetchQuastionAnswers();
  }

  returnFetchQuastionAnswers = async () => {
    const data = await fetchQuestionsAnswers();

    const codeError = 3;
    if (data.response_code === codeError) {
      const { history } = this.props;
      localStorage.clear();
      return history.push('/');
    }

    const { results } = data;
    const { correct_answer: correct, incorrect_answers: incorrects } = results[0];
    this.setState({
      currentQuestion: results[0],
      shuffleAnswers: this.displayShuffleAnswers(correct, incorrects),
    });
  };

  getRandomInt = (max) => Math.floor(Math.random() * max);

  displayShuffleAnswers = (correct, incorrects) => {
    const answers = [correct, ...incorrects];
    const shuffleAnswers = [];
    while (answers.length > 0) {
      const indexRandom = this.getRandomInt(answers.length);
      shuffleAnswers.push(answers[indexRandom]);
      answers.splice(indexRandom, 1);
    }
    return shuffleAnswers;
  };

  render() {
    const { playerName, score, currentQuestion, shuffleAnswers } = this.state;

    return (
      <div>
        <Header playerName={ playerName } score={ score } />
        <h3
          data-testid="question-category"
        >
          { currentQuestion.category }
        </h3>
        <p
          data-testid="question-text"
        >
          { currentQuestion.question }
        </p>
        <div data-testid="answer-options">
          { shuffleAnswers.map((answer, index) => (
            <button
              key={ answer }
              data-testid={
                answer === currentQuestion.correct_answer
                  ? 'correct-answer' : `wrong-answer-${index}`
              }
            >
              { answer }
            </button>
          ))}
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
