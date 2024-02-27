import moment from 'moment';


const matchReplicant = nodecg.Replicant('match');
const timeReplicant = nodecg.Replicant('time');

const court = document.querySelector("#court");
const format = document.querySelector("#format");
const round = document.querySelector("#round");
const saveMatchInfo = document.querySelector("#saveMatchInfo");

let matchTimer = document.querySelector("#matchTimer");
let startTimer = document.querySelector("#startTimer");
let pauseTimer = document.querySelector("#pauseTimer");
let resetTimer = document.querySelector("#resetTimer");

let timeCount;
let interval;

let set1CompTime;
let set2CompTime;
let set3CompTime;

function pauseTime() {
  startTimer.disabled = false;
  clearInterval(interval);
  timeReplicant.value.matchTime = timeCount;
  matchTimer.innerHTML = moment().hour(0).minute(0).second(timeCount).format('HH : mm : ss')
}

function resetTime() {
  startTimer.disabled = false;
  clearInterval(interval)
  timeCount = 0;
  matchTimer.innerHTML = moment().hour(0).minute(0).second(0).format('HH : mm : ss');
  
  timeReplicant.value.matchTime = timeCount;
  timeReplicant.value.setTimes.set1 = 0;
  timeReplicant.value.setTimes.set2 = 0;
  timeReplicant.value.setTimes.set3 = 0;
  
  set1Time.innerHTML =  timeReplicant.value.setTimes.set1;
  set2Time.innerHTML =  timeReplicant.value.setTimes.set2;
  set3Time.innerHTML =  timeReplicant.value.setTimes.set3;

};


function runTime() {

  matchTimer.innerHTML = moment().hour(0).minute(0).second(timeCount++).format('HH : mm : ss')
  timeReplicant.value.matchTime = timeCount;


}




function startTime() {
  startTimer.disabled = true;
  interval = setInterval(runTime, 100);
}

function completeSet1() {
  set1CompTime = timeCount;
  set1Time.innerHTML = Math.floor(set1CompTime / 60) + " minutes" ;
  timeReplicant.value.setTimes.set1 = set1CompTime;
  return set1CompTime;
}

function completeSet2() {
  set2CompTime = timeCount-set1CompTime;
  set2Time.innerHTML = Math.floor(set2CompTime / 60) + " minutes" ;
  timeReplicant.value.setTimes.set2 = set2CompTime;
  return set2CompTime;
  
}

function completeSet3() {
  set3CompTime = timeCount-set1CompTime-set2CompTime;
  set3Time.innerHTML = Math.floor(set3CompTime / 60) + " minutes" ;
  timeReplicant.value.setTimes.set3 = set3CompTime;
  return set3CompTime; 
}

NodeCG.waitForReplicants(timeReplicant).then(() => {
  timeCount = timeReplicant.value.matchTime;
  matchTimer.innerHTML = moment().hour(0).minute(0).second(timeCount).format('HH : mm : ss');
  set1Time.innerHTML = Math.floor(timeReplicant.value.setTimes.set1 / 60) + " minutes" ;
  set2Time.innerHTML = Math.floor(timeReplicant.value.setTimes.set2 / 60) + " minutes" ;
  set3Time.innerHTML = Math.floor(timeReplicant.value.setTimes.set3 / 60) + " minutes" ;

});

NodeCG.waitForReplicants(timeReplicant).then(() => {

  court.value = matchReplicant.value.matchInfo.court;
  format.value = matchReplicant.value.matchInfo.format;
  round.value = matchReplicant.value.matchInfo.round;

});

saveMatchInfo.onclick = () => {
  matchReplicant.value.matchInfo.court = court.value
  matchReplicant.value.matchInfo.round = round.value
  matchReplicant.value.matchInfo.format = format.value
}