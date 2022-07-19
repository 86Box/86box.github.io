---
layout: page
title: "Debug binaries"
---

# Debug binaries

86Box provides binaries with debugging information to help in diagnosing crashes or other incorrect behavior. These binaries are compiled with the `--preset=debug` CMake flag, perform worse than regular binaries due to reduced optimizations, may require a development environment to run properly, and are **not recommended for non-debugging use**.

The debuggers we use and recommend are:

* MSYS2 GDB on Windows - [build dependencies](https://86box.readthedocs.io/en/latest/dev/buildguide.html#msys2) plus `$MINGW_PACKAGE_PREFIX-qt5` are required since Windows debug binaries are dynamically linked;
* GDB on Linux;
* LLDB on macOS.

**IMPORTANT: Debug binaries should only be used if you know what you're doing. If you don't know what any of this means, [go to Jenkins](https://ci.86box.net/job/86Box/) and download regular binaries.**

<script>
	window.onload = function() {
		/* Load job information from Jenkins. */
		var script = document.createElement('script');
		script.setAttribute('src', '//ci.86box.net/job/86Box/api/json?jsonp=populateLatestBuild&forceDebug=' + new Date().getTime());
		document.head.appendChild(script);
	};
	function populateLatestBuild(data) {
		/* Automatically load debug binaries for the latest build. */
		var buildnumber = document.getElementById('buildnumber');
		if (!buildnumber.value) { /* don't do anything if the user was faster than us */
			buildnumber.value = data['lastSuccessfulBuild']['number'].toString();
			submitDebug();
		}
	}

	function showDebug() {
		/* Hide button and show form. */
		document.getElementById('debugagree').style.display = 'none';
		document.getElementById('debugform').style.display = 'block';
	}
	function submitDebug() {
		/* Show loading message. */
		var debugbins = document.getElementById('debugbins');
		debugbins.innerHTML = '<br />Loading build information...';

		/* Load build information from Jenkins. */
		var script = document.createElement('script');
		script.setAttribute('src', '//ci.86box.net/job/86Box/' + document.getElementById('buildnumber').value.replace('#', '') + '/api/json?jsonp=listDebug&forceDebug=' + new Date().getTime());
		script.onerror = function() {
			/* Show error message. */
			debugbins.innerHTML = '<br />Could not load build information.';
		};
		document.head.appendChild(script);
	}
	function listDebug(data) {
		/* Clear loading message. */
		var debugbins = document.getElementById('debugbins');
		debugbins.innerHTML = '';

		/* Start directory structure. */
		var ul = document.createElement('ul');
		debugbins.appendChild(ul);

		/* Parse directory structure. */
		var pathElements = {'': ul};
		for (var artifactId in data['artifacts']) {
			var artifact = data['artifacts'][artifactId];
			if (artifact['fileName'].match(/-(Debug|Dev(ODR)?|Optimized)-/)) {
				var split = artifact['relativePath'].split('/');
				for (var i = 0; i < split.length; i++) {
					/* Skip paths that were already processed. */
					var path = split.slice(0, i + 1).join('/');
					if (pathElements[path])
						continue;

					/* Create list entry. */
					var listEntry = document.createElement('li');
					var parentElement = pathElements[split.slice(0, i).join('/')];
					if (i == (split.length - 1)) {
						/* Add file link. */
						listEntry.innerHTML = '<a href="//ci.86box.net/job/86Box/' + data['id'] + '/artifact/' + artifact['relativePath'] + '">' + artifact['fileName'] + '</a>';
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
	}
</script>

<button id="debugagree" onclick="showDebug();">I agree, show me the debug binaries</button>
<form id="debugform" style="display: none;" action="#" onsubmit="submitDebug(); return false;">
Build number: <input type="text" inputmode="numeric" pattern="#?\d*" id="buildnumber" size="4" required> <input type="submit" value="Get debug binaries">
<div id="debugbins"></div>
</form>
