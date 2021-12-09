var tmapMarkerArr =[];
var tmap = new qq.maps.Map(document.getElementById("map"), {
	center: new qq.maps.LatLng(31.2225103946311, 121.49225417730016),
	zoom: 13,
	panControl: false,
	zoomControl: false
});

qq.maps.event.addListener(tmap, 'click', function(tmapClickEvent) {
	clickPan(tmapClickEvent.latLng.lng, tmapClickEvent.latLng.lat, 'gcj02');
});

tmapMarkerArr.push(
	new qq.maps.Marker({position: new qq.maps.LatLng(31.228816, 121.475164)}),
	new qq.maps.Marker({position: new qq.maps.LatLng(31.2352515, 121.5057491)}),
	new qq.maps.Marker({position: new qq.maps.LatLng(31.2306709, 121.4817465)}),
);
for (var i = tmapMarkerArr.length - 1; i >= 0; i--) {
	tmapMarkerArr[i].setMap(tmap);
}
