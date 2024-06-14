
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

let isAutoPlaying = false; // if not already autoplaying
let intervalID; // setInterval returns a unique ID that we can use to stop the interval

//const autoPlay = () => {

//};

function autoPlay(){
    if (!isAutoPlaying){
        intervalID = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
            document.querySelector('.auto-play-button')
                .innerHTML = "Stop Playing";
        }, 1000);
        isAutoPlaying = true;
    }
    else {
        clearInterval(intervalID);
        isAutoPlaying = false;
        document.querySelector('.auto-play-button')
            .innerHTML = "Auto Play";
    }
}
const autoButtonElement = document.querySelector('.auto-play-button');
autoButtonElement.addEventListener('click', () => autoPlay());

// can not simply call playGame()
document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playGame('rock');
    });

document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        playGame('paper');
    });

document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
        playGame('scissors');
    });
// event is a special keyword of eventListener btw
document.body.addEventListener('keydown', (event) => {
    console.log(event.key); // will display value of key pressed
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p'){
        playGame('paper');
    } else if (event.key === 's'){
        playGame('scissors');
    } else if (event.key === 'a')
        autoPlay();
    else if (event.key === 'Backspace')
        resetScore();
});

document.querySelector('.reset-score-button')
    .addEventListener('click', () => {
        resetScore();
    })

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

function resetScore() {
    const resetElementID = document.getElementById('reset-paragraph');
    resetElementID.classList.add('confirm-reset');
    displayConfirmMessage();
    document.querySelector('.js-confirm-yes-button')
        .addEventListener('click', () => {
            score.wins = 0;
            score.losses = 0;
            score.ties = 0;
            localStorage.removeItem('score'); // deletes all saved values of score object
            updateScoreElement();
            resetElementID.style.display = "none";
        });
    document.querySelector('.js-confirm-no-button')
        .addEventListener('click', () => {
            resetElementID.style.display = "none";
        })
    resetElementID.style.display = "";
}

function displayConfirmMessage(){
    document.querySelector('.confirm-reset')
        .innerHTML = `Are you sure you want to reset the score?
                     <button class="js-confirm-yes-button">Yes</button>
                     <button class="js-confirm-no-button">No</button>`;
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