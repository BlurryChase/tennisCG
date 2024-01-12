	// We can access Replicants from other bundles by specifying the bundle name as a second parameter.
	// NodeCG requires that bundle names match their directory names, but you can always check the `package.json` to double check.
	const matchReplicant = nodecg.Replicant('match');

	NodeCG.waitforReplicants(matchReplicant).then(() => {

	});

	// Change will be called when the Replicant loads too, so we can use it to set the initial value.
	matchReplicant.on('change', (newValue, oldValue) => {
		
	});