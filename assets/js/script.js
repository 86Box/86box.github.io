/* This script is executed by all browsers, so keep it retro-friendly. */

/* Polyfills. */
function addEvent(elem, evtName, func) {
	if (elem.addEventListener)
		return elem.addEventListener(evtName, func);
	evtName = 'on' + evtName;
	if (elem.attachEvent)
		return elem.attachEvent(evtName, func);
	var prevFunc = elem[evtName];
	if (prevFunc) {
		elem[evtName] = function(evt) {
			if (prevFunc(evt) == false)
				return false;
			return func(evt);
		};
	} else {
		elem[evtName] = func;
	}
}
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(elem, start) {
		for (var i = start || 0; i < this.length; i++) {
			if (this[i] == elem)
				return i;
		}
		return -1;
	};
}
if (!Array.prototype.push) {
	Array.prototype.push = function(elem) {
		this[this.length] = elem;
	};
}
if (!Array.prototype.unshift) {
	Array.prototype.unshift = function(elem) {
		for (var i = this.length; i; i--)
			this[i] = this[i - 1];
		this[0] = elem;
	};
}
var imgCache = {};
function getNaturalWidth(img) { /* for the auto-sizing expression on the retro CSS */
	if (img.naturalWidth)
		return img.naturalWidth;

	/* Cache images by src to avoid wasting memory. */
	var imgObj = imgCache[img.src];
	if (!imgObj) {
		imgObj = new Image();
		imgObj.src = img.src;
		imgCache[img.src] = imgObj;
	}
	return imgObj.width;
}

/* Allow HTML5 elements to be styled on IE6. */
if (navigator.userAgent.indexOf('MSIE') > -1) {
	document.createElement('nav');
	document.createElement('hero');
	document.createElement('main');
	document.createElement('footer');
}

/* Merge horizontally-neighboring table cells with identical contents. */
addEvent(window, 'load', function() {
	var tr = document.getElementsByTagName('tr');
	for (var i = 0; i < tr.length; i++) {
		var tdStart = tr[i].firstChild;
		while (tdStart && (tdStart.nodeType != 1))
			tdStart = tdStart.nextSibling;
		if (!tdStart)
			continue;
		var td = tdStart.nextSibling;
		while (td) {
			var tdNext = td.nextSibling;
			if (td.nodeType != 1) {
				/* Ignore non-elements. */
			} else if (td.innerHTML == tdStart.innerHTML) {
				td.parentNode.removeChild(td);
				tdStart.colSpan = (tdStart.colSpan || 1) + 1;
			} else {
				tdStart = td;
			}
			td = tdNext;
		}
	}
});
