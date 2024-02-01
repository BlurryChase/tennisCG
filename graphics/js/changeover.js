	// We can access Replicants from other bundles by specifying the bundle name as a second parameter.
	// NodeCG requires that bundle names match their directory names, but you can always check the `package.json` to double check.
	const matchReplicant = nodecg.Replicant('match');
	const timeReplicant = nodecg.Replicant('time');

	let animChangeover = gsap.timeline();

	NodeCG.waitForReplicants(timeReplicant).then(() => {

		set1Timer.innerHTML = Math.floor(timeReplicant.value.setTimes.set1 / 60) + "'" ;
		set2Timer.innerHTML = Math.floor(timeReplicant.value.setTimes.set2 / 60) + "'" ;
		set3Timer.innerHTML = Math.floor(timeReplicant.value.setTimes.set3 / 60) + "'" ;

		if (timeReplicant.value.matchTime >= 3600) {
			let mins = Math.floor(timeReplicant.value.matchTime / 60);
			console.log(mins);
			let hrs = Math.floor(mins / 60);
			console.log(hrs)
			mins = Math.floor(mins % (hrs * 60));
			if (hrs >= 2) {
				matchTime.innerHTML = hrs + 'hrs ' + mins + 'mins';
			} else {
				matchTime.innerHTML = hrs + 'hr ' + mins + 'mins';
			}
		} else {
			matchTime.innerHTML = Math.floor(timeReplicant.value.matchTime / 60)   + 'mins';

		}

	});

	NodeCG.waitForReplicants(matchReplicant).then(() => {
		
		// match info

		format.innerHTML = matchReplicant.value.matchInfo.format;
		round.innerHTML = matchReplicant.value.matchInfo.round;

		// player info
		
		// populate player A's personal information
		// player A name
		playerA_fullName.innerHTML = `${matchReplicant.value.playerA.personalInfo.firstName} ${matchReplicant.value.playerA.personalInfo.lastName}`
		// player A nationality
		playerA_nationality.innerHTML = matchReplicant.value.playerA.personalInfo.nation;
		// player A seed
		if (matchReplicant.value.playerA.personalInfo.seed != "") {
			playerA_seed.innerHTML = `(${matchReplicant.value.playerA.personalInfo.seed})`;
		}

		// populate player B's personal information
		// player B name
		playerB_fullName.innerHTML = `${matchReplicant.value.playerB.personalInfo.firstName} ${matchReplicant.value.playerB.personalInfo.lastName}`
		// player B nationality
		playerB_nationality.innerHTML = matchReplicant.value.playerB.personalInfo.nation;
		// player B seed
		if (matchReplicant.value.playerB.personalInfo.seed != "") {
			playerB_seed.innerHTML = `(${matchReplicant.value.playerB.personalInfo.seed})`;
		}

		// serve indicator

		if (matchReplicant.value.playerA.personalInfo.serveIndicator === true) {
			playerA_serve.style.opacity = 1;
			playerB_serve.style.opacity = 0;
		} else {
			playerA_serve.style.opacity = 0;
			playerB_serve.style.opacity = 1;
		}

		// set info

		for (const [key, value] of Object.entries(matchReplicant.value.playerA.completedSets.gamesPerSet)) {
			document.querySelector(`#playerA_${key}`).innerHTML = value;
		}

		for (const [key, value] of Object.entries(matchReplicant.value.playerB.completedSets.gamesPerSet)) {
			document.querySelector(`#playerB_${key}`).innerHTML = value;
		}

		// check if the game counts for player A & B are both 0. if yes, opacity for that set will be set to 0. 
		for (let i = 0; i < 3; i++) {
			if (document.querySelector(`#playerA_set${i+1}`).innerText == 0 && document.querySelector(`#playerB_set${i+1}`).innerText == 0) {
				document.querySelector(`#playerA_set${i+1}`).style.opacity = 0;
				document.querySelector(`#playerB_set${i+1}`).style.opacity = 0;
				document.querySelector(`#set${i+1}Timer`).style.opacity = 0;
			}
		}



		
	});

	timeReplicant.on('change', (newValue, oldValue) => {

		set1Timer.innerHTML = Math.floor(newValue.setTimes.set1 / 60) + "'" ;
		set2Timer.innerHTML = Math.floor(newValue.setTimes.set2 / 60) + "'" ;
		set3Timer.innerHTML = Math.floor(newValue.setTimes.set3 / 60) + "'" ;

		if (newValue.matchTime >= 3600) {
			let mins = Math.floor(newValue.matchTime / 60);
			let hrs = Math.floor(mins / 60);
			mins = Math.floor(mins % (hrs * 60));
			if (hrs >= 2) {
				matchTime.innerHTML = hrs + 'hrs ' + mins + 'mins';
			} else {
				matchTime.innerHTML = hrs + 'hr ' + mins + 'mins';
			}
		} else {
			matchTime.innerHTML = Math.floor(newValue.matchTime / 60)   + 'mins';

		}
	});

	// Change will be called when the Replicant loads too, so we can use it to set the initial value.
	matchReplicant.on('change', (newValue, oldValue) => {
		//  START

		// match info

		format.innerHTML = newValue.matchInfo.format;
		round.innerHTML = newValue.matchInfo.round;

		// personal info

		// player a

		playerA_fullName.innerHTML = `${newValue.playerA.personalInfo.firstName} ${newValue.playerA.personalInfo.lastName}`

		playerA_nationality.innerHTML = newValue.playerA.personalInfo.nation;
		// player A seed
		if (newValue.playerA.personalInfo.seed !== 0) {
			playerA_seed.innerHTML = `(${newValue.playerA.personalInfo.seed})`;
		} else {
			playerA_seed.innerHTML = '';
		}

		// player B

		playerB_fullName.innerHTML = `${newValue.playerB.personalInfo.firstName} ${newValue.playerB.personalInfo.lastName}`

		playerB_nationality.innerHTML = newValue.playerB.personalInfo.nation;
		// player B seed
		if (newValue.playerB.personalInfo.seed !== 0) {
			playerB_seed.innerHTML = `(${newValue.playerB.personalInfo.seed})`;
		} else {
			playerB_seed.innerHTML = '';
		}

		// serve

		if (newValue.playerA.personalInfo.serveIndicator === true) {
			gsap.to("#playerB_serve", {duration: 0, opacity: 0, onComplete: function () {
				gsap.to("#playerA_serve", { duration: 0, opacity: 1, delay: 0})
			}})
		} else {
			gsap.to("#playerA_serve", {duration: 0, opacity: 0, onComplete: function () {
				gsap.to("#playerB_serve", { duration: 0, opacity: 1, delay: 0})
			}})
		}

		// set info


		for (const [key, value] of Object.entries(newValue.playerA.completedSets.gamesPerSet)) {
			document.querySelector(`#playerA_${key}`).innerHTML = value;
		}

		for (const [key, value] of Object.entries(newValue.playerB.completedSets.gamesPerSet)) {
			document.querySelector(`#playerB_${key}`).innerHTML = value;
		}

		// check if the game counts for player A & B are both 0. if yes, opacity for that set will be set to 0. 
		for (let i = 0; i < 3; i++) {
			if (document.querySelector(`#playerA_set${i+1}`).innerText == 0 && document.querySelector(`#playerB_set${i+1}`).innerText == 0) {
				document.querySelector(`#playerA_set${i+1}`).style.opacity = 0;
				document.querySelector(`#playerB_set${i+1}`).style.opacity = 0;
			} else {
				document.querySelector(`#playerA_set${i+1}`).style.opacity = 1;
				document.querySelector(`#playerB_set${i+1}`).style.opacity = 1;
			}
		}

		// visibility
		if (newValue.changeoverVisible != oldValue.changeoverVisible) {
			switch (newValue.changeoverVisible) {
				case false:
					// gsap.to('#scoreContainer', {opacity: 0, duration: 0.5})
					animChangeover.to('#greenFlair', {duration: 0.2, width: '0px'},)
					animChangeover.to('.scoreContainer', {duration: 0.8, width: '0px', ease: "power1.out"}, "<33%")
					animChangeover.to('.infoContainer', {duration: 1, width: '0px', ease: "power1.out"}, "<33%")
					animChangeover.to('.tourneyContainer', {duration: 0.4, height: '0px', width: '0px',  ease: "power1.in"})
					break;
				case true:
					animChangeover.to('.tourneyContainer', {duration: 0.4, height: '200px', width: '110px', ease: "power1.out"})
					animChangeover.to('.infoContainer', {duration: 1, width: '560px', ease: "power1.out"})
					animChangeover.to('.scoreContainer', {duration: 0.8, width: '184px', ease: "power1.out"}, "<33%")
					animChangeover.to('#greenFlair', {duration: 0.2, width: '10px'}, "<33%")
					break;
			}
		}
		

		// END
	});


