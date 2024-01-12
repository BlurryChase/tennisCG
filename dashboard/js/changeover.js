// Declare Replicant

const nameReplicant = nodecg.Replicant('match');

// Declare Top Player (A) Vars

let playerA_fullName = document.querySelector("#playerA_fullName");
let playerA_set1Won = document.querySelector("#playerA_set1Won");
let playerA_set2Won = document.querySelector("#playerA_set2Won");
let playerA_set3Won = document.querySelector("#playerA_set3Won");
let playerA_set1Score = document.querySelector('#playerA_set1Score');
let playerA_set2Score = document.querySelector('#playerA_set2Score');
let playerA_set3Score = document.querySelector('#playerA_set3Score');


// Declare Bottom Player (B) Vars

let playerB_fullName = document.querySelector("#playerB_fullName");
let playerB_set1Won = document.querySelector("#playerB_set1Won");
let playerB_set2Won = document.querySelector("#playerB_set2Won");
let playerB_set3Won = document.querySelector("#playerB_set3Won");
let playerB_set1Score = document.querySelector('#playerB_set1Score');
let playerB_set2Score = document.querySelector('#playerB_set2Score');
let playerB_set3Score = document.querySelector('#playerB_set3Score');

let reSet1 = document.querySelector('#resetSet1');
let reSet2 = document.querySelector('#resetSet2');
let reSet3 = document.querySelector('#resetSet3');

NodeCG.waitForReplicants(nameReplicant).then(() => {
  playerA_set1Won.checked = nameReplicant.value.playerA.completedSets.setWon.set1
});


nameReplicant.on('change', (newValue, oldValue) => {


  playerA_fullName.innerHTML = newValue.playerA.personalInfo.firstName + " " + newValue.playerA.personalInfo.lastName;
  
  playerA_set1Won.checked = newValue.playerA.completedSets.setWon.set1;
  playerA_set2Won.checked = newValue.playerA.completedSets.setWon.set2;
  playerA_set3Won.checked = newValue.playerA.completedSets.setWon.set3;

  playerA_set1Score.value = newValue.playerA.completedSets.gamesPerSet.set1;
  playerA_set2Score.value = newValue.playerA.completedSets.gamesPerSet.set2;
  playerA_set3Score.value = newValue.playerA.completedSets.gamesPerSet.set3;


  playerB_fullName.innerHTML = newValue.playerB.personalInfo.firstName + " " + newValue.playerB.personalInfo.lastName;

  playerB_set1Won.checked = newValue.playerB.completedSets.setWon.set1;
  playerB_set2Won.checked = newValue.playerB.completedSets.setWon.set2;
  playerB_set3Won.checked = newValue.playerB.completedSets.setWon.set3;

  playerB_set1Score.value = newValue.playerB.completedSets.gamesPerSet.set1;
  playerB_set2Score.value = newValue.playerB.completedSets.gamesPerSet.set2;
  playerB_set3Score.value = newValue.playerB.completedSets.gamesPerSet.set3;

});

reSet1.onclick = () => {
  nameReplicant.value.playerA.completedSets.setWon.set1 = false;
  nameReplicant.value.playerA.completedSets.gamesPerSet.set1 = 0;

  nameReplicant.value.playerB.completedSets.setWon.set1 = false;
  nameReplicant.value.playerB.completedSets.gamesPerSet.set1 = 0;
};

reSet2.onclick = () => {
  nameReplicant.value.playerA.completedSets.setWon.set2 = false;
  nameReplicant.value.playerA.completedSets.gamesPerSet.set2 = 0;

  nameReplicant.value.playerB.completedSets.setWon.set2 = false;
  nameReplicant.value.playerB.completedSets.gamesPerSet.set2 = 0;
};

reSet3.onclick = () => {
  nameReplicant.value.playerA.completedSets.setWon.set3 = false;
  nameReplicant.value.playerA.completedSets.gamesPerSet.set3 = 0;

  nameReplicant.value.playerB.completedSets.setWon.set3 = false;
  nameReplicant.value.playerB.completedSets.gamesPerSet.set3 = 0;
};


playerA_set1Won.onclick = () => {
  nameReplicant.value.playerA.completedSets.setWon.set1 = playerA_set1Won.checked;
}
playerA_set2Won.onclick = () => {
  nameReplicant.value.playerA.completedSets.setWon.set2 = playerA_set2Won.checked;
}
playerA_set3Won.onclick = () => {
  nameReplicant.value.playerA.completedSets.setWon.set3 = playerA_set3Won.checked;
}

playerB_set1Won.onclick = () => {
  nameReplicant.value.playerB.completedSets.setWon.set1 = playerB_set1Won.checked;
}
playerB_set2Won.onclick = () => {
  nameReplicant.value.playerB.completedSets.setWon.set2 = playerB_set2Won.checked;
}
playerB_set3Won.onclick = () => {
  nameReplicant.value.playerB.completedSets.setWon.set3 = playerB_set3Won.checked;
}


// Change Points/Games

// Change Serve, Reset Points & Games


