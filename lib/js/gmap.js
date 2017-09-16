function gmapLngLatQuery (wgs84result, gcj02result, bd09result) {
	var gpoint = new google.maps.LatLng(gcj02lat, gcj02lng);
	gmap.panTo(gpoint);

	if (gmapMarkerArr) {
		for (i in gmapMarkerArr) {
			gmapMarkerArr[i].setMap(null);
		}
		gmapMarkerArr.length = 0;
	}
	var gmapMarker = new google.maps.Marker({position: gpoint});
	gmapMarkerArr.push(gmapMarker);
	gmapMarker.setMap(gmap);

	var results = document.getElementById('gmapResults');
	results.innerHTML = '';
	var resultsDiv = document.createElement("ul");
	resultsDiv.innerHTML = wgs84result + gcj02result + bd09result;
	results.appendChild(resultsDiv);
}

function gmapAddressQuery(address) {
	// console.log('执行gmap的addressQuery函数');
	var gmapLocal = new google.maps.places.PlacesService(gmap);
	var gmapLocalReq = {
		query: address
	}
	gmapLocal.textSearch(gmapLocalReq, callback);
	function callback(results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			var gmapResultsList = document.getElementById('gmapResults');
			gmapResultsList.innerHTML = '';
			if (gmapMarkerArr) {
				for (i in gmapMarkerArr) {
					gmapMarkerArr[i].setMap(null);
				}
				gmapMarkerArr.length = 0;
			}
			gmap.panTo(results[0].geometry.location);
			var maxLength = 10;
			if (results.length < maxLength) {
				maxLength = results.length;
			}

			var resultsParentDiv = document.createElement("div");
			resultsParentDiv.setAttribute("class", "list-group");
			gmapResultsList.appendChild(resultsParentDiv);

			for (var i = 0; i < maxLength; i++) {
				var gplace = results[i];
				var gmapMarker = new google.maps.Marker({
					title: gplace.name,
					position: gplace.geometry.location
				});
				gmapMarkerArr.push(gmapMarker);
				gmapMarker.setMap(gmap);

				var resultsDiv = document.createElement("a");
				(function (location) {
					resultsDiv.addEventListener('click', function () {
						gmap.panTo(location);
					}, false);
				})(gplace.geometry.location);
				resultsDiv.setAttribute("class", "list-group-item"); 
				resultsDiv.innerHTML += '<p><strong>' + (i + 1).toString() + '. ' + gplace.name + '<br />' + gplace.formatted_address + '<strong></p>';
				coordtrans(gplace.geometry.location.lng(), gplace.geometry.location.lat(), 'gcj02');
				resultsDiv.innerHTML += '<p><strong>WGS84坐标:</strong><br />' + wgs84lng + ',' + wgs84lat + '</p>';
				resultsDiv.innerHTML += '<p><strong>GCJ02坐标:</strong><br />' + gcj02lng + ',' + gcj02lat + '</p>';
				resultsDiv.innerHTML += '<p><strong>BD09坐标:</strong><br />' + bd09lng + ',' + bd09lat + '</p>';
				resultsParentDiv.appendChild(resultsDiv);
			}
		}
	}
}
