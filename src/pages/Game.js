import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestionsAnswers } from '../services/fetch';
import './Game.css';

class Game extends React.Component {
  state = {
    playerName: '',
    score: 0,
    currentQuestion: {},
    shuffleAnswers: [],
    verifyAnswer: false,
    counter: 30,
    disabledButtons: false,
  };

  componentDidMount() {
    const playerName = localStorage.getItem('name') || '';
    this.setState({ playerName });
    this.returnFetchQuastionAnswers();
    this.startTimer();
  }

  startTimer = () => {
    const timeOut = 1000;
    setInterval(() => {
      const { counter } = this.state;
      this.setState({ counter: counter === 0 ? 0 : counter - 1 });
      if (counter <= 0) {
        this.setState({
          disabledButtons: true,
        });
        this.handleClick();
      }
    }, timeOut);
  };

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

  configDataTestIdButton = (answer, index) => {
    const { currentQuestion: { correct_answer: correct } } = this.state;
    return answer === correct ? 'correct-answer' : `wrong-answer-${index}`;
  };

  styleButton = (answer) => {
    const { verifyAnswer, currentQuestion: { correct_answer: correct } } = this.state;
    if (verifyAnswer && answer === correct) return 'correct-answer';
    if (verifyAnswer && answer !== correct) return 'incorrect-answer';
  };

  handleClick = () => {
    this.setState({
      verifyAnswer: true,
    });
  };

  render() {
    const {
      playerName,
      score,
      currentQuestion,
      shuffleAnswers,
      counter,
      disabledButtons,
    } = this.state;

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
              data-testid={ this.configDataTestIdButton(answer, index) }
              className={ this.styleButton(answer) }
              onClick={ () => this.handleClick() }
              disabled={ disabledButtons }
            >
              { answer }
            </button>
          ))}
        </div>
        <div>
          <p>Contagem Regressiva</p>
          { counter }
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
