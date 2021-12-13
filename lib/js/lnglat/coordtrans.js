function coordtrans(lng, lat, coordtype) {
	if (coordtype === 'wgs84') {
		wgs84lng = lng;
		wgs84lat = lat;
		var wgs84togcj02 = coordtransform.wgs84togcj02(lng, lat);
		return wgs84togcj02;
	} else if (coordtype === 'gcj02') {
		gcj02lng = lng;
		gcj02lat = lat;
		var gcj02towgs84 = coordtransform.gcj02towgs84(lng, lat);
		return gcj02towgs84;
	}
}