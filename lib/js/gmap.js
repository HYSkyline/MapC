function gmapLngLatQuery () {
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

	var resultWGSdiv = document.createElement("li");
	resultWGSdiv.setAttribute("data-clipboard-text", wgs84lng + ',' + wgs84lat);
	resultWGSdiv.innerHTML = '<strong>经纬坐标:</strong><br />' + wgs84lng + ', ' + wgs84lat;
	var resultGCJdiv = document.createElement("li");
	resultGCJdiv.setAttribute("data-clipboard-text", gcj02lng + ',' + gcj02lat);
	resultGCJdiv.innerHTML = '<strong>国测坐标:</strong><br />' + gcj02lng + ', ' + gcj02lat;
	var resultBDdiv = document.createElement("li");
	resultBDdiv.setAttribute("data-clipboard-text", bd09lng + ',' + bd09lat);
	resultBDdiv.innerHTML = '<strong>百度坐标:</strong><br />' + bd09lng + ', ' + bd09lat;

	resultsDiv.appendChild(resultWGSdiv);
	resultsDiv.appendChild(resultGCJdiv);
	resultsDiv.appendChild(resultBDdiv);
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
				resultsDiv.innerHTML += '<span><strong>' + (i + 1).toString() + '. ' + gplace.name + '<br />' + gplace.formatted_address + '<strong></span>';
				coordtrans(gplace.geometry.location.lng(), gplace.geometry.location.lat(), 'gcj02');
				var resultWGSdiv = document.createElement("p");
				resultWGSdiv.setAttribute("data-clipboard-text", wgs84lng + ',' + wgs84lat);
				resultWGSdiv.innerHTML = '<strong>WGS84坐标:</strong><br />' + wgs84lng + ',' + wgs84lat;

				var resultGCJdiv = document.createElement("p");
				resultGCJdiv.setAttribute("data-clipboard-text", gcj02lng + ',' + gcj02lat);
				resultGCJdiv.innerHTML = '<strong>GCJ02坐标:</strong><br />' + gcj02lng + ',' + gcj02lat;

				var resultBDdiv = document.createElement("p");
				resultBDdiv.setAttribute("data-clipboard-text", bd09lng + ',' + bd09lat);
				resultBDdiv.innerHTML = '<strong>BD09坐标:</strong><br />' + bd09lng + ',' + bd09lat;

				resultsDiv.appendChild(resultWGSdiv);
				resultsDiv.appendChild(resultGCJdiv);
				resultsDiv.appendChild(resultBDdiv);
				resultsParentDiv.appendChild(resultsDiv);
			}
		}
	}
}
