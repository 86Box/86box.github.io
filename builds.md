---
layout: page
title: "Experimental builds"
---

# Experimental builds

These pre-release testing builds are made from the latest 86Box source code on [GitHub](https://github.com/86Box/86Box). They may contain bugs, unfinished features, reduced performance or other issues.

Most people should use the regular [**release builds**](https://github.com/86Box/86Box/releases/latest) instead; however, if you run into an issue with those, you can check if it's fixed on the latest testing build<span id="below"> displayed below</span>. The **Bisect** button can help you locate the exact build in which the issue started occurring.

---

<script>
addEvent(window, 'load', function() {
	/* Perform initial load. */
	window.firstBuildLoad = true;
	window.inBisectMode = false;
	window.bisectFirstBuildNumber = 885;
	window.bisectLatestBuildNumber = window.bisectMinBuildNumber = window.bisectMaxBuildNumber = window.bisectTargetBuildNumber = 0;
	window.bisectSkipDirection = 1;
	if (document.location.hash && document.location.hash.match) {
		/* Use different build number if requested (#number). */
		var hashMatch = document.location.hash.match(/^#([0-9]+)/);
		if (hashMatch) {
			document.getElementById('buildnumber').value = unescape(hashMatch[1]);
			window.firstBuildLoad = false;
		} else if (document.location.hash == '#bisect') {
			/* Enter bisect mode if requested. */
			submitBisect();
		}
	}
	submitBuild();
});
function scrollBuild() {
	/* Don't scroll after the initial load. */
	if (window.firstBuildLoad)
		return;

	/* Scroll to build form. */
	var buildForm = document.getElementById('buildform');
	if (buildForm.scrollIntoView)
		buildForm.scrollIntoView();
}
function bisectNextBuild(buildNumberVal) {
	/* Calculate next build number. */
	var newBuildNumber = buildNumberVal + window.bisectSkipDirection;
	if ((window.bisectSkipDirection == 1) && (newBuildNumber >= window.bisectMaxBuildNumber)) {
		/* Start walking backwards if we hit a series of bad builds ending in our max number. */
		window.bisectSkipDirection = -1;
		return bisectNextBuild(window.bisectTargetBuildNumber);
	}

	/* Load next build number. */
	document.getElementById('buildnumber').value = newBuildNumber.toString();
	submitBuild();
}
function submitBuild() {
	var buildNumberVal = parseInt(document.getElementById('buildnumber').value.replace('#', ''));

	/* Hide build flag buttons when in bisect mode. */
	document.getElementById('bisectbtns').style.display = 'none';

	/* Show loading message. */
	var buildBins = document.getElementById('buildbins');
	buildBins.innerHTML = '';
	var p = document.createElement('p');
	p.appendChild(document.createTextNode('Loading build information...'));
	buildBins.appendChild(p);
	scrollBuild();
	document.getElementById('below').style.display = buildNumberVal ? 'none' : 'inline';

	/* Check build number if in bisect mode. */
	if (window.bisectTargetBuildNumber && ((buildNumberVal <= window.bisectMinBuildNumber) || (buildNumberVal >= window.bisectMaxBuildNumber))) {
		var suspect;
		if ((window.bisectMaxBuildNumber - window.bisectMinBuildNumber) > 1)
			suspect = 'a build between <b>' + (window.bisectMinBuildNumber + 1) + '</b> and <b>' + window.bisectMaxBuildNumber;
		else
			suspect = 'build <b>' + window.bisectMaxBuildNumber;
		buildBins.firstChild.innerHTML = 'No more builds to bisect; ' + suspect + '</b> is the suspect.';
		window.bisectTargetBuildNumber = 0;
		window.bisectSkipDirection = 1;
		return;
	}

	/* Load build information from Jenkins. */
	var script = document.createElement('script');
	script.setAttribute('src', '//ci.86box.net/job/86Box/' + (buildNumberVal || 'lastSuccessfulBuild') + '/api/json?jsonp=listBuild&noCache=' + new Date().getTime());
	script.setAttribute('data-bnval', buildNumberVal);
	addEvent(script, 'error', function() {
		/* If in bisect mode, then just increment the build number, unless we're in an invalid build number. */
		var scriptBuildNumberVal = parseInt(script.getAttribute('data-bnval') || buildNumberVal);
		if (window.inBisectMode && scriptBuildNumberVal && !(scriptBuildNumberVal < window.bisectFirstBuildNumber) && !(scriptBuildNumberVal > window.bisectLatestBuildNumber)) /* these weird comparisons also cover NaN */
			return bisectNextBuild(scriptBuildNumberVal);

		/* Show error message. */
		buildBins.firstChild.innerHTML = 'Could not load build information.';
		scrollBuild();
		window.firstBuildLoad = false;
	});
	document.body.appendChild(script);
}
function listBuild(data) {
	/* Set build number on input box. */
	var buildNumberVal = parseInt(data['id']);
	document.getElementById('buildnumber').value = buildNumberVal.toString();
	if (window.firstBuildLoad)
		window.bisectLatestBuildNumber = buildNumberVal;

	/* Check for failure. */
	var buildBins = document.getElementById('buildbins');
	if (data['result'] != 'SUCCESS') {
		/* If in bisect mode, then just increment the build number. */
		if (window.inBisectMode)
			return bisectNextBuild(buildNumberVal);

		buildBins.firstChild.innerHTML = 'This build failed to compile, please try a different one.';
		return;
	}

	/* Display build flag buttons when in bisect mode. */
	if (window.inBisectMode)
		document.getElementById('bisectbtns').style.display = 'block';

	/* Sort directory structure. */
	var dynarecNames = ['Old Recompiler (recommended)', 'New Recompiler (beta)', 'Old Recompiler Optimized (not recommended)', 'No Dynamic Recompiler'];
	var osPrefixes = ['Windows', 'macOS', 'Linux'];
	var archSuffixes = ['Universal (Intel and Apple Silicon)', 'x64 (64-bit)', 'x86 (32-bit)', 'ARM (64-bit)', 'ARM (32-bit)'];
	if (data['artifacts'].sort) {
		data['artifacts'].sort(function(a, b) {
			/* Compare by dynarec. */
			var aPath = a['relativePath'];
			var aSlash = aPath.indexOf('/');
			var aIndex = dynarecNames.indexOf(aPath.slice(0, aSlash));
			var bPath = b['relativePath'];
			var bSlash = bPath.indexOf('/');
			var bIndex = dynarecNames.indexOf(bPath.slice(0, bSlash));

			/* If dynarecs are equal, then compare by OS. */
			if (aIndex == bIndex) {
				var aSpace = aPath.indexOf(' ', aSlash);
				aIndex = osPrefixes.indexOf(aPath.slice(aSlash + 1, aSpace));
				var bSpace = bPath.indexOf(' ', bSlash);
				bIndex = osPrefixes.indexOf(bPath.slice(bSlash + 1, bSpace));

				/* If OSes are equal, then compare by architecture. */
				if (aIndex == bIndex) {
					aIndex = archSuffixes.indexOf(aPath.slice(aSpace + 3, aPath.indexOf('/', aSpace)));
					bIndex = archSuffixes.indexOf(bPath.slice(bSpace + 3, bPath.indexOf('/', bSpace)));
				}
			}

			var dummy = data['artifacts'].length; /* can't be Infinity on IE6 */
			return ((aIndex == -1) ? dummy : aIndex) - ((bIndex == -1) ? dummy : bIndex);
		});
	}

	/* Parse directory structure. */
	var ul = document.createElement('ul');
	var a;
	var listEntry;
	var pathElements = {'': ul};
	for (var artifactId = 0; artifactId < data['artifacts'].length; artifactId++) {
		var artifact = data['artifacts'][artifactId];
		if (!artifact['fileName'].match(/-(Debug|Optimized)-|^Debug only,/)) {
			var split = artifact['relativePath'].split('/');
			for (var i = 0; i < split.length; i++) {
				/* Skip paths that were already processed. */
				var path = split.slice(0, i + 1).join('/');
				if (pathElements[path])
					continue;

				/* Create list entry. */
				listEntry = document.createElement('li');
				var parentElement = pathElements[split.slice(0, i).join('/')];
				if (i == (split.length - 1)) {
					/* Add file link. */
					a = document.createElement('a');
					a.href = '//ci.86box.net/job/86Box/' + buildNumberVal + '/artifact/' + artifact['relativePath'];
					a.appendChild(document.createTextNode(artifact['fileName']));
					listEntry.appendChild(a);
				} else {
					/* Add subdirectory name and listing. */
					listEntry.innerHTML = split[i];
					pathElements[path] = document.createElement('ul');
					listEntry.appendChild(pathElements[path]);
				}

				/* Add new list entry to parent. */
				parentElement.appendChild(listEntry);
			}
		}
	}

	/* Get system information with optional user agent (#uaOverride=...) and type (#type=...) overrides. */
	var ua = navigator.userAgent;
	var osArch;
	var osArchProvided = false;
	if (window.location.hash && window.location.hash.match) {
		var hashMatch = window.location.hash.match(/^#uaOverride=(.+)/);
		if (hashMatch) {
			ua = unescape(hashMatch[1]);
		} else {
			hashMatch = window.location.hash.match(/^#(win|mac|lin)(arm)?(32|64)([on]dr)?/);
			if (hashMatch) {
				osArchProvided = true;
				osArch = unescape(hashMatch[1] + (hashMatch[2] || '') + hashMatch[3]);
				switch (unescape(hashMatch[4] || '')) {
					case 'odr':
						dynarecNames.unshift('Old Recompiler (recommended)');
						break;

					case 'ndr':
						dynarecNames.unshift('New Recompiler (beta)');
						break;
				}
			}
		}
	}

	/* Detect operating system and architecture. */
	osNames = [];
	if (!osArch) {
		if (ua.match(/Windows NT/i)) {
			if (ua.match(/a(arch|rm)64/i))
				osArch = 'winarm64';
			else if (ua.match(/(Win|WOW|x(86[-_])?)64/i))
				osArch = 'win64';
			else
				osArch = 'win32';
		} else if (ua.match(/Mac OS X/i)) {
			if (!ua.match(/Intel Mac OS X/i)) /* not all browsers (if any at all) are reporting AS... */
				osArch = 'macarm64';
			else
				osArch = 'mac64';
		} else if (ua.match(/Linux/i)) {
			if (ua.match(/a(arch|rm)64/i))
				osArch = 'linarm64';
			else if (ua.match(/arm(v[0-9]|el|hf)/i))
				osArch = 'linarm32';
			else if (ua.match(/(x(86[-_])?|amd)64/i))
				osArch = 'lin64';
			else if (ua.match(/x86|i[3456]86/i))
				osArch = 'lin32';
		}
	}
	switch (osArch) {
		case 'winarm64':
			osNames.push('Windows - ARM (64-bit)');
			/* fallthrough */

		case 'win64':
			osNames.push('Windows - x64 (64-bit)');
			/* fallthrough */

		case 'win32': /* deprecated */
			osNames.push('Windows - x86 (32-bit)');
			if (osArch == 'win32')
				osNames.push('Windows - x64 (64-bit)'); /* common ground just in case detection fails */
			break;

		case 'macarm64':
			osNames.push('macOS - Apple Silicon');
			/* fallthrough */

		case 'mac64':
			osNames.push('macOS - Universal (Intel and Apple Silicon)');
			osNames.push('macOS - Intel');
			break;

		case 'lin64':
			osNames.push('Linux - x64 (64-bit)');
			break;

		case 'lin32': /* deprecated */
			osNames.push('Linux - x86 (32-bit)');
			break;

		case 'linarm64':
			osNames.push('Linux - ARM (64-bit)');
			break;

		case 'linarm32': /* deprecated */
			osNames.push('Linux - ARM (32-bit)');
			break;
	}

	/* Look for OS/architecture nodes on each dynarec. */
	var found = false;
	var p;
	for (var dynarecId = 0; dynarecId < dynarecNames.length; dynarecId++) {
		for (var osId = 0; osId < osNames.length; osId++) {
			var targetPath = dynarecNames[dynarecId] + '/' + osNames[osId];
			var targetPathElement = pathElements[targetPath];
			if (!targetPathElement || !targetPathElement.firstChild)
				continue;

			var existingLink = targetPathElement.firstChild.firstChild;
			while (existingLink) {
				if ((existingLink.nodeName == 'A') && !existingLink.innerHTML.match(/-(Debug|Source|Dev(ODR)?)-/)) {
					found = true;

					/* Insert recommended variant. */
					targetPath += '/' + existingLink.innerHTML;
					buildBins.firstChild.innerHTML = '<b>Recommended download</b> for your ' + (osArchProvided ? 'current 86Box setup' : 'system') + ':';
					buildBins.firstChild.appendChild(document.createElement('br'));
					a = document.createElement('a');
					a.href = existingLink.href;
					targetPath = targetPath.replace(/(ARM) \(([0-9]+)-bit\)/, '$1$2').replace(/ \([^\)]+\)|- /g, '').replace('/', ' for ').replace('/', ': ');
					a.appendChild(document.createTextNode(targetPath));
					buildBins.firstChild.appendChild(a);

					/* Add header for the variant list. */
					p = document.createElement('p');
					p.innerHTML = '<b>Other downloads:</b>';
					buildBins.appendChild(p);

					break;
				}
				a = a.nextSibling;
			}
			if (found)
				break;
		}
		if (found)
			break;
	}

	/* Add variant list. */
	if (!found)
		buildBins.firstChild.innerHTML = '<b>Downloads:</b>';
	buildBins.appendChild(ul);

	/* Add build information. */
	p = document.createElement('p');
	p.innerHTML = '<b>Build information:</b>';
	buildBins.appendChild(p);
	p = document.createElement('p');
	var cause;
	for (var actionId = 0; actionId < data['actions'].length; actionId++) {
		var action = data['actions'][actionId];
		if (action['_class'] == 'hudson.model.CauseAction') {
			for (var causeId = 0; causeId < action['causes'].length; causeId++) {
				cause = action['causes'][causeId]['shortDescription'];
				if (cause) {
					cause = ' ' + cause.replace(/^Started /, '').replace(' push by ', ' push from ');
					break;
				}
			}
		}
		if (cause)
			break;
	}
	var ts = new Date(data['timestamp']);
	var started = ts.toString();
	if (ts.toDateString && ts.toTimeString)
		started = ts.toDateString() + ' ' + ts.toTimeString().replace(/ \([^\)]+\)/g, '');
	p.appendChild(document.createTextNode('Started ' + started + (cause || '')));
	p.appendChild(document.createElement('br'));
	p.appendChild(document.createTextNode('More information on the '));
	a = document.createElement('a');
	a.href = data['url'];
	a.target = '_blank';
	a.appendChild(document.createTextNode('Jenkins page'));
	p.appendChild(a);
	p.appendChild(document.createTextNode('.'));
	buildBins.appendChild(p);

	/* Add commits. */
	var commits = document.createElement('ul');
	for (var changeSetId = 0; changeSetId < data['changeSets'].length; changeSetId++) {
		var changeSet = data['changeSets'][changeSetId];
		if ((changeSet['_class'] == 'hudson.plugins.git.GitChangeSetList') && changeSet['items']) {
			for (var changeSetItemId = 0; changeSetItemId < changeSet['items'].length; changeSetItemId++) {
				var changeSetItem = changeSet['items'][changeSetItemId];
				if (changeSetItem['_class'] == 'hudson.plugins.git.GitChangeSet') {
					a = document.createElement('a');
					a.href = '//github.com/86Box/86Box/commit/' + changeSetItem['commitId'];
					a.target = '_blank';
					a.appendChild(document.createTextNode(changeSetItem['msg']));
					listEntry = document.createElement('li');
					listEntry.appendChild(a);
					commits.appendChild(listEntry);
				}
			}
		}
	}
	if (commits.firstChild) {
		p = document.createElement('p');
		p.innerHTML = '<b>Changes:</b>';
		buildBins.appendChild(p);
		buildBins.appendChild(commits);
	}

	/* All done, scroll to the loaded section. */
	scrollBuild();
	window.firstBuildLoad = false;
}
function submitBisect() {
	/* Enter bisect mode. */
	window.inBisectMode = true;
	document.getElementById('bisectenable').style.display = 'none';
	document.getElementById('goodbuild').value = '';
	document.getElementById('badbuild').value = document.getElementById('buildnumber').value;
	document.getElementById('bisectform').style.display = 'block';
}
function updateBisect(btn) { /* delayed on keypress to let the input value update first */
	/* Apply new good/bad build number if this is a button press. */
	var buildNumber = document.getElementById('buildnumber');
	if (btn)
		document.getElementById(btn.value + 'build').value = buildNumber.value;

	/* Verify good and bad build numbers. */
	var goodBuildNumber = parseInt(document.getElementById('goodbuild').value);
	var badBuildNumber = parseInt(document.getElementById('badbuild').value);
	var tryMsg = document.getElementById('bisecttry');
	if (!(goodBuildNumber >= window.bisectFirstBuildNumber) || !(badBuildNumber >= window.bisectFirstBuildNumber)) { /* these weird comparisons also cover NaN */
		tryMsg.style.display = 'none';
		return;
	}
	tryMsg.style.display = 'inline';

	/* Set new target build number. */
	window.bisectMinBuildNumber = Math.min(goodBuildNumber, badBuildNumber);
	window.bisectMaxBuildNumber = Math.max(goodBuildNumber, badBuildNumber);
	window.bisectTargetBuildNumber = Math.floor((window.bisectMinBuildNumber + window.bisectMaxBuildNumber) / 2);
	buildNumber.value = window.bisectTargetBuildNumber.toString();
	window.bisectSkipDirection = 1;

	/* Validate and send the new target build number if this is a button press. */
	if (btn)
		submitBuild();
}
</script>

<noscript><p><b>This page requires JavaScript to work.</b> You can download the latest build directly from the <a href="https://ci.86box.net/job/86Box/lastSuccessfulBuild/">Jenkins page</a>.</p></noscript>
<form id="buildform" action="#" onsubmit="return false">
<div id="bisectform">
	<b>Good build:</b> <input type="text" inputmode="numeric" pattern="#?\d*" id="goodbuild" size="4" class="bisectgood" oninput="updateBisect()" onkeypress="setTimeout(updateBisect, 1)" onchange="updateBisect()" /><br />
	<b>&nbsp;Bad build:</b> <input type="text" inputmode="numeric" pattern="#?\d*" id="badbuild" size="4" class="bisectbad" oninput="updateBisect()" onkeypress="setTimeout(updateBisect, 1)" onchange="updateBisect()" /><br />
	<span id="bisecttry">&darr; now try: &darr;</span><br />
</div>
<b>Build number:</b> <input type="text" inputmode="numeric" placeholder="Latest" pattern="#?\d*" id="buildnumber" size="4" /> <input type="submit" value="Get downloads" onclick="submitBuild()"> <input type="submit" value="Bisect" id="bisectenable" onclick="submitBisect()" />
<p id="bisectbtns">Mark this build as: <input type="submit" value="good" class="bisectgood" onclick="updateBisect(this)" /> <input type="submit" value="bad" class="bisectbad" onclick="updateBisect(this)" /></p>
<div id="buildbins"></div>
</form>
