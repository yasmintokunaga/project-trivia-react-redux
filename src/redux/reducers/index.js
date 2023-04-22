import { UPDATE_SCORE, USER_LOGIN } from '../actions/index';

const initialState = {
  player: {
    score: 0,
    name: '',
    gravatarEmail: '',
    assertions: 0,
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
  case UPDATE_SCORE:
    return {
      ...state,
      player: {
        ...state.player,
        score: action.newScore,
        assertions: state.player.assertions + 1,
      },
    };
  case USER_LOGIN:
    return {
      ...state,
      player: {
        ...state.player,
        name: action.payload.name,
        gravatarEmail: action.payload.email,
      },
    };
  default:
    return state;
  }
};

export default rootReducer;
