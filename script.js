'use strict';
document.addEventListener('DOMContentLoaded', () => {

	const scorePlayer1 = document.querySelector('#score--0'),
				scorePlayer2 = document.querySelector('#score--1'),
				scoreCurrPlayer1 = document.querySelector('#current--0'),
				scoreCurrPlayer2 = document.querySelector('#current--1'),
				elementPlayer1 = document.querySelector('.player--0'),
				elementPlayer2 = document.querySelector('.player--1'),
				diceImage = document.querySelector('.dice'),
				btnNewGame = document.querySelector('.btn--new'),
				btnRollDice = document.querySelector('.btn--roll'),
				btnHoldScore = document.querySelector('.btn--hold'),
				scoresFinal = [0, 0];

	let currentScore = 0,
			activePlayer = 0;

	// Starting initialisation
	startStatement();
	

	// Rolling dice
	btnRollDice.addEventListener('click', () => {
		const diceThrow = Math.trunc(Math.random() * 6) + 1;

		diceImage.classList.remove('hidden');

		diceImage.src = `dice-${diceThrow}.png`;

		if(diceThrow !== 1) {
			currentScore += diceThrow;
			activePlayer === 0 ? scoreCurrPlayer1.textContent = currentScore : scoreCurrPlayer2.textContent = currentScore;
		} else {
			changePlayer();
		}
	})


	// score from current to total
	btnHoldScore.addEventListener('click', () => {
		scoresFinal[activePlayer] += currentScore;
		activePlayer === 0 ? scorePlayer1.textContent = scoresFinal[activePlayer] : scorePlayer2.textContent = scoresFinal[activePlayer];

		if(scoresFinal[activePlayer] >= 100) {
			document.querySelector(`.player--${activePlayer}`).classList.toggle('player--winner');
			document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active');
			diceImage.classList.add('hidden');
			btnHoldScore.disabled = true;
			btnRollDice.disabled = true;
		} else { 
			changePlayer(); 
		}
	});

	// starting new game
	btnNewGame.addEventListener('click', () => {
		startStatement();
	});


	function startStatement() {
		scorePlayer1.textContent = 0;
		scorePlayer2.textContent = 0;
		diceImage.classList.add('hidden');
		scoreCurrPlayer1.textContent = 0;
		scoreCurrPlayer2.textContent = 0;
		activePlayer = 0;
		elementPlayer1.classList.add('player--active');
		elementPlayer1.classList.remove('player--winner');
		elementPlayer2.classList.remove('player--active');
		elementPlayer2.classList.remove('player--winner');
		btnHoldScore.disabled = false;
		btnRollDice.disabled = false;
		scoresFinal[0] = 0;
		scoresFinal[1] = 0;
	}

	function changePlayer() {
		activePlayer === 0 ? scoreCurrPlayer1.textContent = 0 : scoreCurrPlayer2.textContent = 0;
		currentScore = 0;
		activePlayer = activePlayer === 0 ? 1 : 0;

		elementPlayer1.classList.toggle('player--active');
		elementPlayer2.classList.toggle('player--active');
	}

});