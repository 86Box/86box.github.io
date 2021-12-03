var imgCache = {};

function getNaturalWidth(img) {
	if (img.naturalWidth) {
		return img.naturalWidth;
	} else {
		var img2 = imgCache[img.src];
		if (!img2) {
			img2 = new Image();
			img2.src = img.src;
			imgCache[img.src] = img2;
		}
		return img2.width;
	}
}
