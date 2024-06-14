
// set our current score to store whatever we have in local storage object from all previous games
// if our local storage has null values/is falsy, then OR statement will assign default values to score object
let score = JSON.parse(localStorage.getItem('score'))
    || {
        wins: 0,
        losses: 0,
        ties: 0
    };

updateScoreElement();
/*
// if score is null, !score => true, and vice versa
if (!score){
    score = {
        wins: 0,
        losses: 0,
        ties: 0
    };
}
 */

function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';
    
    if (playerMove === 'rock'){
        if (computerMove === 'rock')
            result = 'Tie!';
        else if (computerMove === 'paper')
            result = 'You Lose!';
        else
            result = 'You Win!';
    }
    else if (playerMove === 'paper'){
        if (computerMove === 'rock')
            result = 'You Win!';
        else if (computerMove === 'paper')
            result = 'Tie!';
        else
            result = 'You Lose!';
    }
    else{
        if (computerMove === 'rock')
            result = 'You Lose!';
        else if (computerMove === 'paper')
            result = 'You Win!';
        else
            result = 'Tie!';
    }
    
    if (result === 'You Win!')
        score.wins++;
    else if (result === 'You Lose!')
        score.losses++;
    else
        score.ties++;
    
    // local storage only supports strings so this is why we convert our js object into json string
    localStorage.setItem('score', JSON.stringify(score)); // store score in local storage object
    updateScoreElement();
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves')
        .innerHTML = `You <img src="images/${playerMove}-emoji.png" class="move-icon">
												<img src="images/${computerMove}-emoji.png" class="move-icon"> Computer`;
}

function updateScoreElement(){
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
    const randomNumber = Math.random();
    
    if (randomNumber >= 0 && randomNumber < 1/3)
        computerMove = 'rock';
    else if (randomNumber >= 1/3 && randomNumber < 2/3)
        computerMove = 'paper';
    else
        computerMove = 'scissors';
    return computerMove;
}