// declare replicant

const matchReplicant = nodecg.Replicant('match');

// declare queryselectors


var scoreVisibleBTN = document.querySelector('#scoreVisibleButton');
var changeoverVisibleBTN = document.querySelector('#changeoverVisibleButton');


// declare on.change

matchReplicant.on('change', newValue => {

  if (newValue.scoreboardVisible === false) {
    scoreVisibleBTN.innerHTML = 'NOT VISIBLE';
  } else {
    scoreVisibleBTN.innerHTML = 'VISIBLE';
  }

  if (newValue.changeoverVisible === false) {
    changeoverVisibleBTN.innerHTML = 'NOT VISIBLE';
  } else {
    changeoverVisibleBTN.innerHTML = 'VISIBLE';
  }
});

// declare button logic

scoreVisibleBTN.onclick = () => {
  if (matchReplicant.value.scoreboardVisible != true) {
    matchReplicant.value.scoreboardVisible = true;
  } else {
    matchReplicant.value.scoreboardVisible = false;
  }
  console.log("score: " + matchReplicant.value.scoreboardVisible);
};

changeoverVisibleBTN.onclick = () => {
  if (matchReplicant.value.changeoverVisible != true) {
    matchReplicant.value.changeoverVisible = true;
  } else {
    matchReplicant.value.changeoverVisible = false;
  }
  console.log("changeover: " + matchReplicant.value.changeoverVisible);
};