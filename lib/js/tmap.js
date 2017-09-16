function tmapLngLatQuery(wgs84result, gcj02result, bd09result) {
	var tpoint = new qq.maps.LatLng(gcj02lat, gcj02lng);
	tmap.panTo(tpoint);
	if (tmapMarkerArr) {
		for (i in tmapMarkerArr) {
			tmapMarkerArr[i].setMap(null);
		}
		tmapMarkerArr.length = 0;
	}
	var tmapMarker = new qq.maps.Marker({position: tpoint});
	tmapMarkerArr.push(tmapMarker);
	tmapMarker.setMap(tmap);

	var results = document.getElementById('tmapResults');
	results.innerHTML = '';
	var resultsDiv = document.createElement("ul");
	resultsDiv.innerHTML = wgs84result + gcj02result + bd09result;
	results.appendChild(resultsDiv);
}
function tmapAddressQuery(address) {
	// console.log('开始执行tmap的addressQuery函数');
	var tmapLocal = new qq.maps.SearchService({
		complete: function (results) {
			var tmapResultsList = document.getElementById('tmapResults');
			tmapResultsList.innerHTML = '';
			if (tmapMarkerArr) {
				for (i in tmapMarkerArr) {
					tmapMarkerArr[i].setMap(null);
				}
				tmapMarkerArr.length = 0;
			}
			tmap.panTo(results.detail.pois[0].latLng);
			var tpois = results.detail.pois;
			var maxLength = 10;
			if (tpois.length < maxLength) {
				maxLength = tpois.length;
			}

			var resultsParentDiv = document.createElement("div");
			resultsParentDiv.setAttribute("class", "list-group");
			tmapResultsList.appendChild(resultsParentDiv);

			for (var i = 0; i < maxLength; i++) {
				var tplace = tpois[i];
				var tmapMarker = new qq.maps.Marker({
					position: tplace.latLng
				});
				tmapMarkerArr.push(tmapMarker);
				tmapMarker.setTitle(i + 1);
				tmapMarker.setMap(tmap);

				var resultsDiv = document.createElement("a");
				(function (location) {
					resultsDiv.addEventListener('click', function () {
						tmap.panTo(location);
					}, false);
				})(tplace.latLng);
				resultsDiv.setAttribute("class", "list-group-item");
				resultsDiv.innerHTML += '<p><strong>' + (i + 1).toString() + '. ' + tplace.name + '<br />' + tplace.address + '</strong></p>';
				coordtrans(tplace.latLng.getLng(), tplace.latLng.getLat(), 'gcj02');
				resultsDiv.innerHTML += '<p><strong>WGS84坐标:</strong><br />' + wgs84lng + ',' + wgs84lat + '</p>';
				resultsDiv.innerHTML += '<p><strong>GCJ02坐标:</strong><br />' + gcj02lng + ',' + gcj02lat + '</p>';
				resultsDiv.innerHTML += '<p><strong>BD09坐标:</strong><br />' + bd09lng + ',' + bd09lat + '</p>';
				resultsParentDiv.appendChild(resultsDiv);
			}
		}
	});
	tmapLocal.search(address);
}