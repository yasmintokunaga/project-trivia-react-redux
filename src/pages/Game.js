import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    showNextButton: false,
    questionIndex: 0,
    totalQuestions: 5,
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
        this.handleClick(null, true);
      }
    }, timeOut);
  };

  returnFetchQuastionAnswers = async () => {
    const { questionIndex } = this.state;
    const data = await fetchQuestionsAnswers();
    const codeError = 3;
    if (data.response_code === codeError) {
      const { history } = this.props;
      localStorage.clear();
      return history.push('/');
    }
    const { results } = data;
    const { correct_answer: correct,
      incorrect_answers: incorrects } = results[questionIndex];
    this.setState({
      currentQuestion: results[questionIndex],
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

  handleClick = (answer, isTimeout = false) => {
    const { dispatch } = this.props;
    const MAGIC_NUMBER = 10;
    const { counter, currentQuestion, score } = this.state;
    const { difficulty, correct_answer: correctAnswer } = currentQuestion;
    if (!isTimeout && answer === correctAnswer) {
      const difficultyValue = { easy: 1, medium: 2, hard: 3 };
      const newScore = score + MAGIC_NUMBER + (counter * difficultyValue[difficulty]);
      dispatch({ type: 'UPDATE_SCORE', newScore });
      this.setState({
        score: newScore,
      });
    }
    this.setState({
      verifyAnswer: true,
      showNextButton: true,
    });
  };

  handleNextQuestion = () => {
    const { history } = this.props;
    const { questionIndex, totalQuestions } = this.state;
    if (questionIndex + 1 === totalQuestions) {
      history.push('/feedback');
    } else {
      this.setState(
        (prevState) => ({
          questionIndex: prevState.questionIndex + 1,
          counter: 30,
          disabledButtons: false,
          verifyAnswer: false,
          showNextButton: false,
        }),
        () => {
          this.returnFetchQuastionAnswers();
        },
      );
    }
  };

  render() {
    const {
      playerName,
      score,
      currentQuestion,
      shuffleAnswers,
      counter,
      disabledButtons,
      showNextButton,
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
              onClick={ () => this.handleClick(answer) }
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
        {showNextButton && (
          <button
            data-testid="btn-next"
            onClick={ this.handleNextQuestion }
          >
            Next
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dispatch: state.dispatch,
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,

};

export default connect(mapStateToProps)(Game);
