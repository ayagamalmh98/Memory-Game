const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false; 
let firstCard,secondCard;
var count = 0;

function flipcard() {
    if(lockBoard) return;
    if(this == firstCard) return;
    this.classList.add('flip');
    if(!hasFlippedCard) {
        //first click
        hasFlippedCard = true;
        firstCard = this;
    } else {
        //Second click
        secondCard = this;
        chickForMatch();
    }
}

function chickForMatch() {
    let isMatch = firstCard.dataset.match == secondCard.dataset.match;
    isMatch ? disableCards() : unflipCards();
    if (count == 18) {
        alert("you've won in "+ss.textContent);
        clearInterval(Timer);
    }
}
function disableCards() {
    firstCard.removeEventListener('click' , flipcard);
    secondCard.removeEventListener('click' , flipcard);
    count++;
    resetBoard();
}
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}
function resetBoard() {
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
}

(function shuffle() {
    cards.forEach( card => {
        card.style.order = Math.floor(Math.random() *36);
    });
})();
cards.forEach(card => card.addEventListener('click' , flipcard)); 

function newgame(){
    unFlipAll();
    stop();
    shuffle();
    
}
function unFlipAll() {
    cards.forEach( card => {
        card.classList.remove('flip');
    });
    resetBoard();
}

var min = 0 , sec = 0 , ms = 0;
var Timer;
var ss = document.querySelector('.StopWatch');
function Start() {
    if(!Timer) {
        Timer = setInterval(run , 10);
    }
}
function run(){
    ss.textContent = (min<10 ? "0"+min : min) + ":" + (sec<10 ? "0"+sec : sec); 
    ms++;
    if (ms == 100) {
        ms = 0;
        sec++;
    }
    if (sec == 60) {
        sec = 0;
        min++; 
    }
}
