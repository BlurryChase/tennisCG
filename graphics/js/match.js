	// We can access Replicants from other bundles by specifying the bundle name as a second parameter.
	// NodeCG requires that bundle names match their directory names, but you can always check the `package.json` to double check.
	const matchReplicant = nodecg.Replicant('match');

	let whoWon;
	let playerA_width;
	let playerB_width;
	let playerName_width;

	let pointDur = 0.18


	function pointCheck(whoWon, point) {
		switch (true) {
			case (point === 0):
				document.querySelector(`#${whoWon}_pointsWon`).innerText = '0';
				return;
			case (point === 1):
				document.querySelector(`#${whoWon}_pointsWon`).innerText = '15';
				return;
			case (point === 2):
				document.querySelector(`#${whoWon}_pointsWon`).innerText = '30';
				return;
			case (point === 3):
				document.querySelector(`#${whoWon}_pointsWon`).innerText = '40';
				return;
			case (point === 4):
				document.querySelector(`#${whoWon}_pointsWon`).innerText = 'A';
				return;

				
		}
	}

	NodeCG.waitForReplicants(matchReplicant).then(() => {
		// populate player A's information
		// player a name
		playerA_name.innerHTML = matchReplicant.value.playerA.personalInfo.lastName
		// player a sets won, adds them together by converting the booleans to numbers
		playerA_setsWon.innerHTML = 
		Number(matchReplicant.value.playerA.completedSets.setWon.set1) + 
		Number(matchReplicant.value.playerA.completedSets.setWon.set2) + 
		Number(matchReplicant.value.playerA.completedSets.setWon.set3) ; 
		// player a games won this set
		playerA_gamesWon.innerHTML = matchReplicant.value.playerA.currentSet.gamesWon;
		// player a points won this game
		if (matchReplicant.value.matchInfo.tiebreaker === true) {
			playerA_pointsWon.innerHTML = matchReplicant.value.playerA.currentSet.pointsWon
		} else {
			pointCheck('playerA', matchReplicant.value.playerA.currentSet.pointsWon)
		}

		// populate player b's information
		// player b name
		playerB_name.innerHTML = matchReplicant.value.playerB.personalInfo.lastName
		// player b sets won, adds them together by converting the booleans to numbers
		playerB_setsWon.innerHTML = 
		Number(matchReplicant.value.playerB.completedSets.setWon.set1) + 
		Number(matchReplicant.value.playerB.completedSets.setWon.set2) + 
		Number(matchReplicant.value.playerB.completedSets.setWon.set3) ; 
		// player b games won this set
		playerB_gamesWon.innerHTML = matchReplicant.value.playerB.currentSet.gamesWon;
		// player b points won this game
		
		if (matchReplicant.value.matchInfo.tiebreaker === true) {
			playerB_pointsWon.innerHTML = matchReplicant.value.playerB.currentSet.pointsWon
		} else {
			pointCheck('playerB', matchReplicant.value.playerB.currentSet.pointsWon)
		}


		if (matchReplicant.value.playerA.personalInfo.serveIndicator === true) {
			document.getElementById("playerA_serve").style.opacity = 1;
			document.getElementById("playerB_serve").style.opacity = 0;
		} else {
			document.getElementById("playerA_serve").style.opacity = 0;
			document.getElementById("playerB_serve").style.opacity = 1;
		}

		
	});

	// Change will be called when the Replicant loads too, so we can use it to set the initial value.
	matchReplicant.on('change', (newValue, oldValue) => {
		//  START

		// player a

		playerA_name.innerHTML = newValue.playerA.personalInfo.lastName;

		if (oldValue.playerA.currentSet.gamesWon != newValue.playerA.currentSet.gamesWon) {
			gsap.to("#playerA_gamesWon", {duration: pointDur, opacity: 0, onComplete: function () {
				playerA_gamesWon.innerHTML = newValue.playerA.currentSet.gamesWon;
				gsap.to("#playerA_gamesWon", { duration: pointDur, opacity: 1 });
			}});
		}
		
		if (oldValue.playerA.currentSet.pointsWon != newValue.playerA.currentSet.pointsWon) {
			gsap.to("#playerA_pointsWon", {duration: pointDur, opacity: 0, onComplete: function () {
				if (matchReplicant.value.matchInfo.tiebreaker === true) {
					playerA_pointsWon.innerHTML = newValue.playerA.currentSet.pointsWon
				} else {
					pointCheck('playerA', newValue.playerA.currentSet.pointsWon);
				}
				gsap.to("#playerA_pointsWon", { duration: pointDur, opacity: 1 });
			}});
		} 

		playerA_setsWon.innerHTML = 
		Number(newValue.playerA.completedSets.setWon.set1) + 
		Number(newValue.playerA.completedSets.setWon.set2) + 
		Number(newValue.playerA.completedSets.setWon.set3) ;

		// player b

		playerB_name.innerHTML = newValue.playerB.personalInfo.lastName;


		if (oldValue.playerB.currentSet.gamesWon != newValue.playerB.currentSet.gamesWon) {
			gsap.to("#playerB_gamesWon", {duration: pointDur, opacity: 0, onComplete: function () {
				playerB_gamesWon.innerHTML = newValue.playerB.currentSet.gamesWon;
				gsap.to("#playerB_gamesWon", { duration: pointDur, opacity: 1 });
			}});
		}
		
		if (oldValue.playerB.currentSet.pointsWon != newValue.playerB.currentSet.pointsWon) {
			gsap.to("#playerB_pointsWon", {duration: pointDur, opacity: 0, onComplete: function () {
				if (matchReplicant.value.matchInfo.tiebreaker === true) {
					playerB_pointsWon.innerHTML = newValue.playerB.currentSet.pointsWon
				} else {
					pointCheck('playerB', newValue.playerB.currentSet.pointsWon);
				}
				gsap.to("#playerB_pointsWon", { duration: pointDur, opacity: 1 });
			}});
		} 

		playerB_setsWon.innerHTML = 
		Number(newValue.playerB.completedSets.setWon.set1) + 
		Number(newValue.playerB.completedSets.setWon.set2) + 
		Number(newValue.playerB.completedSets.setWon.set3) ;

		
		if (newValue.playerA.personalInfo.serveIndicator === true) {
			gsap.to("#playerB_serve", {duration: pointDur, opacity: 0, onComplete: function () {
				gsap.to("#playerA_serve", { duration: pointDur, opacity: 1, delay: 0.1})
			}})
		} else {
			gsap.to("#playerA_serve", {duration: pointDur, opacity: 0, onComplete: function () {
				gsap.to("#playerB_serve", { duration: pointDur, opacity: 1, delay: 0.1})
			}})
		}

		// Check for an Advantage Point, also handles the op for returning opacities in case a duece is reached again

		if (matchReplicant.value.matchInfo.tiebreaker === false) {
			switch (true) {
				case (newValue.playerA.currentSet.pointsWon === 4 && newValue.playerB.currentSet.pointsWon === 3 ):
					gsap.to("#playerB_pointsWon", { duration: pointDur, opacity: 0 })	
					return;

				case (newValue.playerA.currentSet.pointsWon === 3 && newValue.playerB.currentSet.pointsWon === 4 ):
					gsap.to("#playerA_pointsWon", { duration: pointDur, opacity: 0 })	
					return;
				case (newValue.playerA.currentSet.pointsWon === 3 && newValue.playerB.currentSet.pointsWon === 3 ):
					console.log("duece reached")
					if (document.getElementById("playerA_pointsWon").style.opacity == 0) {
						console.log('setting player A opacity...')
						gsap.to("#playerA_pointsWon", { duration: pointDur, opacity: 1, delay: pointDur })	
					}
					console.log('midpoint');
					if (document.getElementById("playerB_pointsWon").style.opacity == 0) {
						console.log('setting player B opacity...')
						gsap.to("#playerB_pointsWon", { duration: pointDur, opacity: 1, delay: pointDur })	
					}
					return;
			
				
		}};
		

		// END
	});


