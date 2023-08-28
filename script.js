const frontElt = document.querySelector(".front");
const numberFlipper = document.querySelector(".flipper");

const inputELt = document.querySelector(".guess");
const messageELt = document.querySelector(".message");

const scoreElt = document.querySelector(".score");
const highScoreElt = document.querySelector(".highscore");

const secretNumberElt = document.querySelector('.secret-number');

const bodyElt = document.querySelector('body');

let gameIsFinished = false;

function randomNumber(min, max) {
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

let secretNumber = randomNumber(1, 20);
console.log(secretNumber);

function handlePlayerWon(currentScore) {
  messageELt.textContent = '🎉🎉🎉 Bravo !';
  bodyElt.classList.add('success');
  secretNumberElt.textContent = secretNumber;
  gameIsFinished = true;
  handleHighScore(currentScore);
  revealSecretNumber();
}

function handleHighScore(currentScore) {
  const highscore = Number(highScoreElt.textContent);

  if (currentScore > highscore) {
    highScoreElt.textContent = currentScore;
  }
}

function handleWrongNumber(message, currentScore) {
  messageELt.textContent = message;
  playErrorAnimation();
  decreaseScore(currentScore);
}

function handlePlayerLost() {
  messageELt.textContent = "Tu as perdu !";
  bodyElt.classList.add('lost');
  gameIsFinished = true;
}

function onCheckButtonClick() {

  if (gameIsFinished) return;

  if (inputELt.value === "") {
    messageELt.textContent = "Il faut préciser un nombre !";
    return;
  }

  const guess = Number(inputELt.value);

  if (isNaN(guess)) {
    messageELt.textContent = "Ceci n'est pas un nombre !";
    return;
  }

  const score = Number(scoreElt.textContent);

  if (guess === secretNumber) {
    handlePlayerWon(score);
  } else if(guess < secretNumber) {
    handleWrongNumber('Trop petit !', score);
  } else {
    handleWrongNumber('Trop grand !', score);
  }

  if (score === 0) {
    handlePlayerLost();
  }
}

function decreaseScore(currentScore) {
  let newScore = currentScore - 1;
  scoreElt.textContent = newScore.toString();
}

function playErrorAnimation() {
  frontElt.classList.add("error-animation");
  setTimeout(() => {
    frontElt.classList.remove("error-animation");
  }, 400);
}

function revealSecretNumber() {
  numberFlipper.classList.add("reveal");
}

function hideSecretNumber() {
  numberFlipper.classList.remove("reveal");
}

function resetGame() {
  messageELt.textContent = 'Commence à deviner...';
  inputELt.style.width = '25rem';
  inputELt.value = '';
  scoreElt.textContent = 20;

  bodyElt.classList.remove('lost');
  bodyElt.classList.remove('success');

  hideSecretNumber();

  secretNumber = randomNumber(1, 20);
  console.log(secretNumber);

  gameIsFinished = false;
}

// mes super animations

//playErrorAnimation();
//revealSecretNumber();
