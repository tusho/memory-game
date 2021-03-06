// Shuffle function
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }
  return array;
}


//Exchange the entire deck of cards by exchanging CSS classes
let myArray = [];

const myCards = document.getElementById('deck').getElementsByTagName('i');
for (let i = 0; i < myCards.length; i++) {
  myArray[i] = (myCards[i].className);
}

function changeDecks() {
  shuffle(myArray);
  for (let j=0; j < myCards.length; j++) {
    myCards[j].className = myArray[j];
  }
}


//Change the star count
const myStars = document.getElementById('stars').getElementsByTagName('i');
let starCount = 3;

function resetStars() {
  for (let k=0; k < myStars.length; k++) {
    myStars[k].style.color = 'orange';
  }
}

function changeStars () {
  let successfulClicks = clicks - matchingCards;
  if (successfulClicks >= 20 && successfulClicks < 28) {
    myStars[2].style.color = 'black';
    starCount = 2;
  } else if (successfulClicks >=28) {
      myStars[1].style.color = 'black'
      starCount = 1;
    }
}


//Function to count number of moves
const myMoves = document.getElementById('moves');

function countMoves () {
  let secondClick = Math.floor(clicks/2);
  moves.textContent = secondClick;
}


//Restart button to run multiple functions for starting over
const restart = document.querySelector('.restart');
restart.addEventListener('click', function() {
  clicks = 0;
  cardContentFirst = 0;
  cardContentSecond = 0;
  starCount = 3;
  countMoves();
  changeDecks();
  resetStars();
  closeAllCards();
  resetTimer();
});


//Function to reset / close all Cards
function closeAllCards () {
  for (l=0; l < myDeck.children.length; l++) {
    myDeck.children[l].className = 'card';
  }
}


//Functions to show, close cards or change color of matched cards
let cardsOpenShow = document.getElementsByClassName('card open show');
let matchingCards = 0;

function showCards (e) {
  e.target.className = 'card open show';
}

function matchCards () {
  Array.from(document.getElementsByClassName('card open show')).forEach(function(item) {
    item.className = 'card match';
    });
  matchingCards += 2;
  if (matchingCards === 16) {
    setTimeout(function(){
      openPopup();
    }, 1000);
  }
}

function hideCards () {
  Array.from(document.getElementsByClassName('card open show')).forEach(function(item) {
   item.classList.add('animation');
   setTimeout(function(){
     item.className = 'card';
    }, 1000);
    });
}


//Event Listener for clicking the cards
const myDeck = document.getElementById('deck');
let clicks = 0;
let cardContentFirst = 0;
let cardContentSecond = 0;

myDeck.addEventListener('click', function(e) {
  // let clickedCard = e.target.className;
  if (e.target.className === 'card open show' || e.target.className === 'card match') {
    return;
  } else if (e.target.nodeName === 'LI') {
      clicks += 1;
      changeStars();
      if (clicks%2 === 1) {
        showCards(e);
        cardContentFirst = e.target.innerHTML;
      } else {
        showCards(e);
        countMoves();
        cardContentSecond = e.target.innerHTML;
          if (cardContentFirst === cardContentSecond) {
            matchCards();
          } else {
            hideCards();
            }
        }
    }
})


//Include a modal popup once game is won
const modal = document.getElementById('myModal');
const usedMoves = document.getElementById('used-moves');
const usedStars = document.getElementById('used-stars');
const replayButton = document.getElementsByTagName('button')[0];
const finishTime = document.getElementById('finish-time');

function openPopup() {
  let finishCounter = document.getElementById("count-time").innerHTML;
  modal.style.display = "block";
  usedMoves.textContent = clicks/2;
  usedStars.textContent = starCount;
  finishTime.textContent = finishCounter;
}

replayButton.addEventListener('click', function() {
  clicks = 0;
  cardContentFirst = 0;
  cardContentSecond = 0;
  starCount = 3;
  countMoves();
  changeDecks();
  resetStars();
  closeAllCards();
  resetTimer();
  modal.style.display = "none";
})


//Run functions to include timer into the game
let countDownDate = new Date();
if (countDownDate) {
  countDownDate = new Date(countDownDate);
  } else {
    countDownDate = new Date();
    localStorage.setItem('startDate', countDownDate);
}

var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = now - countDownDate.getTime();
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("count-time").innerHTML = minutes + "m " + seconds + "s ";
}, 1000);

function resetTimer() {
  countDownDate = new Date();
  localStorage.setItem('startDate', countDownDate);
}


//Run a shuffle once document is loaded
window.onload = function () {
  changeDecks();
  resetStars();
  resetTimer();
}
