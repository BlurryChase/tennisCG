	// We can access Replicants from other bundles by specifying the bundle name as a second parameter.
	// NodeCG requires that bundle names match their directory names, but you can always check the `package.json` to double check.
	const matchReplicant = nodecg.Replicant('match');

	NodeCG.waitForReplicants(matchReplicant).then(() => {
		
		// match info

		// note for future chase, this is also where timer info will go

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
			}
		}



		
	});

	// Change will be called when the Replicant loads too, so we can use it to set the initial value.
	matchReplicant.on('change', (newValue, oldValue) => {
		//  START

		// match info

		// note for future chase, this is also where timer info will go

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
		

		// END
	});


