import { UPDATE_SCORE } from '../actions/index';

const initialState = {
  player: {
    score: 0,
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
      },
    };
  default:
    return state;
  }
};

export default rootReducer;
