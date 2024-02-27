import { gsap } from 'gsap';
	
	// We can access Replicants from other bundles by specifying the bundle name as a second parameter.
	// NodeCG requires that bundle names match their directory names, but you can always check the `package.json` to double check.
	const matchReplicant = nodecg.Replicant('match');

	let whoWon;
	let playerA_width;
	let playerB_width;
	let playerName_width;

	let pointDur = 0.18

	let animScoreboard = gsap.timeline();

	// function pointCheck modifies innerHTML for the point's winner to line up with tennis point scoring, including A for Advantage

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

		// waitForReplicants allows us to call out the replicant variables we need to load the page properly.
		// you *can* get around this, but since we are comparing OldValue against NewValue, some stuff won't load or animate properly if we rely on the change event
		
		
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

		// checking if the old value for games won matches the new value. if it's true, we animate the old number out and replace it with the new value
		if (oldValue.playerA.currentSet.gamesWon != newValue.playerA.currentSet.gamesWon) {
			gsap.to("#playerA_gamesWon", {duration: pointDur, opacity: 0, onComplete: function () {
				playerA_gamesWon.innerHTML = newValue.playerA.currentSet.gamesWon;
				gsap.to("#playerA_gamesWon", { duration: pointDur, opacity: 1 });
			}});
		}

		// checking if the old value for points won matches the new value. if it's true, we animate the old number out and replace it with the new value
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


		// in theory sets won shouldn't be updated when the graphic is visible
		playerA_setsWon.innerHTML = 
		Number(newValue.playerA.completedSets.setWon.set1) + 
		Number(newValue.playerA.completedSets.setWon.set2) + 
		Number(newValue.playerA.completedSets.setWon.set3) ;

		// player b

		playerB_name.innerHTML = newValue.playerB.personalInfo.lastName;

		// checking if the old value for games won matches the new value. if it's true, we animate the old number out and replace it with the new value
		if (oldValue.playerB.currentSet.gamesWon != newValue.playerB.currentSet.gamesWon) {
			gsap.to("#playerB_gamesWon", {duration: pointDur, opacity: 0, onComplete: function () {
				playerB_gamesWon.innerHTML = newValue.playerB.currentSet.gamesWon;
				gsap.to("#playerB_gamesWon", { duration: pointDur, opacity: 1 });
			}});
		}
		
		// checking if the old value for points won matches the new value. if it's true, we animate the old number out and replace it with the new value
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

		// in theory sets won shouldn't be updated when the graphic is visible

		playerB_setsWon.innerHTML = 
		Number(newValue.playerB.completedSets.setWon.set1) + 
		Number(newValue.playerB.completedSets.setWon.set2) + 
		Number(newValue.playerB.completedSets.setWon.set3) ;

		// Check for if Player A is serving. If true, indicator is visible for them and not Player B. If false, other way around

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
					// console.log("duece reached")
					if (document.getElementById("playerA_pointsWon").style.opacity == 0) {
						// console.log('setting player A opacity...')
						gsap.to("#playerA_pointsWon", { duration: pointDur, opacity: 1, delay: pointDur })	
					}
					console.log('midpoint');
					if (document.getElementById("playerB_pointsWon").style.opacity == 0) {
						// console.log('setting player B opacity...')
						gsap.to("#playerB_pointsWon", { duration: pointDur, opacity: 1, delay: pointDur })	
					}
					return;
			
				
		}};

		// visibility

		/*
		this uses GSAP to animate in and out, visit https://gsap.com/docs/v3/ for documentation
		
		uses the timeline object declared at the beginning of the file, to generalize:

		animChangeover.to([target DOM Element], {animation variables [duration, width, etc...]}, [animation start overlap, "<33%" starts animation when previous animation is 33% complete])

		*/
		if (newValue.scoreboardVisible != oldValue.scoreboardVisible) {
			switch (newValue.scoreboardVisible) {
				case false:
					// gsap.to('#scoreContainer', {opacity: 0, duration: 0.5})
					animScoreboard.to('#pointsWonContainer', {duration: 0.3, width: '0px'})
					animScoreboard.to('#gamesWonContainer', {duration: 0.3, width: '0px'}, "<33%")
					animScoreboard.to('#setsWonContainer', {duration: 0.3, width: '0px'}, "<33%")
					animScoreboard.to('#nameContainer', {duration: 0.5, width: '0px'}, "<33%")
					animScoreboard.to('#animateContainer', {duration: 0.4, height: '0px',  ease: "power1.in"})
					break;
				case true:
					animScoreboard.to('#animateContainer', {duration: 0.5, height: '80px', ease: "power1.out"})
					animScoreboard.to('#nameContainer', {duration: 0.5, width: 'auto'})
					animScoreboard.to('#setsWonContainer', {duration: 0.3, width: '40px'}, "<33%")
					animScoreboard.to('#gamesWonContainer', {duration: 0.3, width: '40px'}, "<33%")
					animScoreboard.to('#pointsWonContainer', {duration: 0.3, width: '40px'}, "<33%")
					break;
			}
		}
		

		// END
	});


