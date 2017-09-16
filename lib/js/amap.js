function amapLngLatQuery(wgs84result, gcj02result, bd09result) {
	var apoint = new AMap.LngLat(gcj02lng, gcj02lat);
	amap.panTo(apoint);
	var amapMarker = new AMap.Marker({position: apoint});
	amap.clearMap();
	amapMarker.setMap(amap);

	var results = document.getElementById('amapResults');
	results.innerHTML = '';
	var resultsDiv = document.createElement("ul");
	resultsDiv.innerHTML = wgs84result + gcj02result + bd09result;
	results.appendChild(resultsDiv);
}
function amapAddressQuery(address) {
	// console.log('执行amap的addressQuery函数.');
	AMap.service(["AMap.PlaceSearch"], function() {
		var amapLocal = new AMap.PlaceSearch({
			pageSize: 10,
			pageIndex: 1,
		});
		amapLocal.search(address, function(status, result) {
			if (status == 'complete') {
				var amapResultsList = document.getElementById('amapResults');
				amapResultsList.innerHTML = '';
				amap.panTo(result.poiList.pois[0].location);
				amap.clearMap();
				var maxLength = 10;
				if (result.poiList.pois.length < maxLength) {
					maxLength = result.poiList.pois.length;
				}

				var resultsParentDiv = document.createElement("div");
				resultsParentDiv.setAttribute("class", "list-group");
				amapResultsList.appendChild(resultsParentDiv);

				for (var i = 0; i < maxLength; i++) {
					var aplace = result.poiList.pois[i];
					var amapMarker = new AMap.Marker({position: aplace.location});
					amapMarker.setMap(amap);

					var resultsDiv = document.createElement("a");
					(function (location) {
						resultsDiv.addEventListener('click', function () {
							amap.panTo(location);
						}, false);
					})(aplace.location);
					resultsDiv.setAttribute("class", "list-group-item"); 
					resultsDiv.innerHTML += '<p><strong>' + (i + 1).toString() + '. ' + aplace.name + '<br />' + aplace.address + '</strong></p>';
					coordtrans(aplace.location.getLng(), aplace.location.getLat(), 'gcj02');
					resultsDiv.innerHTML += '<p><strong>WGS84坐标:</strong><br />' + wgs84lng + ',' + wgs84lat + '</p>';
					resultsDiv.innerHTML += '<p><strong>GCJ02坐标:</strong><br />' + gcj02lng + ',' + gcj02lat + '</p>';
					resultsDiv.innerHTML += '<p><strong>BD09坐标:</strong><br />' + bd09lng + ',' + bd09lat + '</p>';
					resultsParentDiv.appendChild(resultsDiv);
				}
			}
		});
	});
}