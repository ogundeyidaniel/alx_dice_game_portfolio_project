'use strict';

const player_0_Active_Class = document.querySelector('.player--0');
const player_1_Active_Class = document.querySelector('.player--1');
const diceImg = document.querySelector('.dice');
const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const scorePlayer0 = document.querySelector('#score--0');
const scorePlayer1 = document.getElementById('score--1');
const currentScorePlayer0 = document.getElementById('current--0');
const currentScorePlayer1 = document.getElementById('current--1');

// scorePlayer0.textContent = 0;
// scorePlayer1.textContent = 0;
// diceImg.classList.add('hidden');

let score;
let currentScore;
let activePlayer;
let playing;

//Starting Conditions
const init = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scorePlayer0.textContent = 0;
  scorePlayer1.textContent = 0;
  currentScorePlayer0.textContent = 0;
  currentScorePlayer1.textContent = 0;

  diceImg.classList.add('hidden');
  player_0_Active_Class.classList.remove('player--winner');
  player_1_Active_Class.classList.remove('player--winner');
  player_0_Active_Class.classList.add('player--active');
  player_1_Active_Class.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player_0_Active_Class.classList.toggle('player--active');
  player_1_Active_Class.classList.toggle('player--active');
};

//Rolling dice functionality
btnRollDice.addEventListener('click', function () {
  if (playing) {
    //1. Generating a Random Class Roll
    const randNumber = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceImg.src = `dice-${randNumber}.png`;
    diceImg.classList.remove('hidden');

    //3. Check for rolled 1: if true, switch to the next player
    if (randNumber !== 1) {
      //Add dice to the current score
      currentScore += randNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // currentScorePlayer0.textContent = currentScore;

      // Change Later;
    } else {
      //Switching Player
      switchPlayer();
      // currentScorePlayer1.textContent = currentScore;
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // 2. Check if current player's score .= 50;
    if (score[activePlayer] >= 50) {
      // End Game
      playing = false;
      diceImg.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 3. Switch to the next player
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener('click', function () {
  init();
});
