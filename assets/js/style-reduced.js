/* Helper script for the retro-reduced stylesheet. */

/* Get an image's real width. Used by the auto-sizing CSS expression. */
var imgCache = {};
function getNaturalWidth(img) {
	if (img.naturalWidth) {
		return img.naturalWidth;
	} else {
		/* Cache images through src to avoid memory waste. */
		var img2 = imgCache[img.src];
		if (!img2) {
			img2 = new Image();
			img2.src = img.src;
			imgCache[img.src] = img2;
		}
		return img2.width;
	}
}

/* Allow HTML5 elements to be styled. */
document.createElement('nav');
document.createElement('hero');
document.createElement('main');
document.createElement('footer');

window.onload = function() {
	/* Make the logo transparent on IE6. Doing this on more
	   images interferes with the auto-sizing CSS expression. */
	if (document.all && /MSIE (5\.5|6)/.test(navigator.userAgent)) {
		for (var i = 0; i < Math.min(2, document.images.length); i++) {
			var img = document.images[i];
			img.style.paddingRight = 0; /* padding counts as space for AlphaImageLoader so swap it for margin */
			var oldsrc = img.src;
			var oldw = img.clientWidth;
			var oldh = img.clientHeight;
			img.src = '/assets/images/blank.gif';
			img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + oldsrc + "', sizingMethod='scale')";
			img.style.width = oldw + 'px';
			img.style.height = oldh + 'px';
			img.style.marginRight = '20pt';
		}
	}
};
