"use strict"
// selecting elemets
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.getElementById("current--0")
const current1El = document.getElementById("current--1")
const diseEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new")
const btnroll = document.querySelector(".btn--roll")
const btnHold = document.querySelector(".btn--hold")

let scores, currentScore, activePlayer, playing;
// intialitiation
function init() {
    scores = [0, 0]
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diseEl.classList.add("hidden")
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
}
init()
// switching player
function switching() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle("player--active")
    player1El.classList.toggle("player--active")
}

// rolling dise function
btnroll.addEventListener("click", function () {
    if (playing) {

        // generate random number
        const dice = Math.trunc(Math.random() * 6) + 1
        // display dise
        diseEl.classList.remove("hidden")
        diseEl.src = `dice-${dice}.png`

        //check for rolled 1  
        if (dice !== 1) {
            // add dice to current
            currentScore += dice
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            //swith player
            switching()
        }
    }
})
// hold btn
btnHold.addEventListener("click", function () {
    if (playing) {

        // add current score to active player score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        // if player score >= 100 fish game
        if (scores[activePlayer] >= 100) {
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
            playing = false;
            diseEl.classList.add("hidden")
        } else {
            // swith next player
            switching()
        }
    }
})
// rest btn
btnNew.addEventListener("click", init)