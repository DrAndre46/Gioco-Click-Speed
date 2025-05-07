const target = document.querySelector('.target');
const message = document.querySelector('.message');
const record = document.querySelector('.record');
const tries = document.querySelector('.tries');

let game = newGame();

target.textContent = 'START';

target.addEventListener('click', () => {
    tries.textContent = `${game.tries} tentativi rimasti!`;
    target.textContent = '';
    target.style.display = 'none';

    if(!game.isStarted) {
        game.isStarted = true;
        message.textContent = 'Loading...'
    } else {
        game.tries--;
        game.endTime = new Date().getTime();
        game.clickTime = (game.endTime - game.startTime) / 1000;
        message.textContent = `Hai cliccato in ${game.clickTime} secondi :O`
        if(!game.record || game.clickTime < game.record) {
            game.record = game.clickTime;
            record.textContent = `il tuo record è ${game.record}`
        };
        tries.textContent = `${game.tries} tentativi rimasti!`;
    }

    setTimeout(showTarget, randomNumber(1000, 3000));
})

function showTarget() {
    target.style.display = 'flex';
    message.textContent = 'Click it!'
    if(game.tries > 0) {
        target.style.left = randomNumber(0, 530) + 'px';
        target.style.top = randomNumber(0, 530) + 'px';
        game.startTime = new Date().getTime();
    } else {
        game = newGame();
        message.textContent = 'Game Over!'
        target.textContent = 'START'
        target.style.left = 'calc(50% - 35px)';
        target.style.top =  'calc(50% - 35px)';
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function newGame() {
    return {
        isStarted: false,
        tries: 3,
        record: null,
        startTime: 0,
        endTime: 0,
        clickTime: 0,
    }
}