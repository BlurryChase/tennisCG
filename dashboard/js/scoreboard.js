// Declare Replicant

const nameReplicant = nodecg.Replicant('match');

// Declare Top Player (A) Vars

let playerA_fullName = document.querySelector("#playerA_fullName");
let playerA_serveIndicator = document.querySelector("#playerA_serveIndicator");
let playerA_setWon = document.querySelector("#playerA_setWon");
let playerA_currentSet_gamesWon = document.querySelector("#playerA_currentSet_gamesWon");
let playerA_currentSet_pointsWon = document.querySelector("#playerA_currentSet_pointsWon");

// Declare Bottom Player (B) Vars

let playerB_fullName = document.querySelector("#playerB_fullName");
let playerB_serveIndicator = document.querySelector("#playerB_serveIndicator");
let playerB_setWon = document.querySelector("#playerB_setWon");
let playerB_currentSet_gamesWon = document.querySelector("#playerB_currentSet_gamesWon");
let playerB_currentSet_pointsWon = document.querySelector("#playerB_currentSet_pointsWon");

// Declare Point/Game Change Vars

// Top Player (A) 

let playerA_pointUp = document.querySelector("#playerA_currentSet_pointUp");
let playerA_pointDown = document.querySelector("#playerA_currentSet_pointDown");
let playerA_gameUp = document.querySelector("#playerA_currentSet_gameUp");
let playerA_gameDown = document.querySelector("#playerA_currentSet_gameDown");

// Bottom Player (B) 

let playerB_pointUp = document.querySelector("#playerB_currentSet_pointUp");
let playerB_pointDown = document.querySelector("#playerB_currentSet_pointDown");
let playerB_gameUp = document.querySelector("#playerB_currentSet_gameUp");
let playerB_gameDown = document.querySelector("#playerB_currentSet_gameDown");

// Other Vars

let resetGames = document.querySelector("#resetGames");
let resetPoints = document.querySelector("#resetPoints");
let serveChange = document.querySelector("#serveChange");
let setSelector = document.querySelector('#setSelector');
let tiebreaker = document.querySelector('.tiebreaker');
let nameBtn = document.querySelector('#nameBtn')

/* Serve Change Function

Function is designed to switch serves on each game change.
Also there is a button that manually switches serves between players 

*/

function serviceChange() {
  if (nameReplicant.value.playerA.personalInfo.serveIndicator == true) {
    nameReplicant.value.playerA.personalInfo.serveIndicator = false;
    nameReplicant.value.playerB.personalInfo.serveIndicator = true;
  } else {
    nameReplicant.value.playerA.personalInfo.serveIndicator = true;
    nameReplicant.value.playerB.personalInfo.serveIndicator = false;
  }
}

/* Up Game Count for Set

Using the value from setSelector, adds a game to that particular set

*/

function upCount (playerVar) {
  switch (setSelector.value) {
    case ('set1'):
      playerVar.set1 += 1
      break;
    case ('set2'):
      playerVar.set2 += 1
      break;
    case ('set3'):
      playerVar.set3 += 1
      break;
  }
}

/* Down Game Count for Set

Using the value from setSelector, subtracts a game to that particular set

*/

function downCount (playerVar) {
  switch (setSelector.value) {
    case ('set1'):
      playerVar.set1 -= 1
      break;
    case ('set2'):
      playerVar.set2 -= 1
      break;
    case ('set3'):
      playerVar.set3 -= 1
      break;
  }
}

/* Set Game Update

When interacting with the Current Set Dropdown, this will ping & pull the currently won games for that set.

*/

function setGameUpdate () {
  switch (setSelector.value) {
    case ('set1'):
      playerA_currentSet_gamesWon.innerHTML = nameReplicant.value.playerA.currentSet.gamesWon = nameReplicant.value.playerA.completedSets.gamesPerSet.set1;
      playerB_currentSet_gamesWon.innerHTML = nameReplicant.value.playerB.currentSet.gamesWon = nameReplicant.value.playerB.completedSets.gamesPerSet.set1;
      break;
    case ('set2'):
      playerA_currentSet_gamesWon.innerHTML = nameReplicant.value.playerA.currentSet.gamesWon = nameReplicant.value.playerA.completedSets.gamesPerSet.set2;
      playerB_currentSet_gamesWon.innerHTML = nameReplicant.value.playerB.currentSet.gamesWon = nameReplicant.value.playerB.completedSets.gamesPerSet.set2;
      break;
    case ('set3'):
      playerA_currentSet_gamesWon.innerHTML = nameReplicant.value.playerA.currentSet.gamesWon = nameReplicant.value.playerA.completedSets.gamesPerSet.set3;
      playerB_currentSet_gamesWon.innerHTML = nameReplicant.value.playerB.currentSet.gamesWon = nameReplicant.value.playerB.completedSets.gamesPerSet.set3;
      break;
  }
  
}




nameReplicant.on('change', (newValue) => {
  // Replicant change event gets fired every time you reload the page

  // player a info

  playerA_fullName.innerHTML = newValue.playerA.personalInfo.firstName + 
  " " + newValue.playerA.personalInfo.lastName;
  playerA_setWon.innerHTML = 
    Number(newValue.playerA.completedSets.setWon.set1) + 
    Number(newValue.playerA.completedSets.setWon.set2) + 
    Number(newValue.playerA.completedSets.setWon.set3) ;
  playerA_currentSet_gamesWon.innerHTML = newValue.playerA.currentSet.gamesWon;
  playerA_currentSet_pointsWon.innerHTML = newValue.playerA.currentSet.pointsWon;

  // player b info
  
  playerB_fullName.innerHTML = newValue.playerB.personalInfo.firstName + 
  " " + newValue.playerB.personalInfo.lastName;
  playerB_setWon.innerHTML = 
    Number(newValue.playerB.completedSets.setWon.set1) + 
    Number(newValue.playerB.completedSets.setWon.set2) + 
    Number(newValue.playerB.completedSets.setWon.set3) ;
  playerB_currentSet_gamesWon.innerHTML = newValue.playerB.currentSet.gamesWon;
  playerB_currentSet_pointsWon.innerHTML = newValue.playerB.currentSet.pointsWon;
  
  // serve indicator info

  if (newValue.playerA.personalInfo.serveIndicator == true) {
    playerA_serveIndicator.innerHTML = "*";
    playerB_serveIndicator.innerHTML = " ";
  } else {
    playerA_serveIndicator.innerHTML = " ";
    playerB_serveIndicator.innerHTML = "*";
  };
  
  // tiebreaker checkbox update
  tiebreaker.checked = newValue.matchInfo.tiebreaker;
  // set selector dropdown update
  setSelector.value = newValue.matchInfo.currentSet;

});

// Change Points/Games

// player A won a point

playerA_pointUp.onclick = () => {
  nameReplicant.value.playerA.currentSet.pointsWon += 1;
};

// player A lost a point

playerA_pointDown.onclick = () => {
  nameReplicant.value.playerA.currentSet.pointsWon -= 1;
};

// player A won a game

playerA_gameUp.onclick = () => {
  nameReplicant.value.playerA.currentSet.gamesWon += 1;
  nameReplicant.value.playerA.currentSet.pointsWon = 0;
  nameReplicant.value.playerB.currentSet.pointsWon = 0;
  upCount(nameReplicant.value.playerA.completedSets.gamesPerSet);
  serviceChange();
};

// player A lost a game

playerA_gameDown.onclick = () => {
  nameReplicant.value.playerA.currentSet.gamesWon -= 1;
  downCount(nameReplicant.value.playerA.completedSets.gamesPerSet);
  serviceChange();

};

// player B won a point

playerB_pointUp.onclick = () => {
  nameReplicant.value.playerB.currentSet.pointsWon += 1;
};

// player B lost a point

playerB_pointDown.onclick = () => {
  nameReplicant.value.playerB.currentSet.pointsWon -= 1;
};

// player B won a game

playerB_gameUp.onclick = () => {
  nameReplicant.value.playerB.currentSet.gamesWon += 1;
  nameReplicant.value.playerA.currentSet.pointsWon = 0;
  nameReplicant.value.playerB.currentSet.pointsWon = 0;
  upCount(nameReplicant.value.playerB.completedSets.gamesPerSet);
  serviceChange();
};

// player B lost a game

playerB_gameDown.onclick = () => {
  nameReplicant.value.playerB.currentSet.gamesWon -= 1;
  downCount(nameReplicant.value.playerB.completedSets.gamesPerSet);
  serviceChange();
};

// Change Serve, Reset Points & Games


// reset games

resetGames.onclick = () => {
  nameReplicant.value.playerA.currentSet.gamesWon = 0;
  nameReplicant.value.playerB.currentSet.gamesWon = 0;
};

// reset points

resetPoints.onclick = () => {
  nameReplicant.value.playerA.currentSet.pointsWon = 0;
  nameReplicant.value.playerB.currentSet.pointsWon = 0;
};

// change serve

serveChange.onclick = () => {
  serviceChange()
};

// set has a tiebreaker

tiebreaker.onclick = () => {
  nameReplicant.value.matchInfo.tiebreaker = tiebreaker.checked;
};

// dropdown for what set it is

setSelector.onchange = () => {
  nameReplicant.value.matchInfo.currentSet = setSelector.value;
  console.log(nameReplicant.value.matchInfo.currentSet);
  setGameUpdate();
};