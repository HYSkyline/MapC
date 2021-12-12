var tmapMarkerArr =[];
var tmap = new qq.maps.Map(document.getElementById("map"), {
	center: new qq.maps.LatLng(31.2225103946311, 121.49225417730016),
	zoom: 13,
	panControl: false,
	zoomControl: false
});

qq.maps.event.addListener(tmap, 'click', function(tmapClickEvent) {
	var tpoint = new qq.maps.LatLng(tmapClickEvent.latLng.lat, tmapClickEvent.latLng.lng);
	// tmap.panTo(tpoint);
	var marker = new qq.maps.Marker({
	    position: tpoint,
	    map: tmap
	});
	marker.setMap(null);
	// marker.setMap(tmap);
});
