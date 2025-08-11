// assigns existing HTML elements to variables
const boxContainer = document.getElementById("box-container");
const boxTopLeft = document.getElementById("box-top-left");
const boxTopMiddle = document.getElementById("box-top-middle");
const boxTopRight = document.getElementById("box-top-right");
const boxMiddleLeft = document.getElementById("box-middle-left");
const boxMiddleMiddle = document.getElementById("box-middle-middle");
const boxMiddleRight = document.getElementById("box-middle-right");
const boxBottomLeft = document.getElementById("box-bottom-left");
const boxBottomMiddle = document.getElementById("box-bottom-middle");
const boxBottomRight = document.getElementById("box-bottom-right");
const timeDisplay = document.getElementById("time-display");
const startButton = document.getElementById("start-btn");
const newGameButton = document.getElementById("newGame-btn");
const infoContainer = document.getElementById("info-container");

// initial time is 60 seconds
let timeLeft = 30;
let timer;

// updates the time displayed function
function updateTimeDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // formats to two digits (5 becomes 05)
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  timeDisplay.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

// starts time countdown function using setInterval() method
function startTime() {
  if (timeLeft === 30) {
    timer = setInterval(() => {
      timeLeft--; //decrements time
      updateTimeDisplay(); //updates time display
      checkWinner();

      // calls clearSymbol function only if boxes are not empty
      if (clickedBoxes.length > 0) {
        clearSymbol();
      }

      // time display color change
      if (timeLeft === 20) {
        timeDisplay.style.color = "#D1D100";
      }
      if (timeLeft === 10) {
        timeDisplay.style.color = "orange";
      }
      // stops the time when it reaches zero using clearInterval() method
      if (timeLeft <= 0) {
        stopTime();
        timeDisplay.style.color = "red";
        // window.alert(
        //   `SORRY YOUR ${clickCounter} CLICKS DIDN'T HELP YOU WIN 😫`
        // );
        // ***
        confirmNewGameLost();
        // ***
      }
    }, 500); //updates every second (1000 milliseconds == 1sec)
  }
}

// stops time function
function stopTime() {
  clearInterval(timer);
  boxContainer.removeEventListener("click", createSymbols);
  // console.log(`Total clicks made: ${clickCounter}`);
  // console.log(`Divs that were clicked are:`, clickedBoxes);
  newGameButton.style.display = "inline-block";
}

// clears random Symbol function
let randomBox, targetBox;

function clearSymbol() {
  // fetches random item from ClickedBoxes array
  randomBox = randomizer(clickedBoxes);
  targetBox = document.getElementById(randomBox);

  // loop runs only when random box chosen is already empty
  while (targetBox.textContent === "") {
    randomBox = randomizer(clickedBoxes);
    targetBox = document.getElementById(randomBox);
  }
  // removes the item from ClickedBoxes array
  clickedBoxes.splice(clickedBoxes.indexOf(randomBox), 1);

  // deletes textContent when random box isn't empty
  targetBox.textContent = "";
}

// checks if winning pattern exists function
function checkWinner() {
  if (
    boxTopLeft.textContent !== "" &&
    boxTopLeft.textContent === boxTopMiddle.textContent &&
    boxTopMiddle.textContent === boxTopRight.textContent
  ) {
    confirmNewGameWon();
    stopTime();
  }
  if (
    boxTopLeft.textContent !== "" &&
    boxTopLeft.textContent === boxMiddleMiddle.textContent &&
    boxTopMiddle.textContent === boxBottomRight.textContent
  ) {
    confirmNewGameWon();
    stopTime();
  }
  if (
    boxTopLeft.textContent !== "" &&
    boxTopLeft.textContent === boxMiddleLeft.textContent &&
    boxTopMiddle.textContent === boxBottomLeft.textContent
  ) {
    confirmNewGameWon();
    stopTime();
  }
  if (
    boxTopRight.textContent !== "" &&
    boxTopRight.textContent === boxMiddleMiddle.textContent &&
    boxTopRight.textContent === boxBottomLeft.textContent
  ) {
    confirmNewGameWon();
    stopTime();
  }
  if (
    boxTopRight.textContent !== "" &&
    boxTopRight.textContent === boxMiddleRight.textContent &&
    boxTopRight.textContent === boxBottomRight.textContent
  ) {
    confirmNewGameWon();
    stopTime();
  }
  if (
    boxMiddleMiddle.textContent !== "" &&
    boxMiddleMiddle.textContent === boxTopMiddle.textContent &&
    boxMiddleMiddle.textContent === boxBottomMiddle.textContent
  ) {
    confirmNewGameWon();
    stopTime();
  }
  if (
    boxMiddleMiddle.textContent !== "" &&
    boxMiddleMiddle.textContent === boxMiddleLeft.textContent &&
    boxMiddleMiddle.textContent === boxMiddleRight.textContent
  ) {
    confirmNewGameWon();
    stopTime();
  }
}

// clicked boxes array
const clickedBoxes = [];

// symbols array
const symbolsEasy = ["X", "O", "♤", "♧", "♡", "♢"];
const symbolsMedium = ["X", "O", "♤", "♧", "♡", "♢", "☆", "☾", "☀"];
const symbolsHard = ["X", "O", "♤", "♧", "♡", "♢"];

// randomizes array function
const randomizer = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// creates event listener on the parent element
boxContainer.addEventListener("click", createSymbols);

let clickCounter = 0;

// targets boxes to create HTML elements function
function createSymbols(event) {
  boxContainer.style.cursor = "pointer";

  // time function call
  if (clickCounter === 1) {
    startTime();
  }

  // checks if box is empty to create textContent
  const e = event.target;
  let myMove;

  if (e.textContent === "") {
    if (e === boxTopLeft) {
      clickCounter++;
      myMove = document.createElement("p");
      // myMove.textContent = randomizer(symbolsEasy);
      myMove.textContent = randomizer(symbolsMedium);
      // myMove.textContent = randomizer(symbolsHard);
      e.append(myMove);
      clickedBoxes.push(e.id);
    } else if (event.target === boxTopMiddle) {
      clickCounter++;
      myMove = document.createElement("p");
      // myMove.textContent = randomizer(symbolsEasy);
      myMove.textContent = randomizer(symbolsMedium);
      // myMove.textContent = randomizer(symbolsHard);
      e.append(myMove);
      clickedBoxes.push(e.id);
    } else if (event.target === boxTopRight) {
      myMove = document.createElement("p");
      clickCounter++;
      // myMove.textContent = randomizer(symbolsEasy);
      myMove.textContent = randomizer(symbolsMedium);
      // myMove.textContent = randomizer(symbolsHard);
      e.append(myMove);
      clickedBoxes.push(e.id);
    } else if (event.target === boxMiddleLeft) {
      myMove = document.createElement("p");
      clickCounter++;
      // myMove.textContent = randomizer(symbolsEasy);
      myMove.textContent = randomizer(symbolsMedium);
      // myMove.textContent = randomizer(symbolsHard);
      e.append(myMove);
      clickedBoxes.push(e.id);
    } else if (event.target === boxMiddleMiddle) {
      myMove = document.createElement("p");
      clickCounter++;
      // myMove.textContent = randomizer(symbolsEasy);
      myMove.textContent = randomizer(symbolsMedium);
      // myMove.textContent = randomizer(symbolsHard);
      e.append(myMove);
      clickedBoxes.push(e.id);
    } else if (event.target === boxMiddleRight) {
      myMove = document.createElement("p");
      clickCounter++;
      // myMove.textContent = randomizer(symbolsEasy);
      myMove.textContent = randomizer(symbolsMedium);
      // myMove.textContent = randomizer(symbolsHard);
      e.append(myMove);
      clickedBoxes.push(e.id);
    } else if (event.target === boxBottomLeft) {
      myMove = document.createElement("p");
      clickCounter++;
      // myMove.textContent = randomizer(symbolsEasy);
      myMove.textContent = randomizer(symbolsMedium);
      // myMove.textContent = randomizer(symbolsHard);
      e.append(myMove);
      clickedBoxes.push(e.id);
    } else if (event.target === boxBottomMiddle) {
      myMove = document.createElement("p");
      clickCounter++;
      // myMove.textContent = randomizer(symbolsEasy);
      myMove.textContent = randomizer(symbolsMedium);
      // myMove.textContent = randomizer(symbolsHard);
      e.append(myMove);
      clickedBoxes.push(e.id);
    } else if (event.target === boxBottomRight) {
      myMove = document.createElement("p");
      clickCounter++;
      // myMove.textContent = randomizer(symbolsEasy);
      myMove.textContent = randomizer(symbolsMedium);
      // myMove.textContent = randomizer(symbolsHard);
      e.append(myMove);
      clickedBoxes.push(e.id);
    } else {
      window.alert("Please click on the right box");
    }
  } else {
    window.alert("Choose another box");
  }
}

// loads game board function
function loadGame() {
  infoContainer.style.display = "none";
  boxContainer.style.display = "grid";
}

// alert window when game is lost
function confirmNewGameLost() {
  let userAnswer = confirm(
    `\nTIME'S UP!!!\n\nYour ${clickCounter} clicks didn't help you win 😫\n\n Would you like to start a new game?`
  );

  if (userAnswer) {
    location.reload();
  } else {
    newGameButton.style.display = "inline-block";
  }
}

// alert window when game is won
function confirmNewGameWon() {
  let userAnswer = confirm(
    `\nCONGRATULATIONS! YOU WIN!!! ⭐⭐⭐⭐⭐\n\nTook you ${
      30 - timeLeft
    } seconds and ${clickCounter} clicks to finish the game!\n\n Would you like to start a new game?`
  );

  if (userAnswer) {
    location.reload();
  } else {
    newGameButton.style.display = "inline-block";
  }
}

// loads the page function
function newGame() {
  location.reload();
}

// *************************************************
//
// TO-DO LIST
// set timer for the move to be erased
// create logic combinations to check winning pattern
// set total timer it took to win (optional)
// set how many clicks it took to win (optional)
// write game mechanics

// *******************CODE CHECKER/HELPER*********************************************
/* 
event.target
console.log("Event triggered by:", event.target);
console.log("Tag name:", event.target.className);
string.prototype.padStart()
existingString.padStart(targetLength)
existingString.padStart(targetLength, padString)
*/
