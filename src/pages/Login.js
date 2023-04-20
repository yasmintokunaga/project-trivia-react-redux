import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    disabledButtonEnter: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => this.verifyButtonEnter());
  };

  verifyButtonEnter = () => {
    const { name, email } = this.state;
    if (
      name.length > 0
      && email.length > 0
      && email.includes('@')
      && email.includes('.')
    ) {
      this.setState({ disabledButtonEnter: false });
    } else {
      this.setState({ disabledButtonEnter: true });
    }
  };

  handleClick = async () => {
    const resultToken = await fetch('https://opentdb.com/api_token.php?command=request');
    const dataToken = await resultToken.json();
    console.log(dataToken);

    localStorage.setItem('token', dataToken.token);
    const { history } = this.props;
    history.push('/Game');
  };

  redirectSettings = () => {
    const { history } = this.props;
    history.push('/Settings');
  };


  render() {
    const { name, email, disabledButtonEnter } = this.state;
    return (
      <main>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          data-testid="input-player-name"
          onChange={ this.handleChange }
          value={ name }
        />
        <input
          type="text"
          name="email"
          placeholder="E-mail"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
          value={ email }
        />
        <button
          data-testid="btn-play"
          disabled={ disabledButtonEnter }
          onClick={ this.handleClick }
        >
          Play
        </button>
        <button
            type="button"
            data-testid="btn-settings"
            id="btnSettings"
            className="btnSettings"
            onClick={ this.redirectSettings }
          >
            Settings
        </button>
      </main>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
