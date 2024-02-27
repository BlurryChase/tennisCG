const playerA_firstName = document.querySelector('#playerA_firstName');
const playerA_lastName = document.querySelector('#playerA_lastName');
const playerA_nation = document.querySelector('#playerA_nation');
const playerA_seed = document.querySelector('#playerA_seed');

const playerB_firstName = document.querySelector('#playerB_firstName');
const playerB_lastName = document.querySelector('#playerB_lastName');
const playerB_nation = document.querySelector('#playerB_nation');
const playerB_seed = document.querySelector('#playerB_seed');

const submitButton = document.querySelector('#submitButton');

const nameReplicant = nodecg.Replicant('match');


var data;

  
  Papa.parse('js/flags.csv', {
    download: true,
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    complete: function(results) {
      data = results.data;
      console.log(data.length);
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        playerA_nation.options[playerA_nation.options.length] = new Option(data[i]["Country"], data[i]["Code"]);
        playerB_nation.options[playerB_nation.options.length] = new Option(data[i]["Country"], data[i]["Code"]);
      }
    }
  });





nameReplicant.on('change', (newValue) => {
  // The value of the Replicant has changed somewhere in NodeCG,
  // this could be another dashboard panel, a server initiated change,
  // or the doing of another user accessing your dashboard panel.
  playerA_firstName.value = newValue.playerA.personalInfo.firstName;
  playerA_lastName.value = newValue.playerA.personalInfo.lastName;
  playerA_nation.value = newValue.playerA.personalInfo.nation;
  playerA_seed.value = newValue.playerA.personalInfo.seed;

  playerB_firstName.value = newValue.playerB.personalInfo.firstName;
  playerB_lastName.value = newValue.playerB.personalInfo.lastName;
  playerB_nation.value = newValue.playerB.personalInfo.nation;
  playerB_seed.value = newValue.playerB.personalInfo.seed;

});

submitButton.onclick = () => {
  // A Replicant can be modified by modifying its `value`.
  nameReplicant.value.playerA.personalInfo.firstName = playerA_firstName.value;
  nameReplicant.value.playerA.personalInfo.lastName = playerA_lastName.value;
  nameReplicant.value.playerA.personalInfo.nation = playerA_nation.value;
  nameReplicant.value.playerA.personalInfo.seed = Number(playerA_seed.value);

  nameReplicant.value.playerB.personalInfo.firstName = playerB_firstName.value;
  nameReplicant.value.playerB.personalInfo.lastName = playerB_lastName.value;
  nameReplicant.value.playerB.personalInfo.nation = playerB_nation.value;
  nameReplicant.value.playerB.personalInfo.seed = Number(playerB_seed.value);
};