/*
 Game Rules:
 1. The Game consist of two players playing in rounds/turns
 2. You can keep rolling the dice as much as you want and the dice value is added to your round score
 3. Once you roll a One, your current score is cleared and it is the other player turn.
 4. Clicking on the hold button will add your current scor to your score board
 5. The first person who get to 100 ponts first on the main score boarg is the winner of the game
 */

var roundScore, score, activePlayer, gamePlaying;

// Calling the function that initializes the game
 init();

 // Event listener for the roll dice button
document.querySelector('.btn--roll').addEventListener('click', function(){
    // checking if gamplaying is true
    if (gamePlaying){
        // 1. generate a random number
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2. set the value of the random number to the dice
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'images/dice-' + dice + '.png';
    // 3. check score
    if(dice !== 1){
        // add the value of the dice to the current score and print it out
        roundScore += dice;
        document.getElementById('current--' + activePlayer).textContent = roundScore;
    }

    else{
        // Next Player
        nextPlayer();
    }

    }
});

// Event listner for the hold button
document.querySelector('.btn--hold').addEventListener('click', function(){
    if(gamePlaying){
        // Assign the curent score to the global score variable
    score[activePlayer] += roundScore;
    // implement score in the UI
    document.querySelector('#score--' + activePlayer).textContent = score[activePlayer];
    
    // checking if player won
    if(score[activePlayer] >= 100){
        document.querySelector('#name--' + activePlayer).textContent = "Winner!"; 
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player--' + activePlayer).classList.remove('player--active');
        document.querySelector('.player--' + activePlayer).classList.add('player--winner');
        gamePlaying = false;
    }
    
    // Next Player
    nextPlayer();
    }
    
});

// Event listener for the new game button
document.querySelector('.btn--new').addEventListener('click', init);

//creating a function for next player
function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        // changing the current score to 0 once the dice value is 1
        document.getElementById('current--0').textContent = '0';
        document.getElementById('current--1').textContent = '0';

        // toggling the active class between active players
        document.querySelector('.player--0').classList.toggle('player--active');
        document.querySelector('.player--1').classList.toggle('player--active');

        document.querySelector('.dice').style.display = 'none';

} //end of nextPlayer function


//Creating the function that initializes the game
function init(){
    gamePlaying = true;
    roundScore = 0;
    score = [0,0];
    activePlayer = 0;

    // setting the dice display property to none
    document.querySelector('.dice').style.display = "none";

    // changing the value of the score n current score to 0
    document.getElementById('score--0').textContent = "0";
    document.getElementById('score--1').textContent = "0";
    document.getElementById('current--0').textContent = "0";
    document.getElementById('current--1').textContent = "0";
    document.getElementById('name--0').textContent = 'player 1';
    document.getElementById('name--1').textContent = 'player 2';
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1' ).classList.remove('player--winner');
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
}