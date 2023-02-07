let pokemonArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8],
  visibleCards = 0,
  cardOne = null,
  cardTwo = null,
  hits = 0,
  movements = 0,
  timerActivate = false,
  backwardCount = 45,
  mainID = 0,
  timer = null;
let clockSound = new Audio("sounds/timer.wav");
document.getElementById("hits").innerHTML = "Completed: " + hits + "/8";
document.getElementById("time").innerHTML =
  "Time: " + backwardCount + " seconds";
document.getElementById("movements").innerHTML = "Movements: " + movements;
pokemonArray = pokemonArray.sort(() => {
  return Math.random() - 0.5;
});
console.log(pokemonArray);

for (let i = 0; i < pokemonArray.length; i++) {
  document.getElementById(i).innerHTML = `<img src="img/backCard.png" />`;
}

function timeCount() {
  timer = setInterval(() => {
    backwardCount--;
    document.getElementById("time").innerHTML =
      "Time: " + backwardCount + " seconds";

    if (backwardCount <= 10) {
      document.getElementById("time").style = "color: yellow;";
    }

    if (backwardCount == 10) {
      clockSound.play();
    }
    if (backwardCount == 0) {
      clearInterval(timer);
      document.getElementById("hits").innerHTML = `You only find ${hits} of 8`;
      document.getElementById("time").innerHTML = "Time is up";
      document.getElementById("time").style =
        "color: #9E0101; font-size: 24px; text-transform: uppercase;";
      let lose = new Audio("sounds/fail.mp3");
      lose.play();
      showAllCards();
    }
  }, 1000);
}

function reload() {
  location.reload();
}

function showAllCards() {
  for (let i = 0; i < pokemonArray.length; i++) {
    document.getElementById(
      i
    ).innerHTML = `<img src="img/${pokemonArray[i]}.png" />`;
    document.getElementById(i).disabled = true;
    document.getElementById("reload").style = "display: inline;";
  }
}

function show(id) {
  if (timerActivate == false) {
    timeCount();
    timerActivate = true;
  }

  visibleCards++;
  movements++;
  document.getElementById("movements").innerHTML = "Movements: " + movements;

  if (visibleCards == 1) {
    cardOne = document.getElementById(id);
    cardOne.innerHTML = `<img src="img/${pokemonArray[id]}.png" />`;
    cardOne.src = `img/${pokemonArray[id]}.png`;
    console.log(cardOne.src);
    cardOne.disabled = true;
  } else if (visibleCards == 2) {
    cardTwo = document.getElementById(id);
    cardTwo.innerHTML = `<img src="img/${pokemonArray[id]}.png" />`;
    cardTwo.src = `img/${pokemonArray[id]}.png`;
    console.log(cardTwo.src);
    cardTwo.disabled = true;

    if (cardOne.src == cardTwo.src) {
      if (hits < 8) {
        let completed = new Audio("sounds/completed.wav");
        completed.play();
      }
      visibleCards = 0;
      hits++;
      document.getElementById("hits").innerHTML = "Completed: " + hits + "/8";
    } else {
      let incorrect = new Audio("sounds/incorrect.wav");
      incorrect.play();
      visibleCards = 0;
      cardOne.disabled = false;
      cardTwo.disabled = false;
      setTimeout(() => {
        cardOne.innerHTML = `<img src="img/backCard.png" />`;
        cardTwo.innerHTML = `<img src="img/backCard.png" />`;
      }, "600");
    }
  }

  if (hits == 8) {
    let victory = new Audio("sounds/victory.mp3");
    victory.play();
    clockSound.pause();
    clearInterval(timer);
    document.getElementById("time").innerHTML = `Amazing! You did it in ${
      45 - backwardCount
    } seconds.`;
    document.getElementById("time").style = `color: white;`;
    showAllCards();
    startConfetti();
  }
}