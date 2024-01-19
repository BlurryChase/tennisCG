// Declare Replicant

const nameReplicant = nodecg.Replicant('match');

// Declare Top Player (A) Vars

let playerA_fullName = document.querySelector("#playerA_fullName");
// let playerA_nameOverride = document.querySelector("#playerA_nameOverride");
let playerA_serveIndicator = document.querySelector("#playerA_serveIndicator");
let playerA_setWon = document.querySelector("#playerA_setWon");
let playerA_currentSet_gamesWon = document.querySelector("#playerA_currentSet_gamesWon");
let playerA_currentSet_pointsWon = document.querySelector("#playerA_currentSet_pointsWon");

// Declare Bottom Player (B) Vars

let playerB_fullName = document.querySelector("#playerB_fullName");
// let playerB_nameOverride = document.querySelector("#playerB_nameOverride");
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
let tiebreaker = document.querySelector('#tiebreaker');
let nameBtn = document.querySelector('#nameBtn')






nameReplicant.on('change', (newValue, oldValue) => {


  playerA_fullName.innerHTML = newValue.playerA.personalInfo.firstName + " " + newValue.playerA.personalInfo.lastName;
  // playerA_nameOverride.value = newValue.playerA.personalInfo.nameOverride;
  playerA_setWon.innerHTML = 
    Number(newValue.playerA.completedSets.setWon.set1) + 
    Number(newValue.playerA.completedSets.setWon.set2) + 
    Number(newValue.playerA.completedSets.setWon.set3) ;
  playerA_currentSet_gamesWon.innerHTML = newValue.playerA.currentSet.gamesWon;
  playerA_currentSet_pointsWon.innerHTML = newValue.playerA.currentSet.pointsWon;

  
  
  playerB_fullName.innerHTML = newValue.playerB.personalInfo.firstName + " " + newValue.playerB.personalInfo.lastName;
  // playerB_nameOverride.value = newValue.playerB.personalInfo.nameOverride;
  playerB_setWon.innerHTML = 
    Number(newValue.playerB.completedSets.setWon.set1) + 
    Number(newValue.playerB.completedSets.setWon.set2) + 
    Number(newValue.playerB.completedSets.setWon.set3) ;
  playerB_currentSet_gamesWon.innerHTML = newValue.playerB.currentSet.gamesWon;
  playerB_currentSet_pointsWon.innerHTML = newValue.playerB.currentSet.pointsWon;
  
  if (newValue.playerA.personalInfo.serveIndicator == true) {
    playerA_serveIndicator.innerHTML = "*";
    playerB_serveIndicator.innerHTML = " ";

  } else {
    playerA_serveIndicator.innerHTML = " ";
    playerB_serveIndicator.innerHTML = "*";

  };

  tiebreaker.checked = newValue.matchInfo.tiebreaker;
  console.log(newValue.matchInfo.tiebreaker)

});

// Change Points/Games

playerA_pointUp.onclick = () => {
  nameReplicant.value.playerA.currentSet.pointsWon += 1;
};

playerA_pointDown.onclick = () => {
  nameReplicant.value.playerA.currentSet.pointsWon -= 1;
};

playerA_gameUp.onclick = () => {
  nameReplicant.value.playerA.currentSet.gamesWon += 1;
  nameReplicant.value.playerA.currentSet.pointsWon = 0;
  nameReplicant.value.playerB.currentSet.pointsWon = 0;
  switch (setSelector.value) {
    case ('set1'):
      nameReplicant.value.playerA.completedSets.gamesPerSet.set1 += 1
      break;
    case ('set2'):
      nameReplicant.value.playerA.completedSets.gamesPerSet.set2 += 1
      break;
    case ('set3'):
      nameReplicant.value.playerA.completedSets.gamesPerSet.set3 += 1
      break;
  }
};

playerA_gameDown.onclick = () => {
  nameReplicant.value.playerA.currentSet.gamesWon -= 1;
  switch (setSelector.value) {
    case ('set1'):
      nameReplicant.value.playerA.completedSets.gamesPerSet.set1 -= 1
      break;
    case ('set2'):
      nameReplicant.value.playerA.completedSets.gamesPerSet.set2 -= 1
      break;
    case ('set3'):
      nameReplicant.value.playerA.completedSets.gamesPerSet.set3 -= 1
      break;
  }
};

playerB_pointUp.onclick = () => {
  nameReplicant.value.playerB.currentSet.pointsWon += 1;
};

playerB_pointDown.onclick = () => {
  nameReplicant.value.playerB.currentSet.pointsWon -= 1;
};

playerB_gameUp.onclick = () => {
  nameReplicant.value.playerB.currentSet.gamesWon += 1;
  nameReplicant.value.playerA.currentSet.pointsWon = 0;
  nameReplicant.value.playerB.currentSet.pointsWon = 0;
  switch (setSelector.value) {
    case ('set1'):
      nameReplicant.value.playerB.completedSets.gamesPerSet.set1 += 1
      break;
    case ('set2'):
      nameReplicant.value.playerB.completedSets.gamesPerSet.set2 += 1
      break;
    case ('set3'):
      nameReplicant.value.playerB.completedSets.gamesPerSet.set3 += 1
      break;
  }
};

playerB_gameDown.onclick = () => {
  nameReplicant.value.playerB.currentSet.gamesWon -= 1;
  switch (setSelector.value) {
    case ('set1'):
      nameReplicant.value.playerB.completedSets.gamesPerSet.set1 -= 1
      break;
    case ('set2'):
      nameReplicant.value.playerB.completedSets.gamesPerSet.set2 -= 1
      break;
    case ('set3'):
      nameReplicant.value.playerB.completedSets.gamesPerSet.set3 -= 1
      break;
  }
};

// Change Serve, Reset Points & Games

resetGames.onclick = () => {
  nameReplicant.value.playerA.currentSet.gamesWon = 0;
  nameReplicant.value.playerB.currentSet.gamesWon = 0;
};

resetPoints.onclick = () => {
  nameReplicant.value.playerA.currentSet.pointsWon = 0;
  nameReplicant.value.playerB.currentSet.pointsWon = 0;
};

serveChange.onclick = () => {
  if (nameReplicant.value.playerA.personalInfo.serveIndicator == true) {
    nameReplicant.value.playerA.personalInfo.serveIndicator = false;
    nameReplicant.value.playerB.personalInfo.serveIndicator = true;
  } else {
    nameReplicant.value.playerA.personalInfo.serveIndicator = true;
    nameReplicant.value.playerB.personalInfo.serveIndicator = false;
  }
};

tiebreaker.onclick = () => {
  nameReplicant.value.matchInfo.tiebreaker = tiebreaker.checked;
}

// nameBtn.onclick = () => {


//   nameReplicant.value.playerA.personalInfo.nameOverride = playerA_nameOverride.value;
//   nameReplicant.value.playerB.personalInfo.nameOverride = playerB_nameOverride.value;


// };