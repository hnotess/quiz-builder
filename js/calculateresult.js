// local storage method for user answers
var userAnswers = localStorage.getItem('userAnswers');
userAnswers = userAnswers.split(',');
// index 0 comes over as empty - remove it and shift elements
userAnswers.splice(0, 1);
// if no answer to one of the questions
for (i = 0; i < userAnswers.length; i++) {
  if (userAnswers[i] === '') {
    userAnswers.splice(i, 1, 'No answer');
  }
}
// local storage method for correct answers
var correctAnswers = localStorage.getItem('correctAnswers');
correctAnswers = correctAnswers.split(',');

//calculates the percent correct
function checkResult(userAnswers, correctAnswers) {
  var score = 0;
  for (var i = 0; i < userAnswers.length; i++) {
    if (userAnswers[i] === correctAnswers[i]) {
      score++;
    }
  }
  score = ((score / correctAnswers.length) * 100).toFixed();
  return score;
}

//display result in success page
function displayResult() {
  $('.result').html('You scored <span class="displayPercent">' + checkResult(userAnswers, correctAnswers) + ' percent</span> on the quiz!');
}
window.onload = displayResult;
