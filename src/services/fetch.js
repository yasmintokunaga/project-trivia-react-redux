export const fetchQuestionsAnswers = async () => {
  const amountQuestions = 5;
  const token = localStorage.getItem('token');
  const API_TRIVIA = `https://opentdb.com/api.php?amount=${amountQuestions}&token=${token}`;
  const result = await fetch(API_TRIVIA);
  const data = await result.json();
  return data;
};
