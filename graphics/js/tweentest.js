	// We can access Replicants from other bundles by specifying the bundle name as a second parameter.
	// NodeCG requires that bundle names match their directory names, but you can always check the `package.json` to double check.
	const matchReplicant = nodecg.Replicant('match');

	let whoWon;
	let playerA_width;
	let playerB_width;
	let playerName_width;

	let pointDur = 0.18;
	
	let anim = gsap.timeline();



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

		
		if (newValue.playerA.personalInfo.serveIndicator === true) {
			gsap.to("#playerB_serve", {duration: pointDur, opacity: 0, onComplete: function () {
				gsap.to("#playerA_serve", { duration: pointDur, opacity: 1, delay: 0.1})
			}})
		} else {
			gsap.to("#playerA_serve", {duration: pointDur, opacity: 0, onComplete: function () {
				gsap.to("#playerB_serve", { duration: pointDur, opacity: 1, delay: 0.1})
			}})
		}

		// visibility
		if (newValue.scoreboardVisible != oldValue.scoreboardVisible) {
			switch (newValue.scoreboardVisible) {
				case false:
					// gsap.to('#scoreContainer', {opacity: 0, duration: 0.5})
					anim.to('#pointsWonContainer', {duration: 0.3, width: '0px'})
					anim.to('#gamesWonContainer', {duration: 0.3, width: '0px'}, "<33%")
					anim.to('#setsWonContainer', {duration: 0.3, width: '0px'}, "<33%")
					anim.to('#nameContainer', {duration: 0.5, width: '0px'}, "<33%")
					anim.to('#animateContainer', {duration: 0.4, height: '0px',  ease: "power1.in"})
					break;
				case true:
					anim.to('#animateContainer', {duration: 0.5, height: '80px', ease: "power1.out"})
					anim.to('#nameContainer', {duration: 0.5, width: 'auto'})
					anim.to('#setsWonContainer', {duration: 0.3, width: '40px'}, "<33%")
					anim.to('#gamesWonContainer', {duration: 0.3, width: '40px'}, "<33%")
					anim.to('#pointsWonContainer', {duration: 0.3, width: '40px'}, "<33%")
					break;
			}
		}
		

		// END
	});


