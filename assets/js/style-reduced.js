/* Helper script for the retro-reduced stylesheet. */

/* Get an image's real width. Used by the auto-sizing CSS expression. */
var imgCache = {};
function getNaturalWidth(img) {
	if (img.naturalWidth) {
		return img.naturalWidth;
	} else {
		/* Cache images by src to avoid wasting memory. */
		var imgObj = imgCache[img.src];
		if (!imgObj) {
			imgObj = new Image();
			imgObj.src = img.src;
			imgCache[img.src] = imgObj;
		}
		return imgObj.width;
	}
}

/* Allow HTML5 elements to be styled. */
document.createElement('nav');
document.createElement('hero');
document.createElement('main');
document.createElement('footer');

/* Make the logo transparent on IE6. Doing this on more
   images interferes with the auto-sizing CSS expression. */
function fixPngs() {
	/* Check if the icon and logo are loaded, and try
	   again after a while if they're not present yet. */
	if (!document.images || (document.images.length < 2))
		setTimeout(fixPngs, 500);

	/* Fix icon and logo. */
	for (var i = 0; i < Math.min(2, document.images.length); i++) {
		var img = document.images[i];
		var oldpad = img.style.paddingRight; /* padding counts as space for AlphaImageLoader so swap it for margin */
		img.style.paddingRight = 0;
		var oldsrc = img.src;
		var oldw = img.clientWidth;
		var oldh = img.clientHeight;
		img.src = '/assets/images/blank.gif';
		img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + oldsrc + "', sizingMethod='scale')";
		img.style.width = oldw + 'px';
		img.style.height = oldh + 'px';
		img.style.marginRight = oldpad;
	}
}
if (document.all && /MSIE (5\.5|6)/.test(navigator.userAgent))
	fixPngs();
