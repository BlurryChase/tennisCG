	// We can access Replicants from other bundles by specifying the bundle name as a second parameter.
	// NodeCG requires that bundle names match their directory names, but you can always check the `package.json` to double check.
	const matchReplicant = nodecg.Replicant('match');

	let whoWon;
	let playerA_width;
	let playerB_width;
	let playerName_width;

	let pointDur = 0.18


	function pointCheck(whoWon, point) {
		console.log(point);
		switch (true) {
			case (point === 0):
				document.querySelector(`#${whoWon}_pointsWon`).innerText = '0';
				return;

			case (point === 1):
				document.querySelector(`#${whoWon}_pointsWon`).innerText = '15';
				return point;

			case (point === 2):
				document.querySelector(`#${whoWon}_pointsWon`).innerText = '30';
				return point;

			case (point === 3):
				document.querySelector(`#${whoWon}_pointsWon`).innerText = '40';
				return point;
				
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
		playerA_pointsWon.innerHTML = matchReplicant.value.playerA.currentSet.pointsWon; 

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
		playerB_pointsWon.innerHTML = matchReplicant.value.playerB.currentSet.pointsWon;

		// build dynamic shit go !!
		// document.querySelector('#playerA_name').



		// textFit(document.getElementsByClassName('playerNames'), { maxFontSize: 30, alignVert: true })
		// textFit(document.getElementsByClassName('playerPoints'), { maxFontSize: 28, alignVert: true, alignHoriz: true })
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
				whoWon = 'playerA';
				point = newValue.playerA.currentSet.pointsWon;
				pointCheck(whoWon, point);
				gsap.to("#playerA_pointsWon", { duration: pointDur, opacity: 1 });
			}});
		} 

		if (oldValue.playerA.currentSet.pointsWon != newValue.playerA.currentSet.pointsWon) {
			gsap.to("#playerA_pointsWon", {duration: pointDur, opacity: 0, onComplete: function () {
				whoWon = 'playerA';
				point = newValue.playerA.currentSet.pointsWon;
				pointCheck(whoWon, point);
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
				whoWon = 'playerB';
				point = newValue.playerB.currentSet.pointsWon;
				pointCheck(whoWon, point);
				gsap.to("#playerB_pointsWon", { duration: pointDur, opacity: 1 });
			}});
		} 

		playerB_setsWon.innerHTML = 
		Number(newValue.playerB.completedSets.setWon.set1) + 
		Number(newValue.playerB.completedSets.setWon.set2) + 
		Number(newValue.playerB.completedSets.setWon.set3) ;
		

		// END
	});


