export const UPDATE_SCORE = 'UPDATE_SCORE';
export const USER_LOGIN = 'USER_LOGIN';

export const updateScore = (newScore) => ({
  type: UPDATE_SCORE,
  newScore,
});

export const userLogin = ({ name, email }) => ({
  type: USER_LOGIN,
  payload: {
    name,
    email,
  },
});
