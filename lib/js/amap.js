function amapLngLatQuery() {
	var apoint = new AMap.LngLat(gcj02lng, gcj02lat);
	amap.panTo(apoint);
	var amapMarker = new AMap.Marker({position: apoint});
	amap.clearMap();
	amapMarker.setMap(amap);

	var results = document.getElementById('amapResults');
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
					resultsDiv.innerHTML += '<span><strong>' + (i + 1).toString() + '. ' + aplace.name + '<br />' + aplace.address + '</strong></span>';
					coordtrans(aplace.location.getLng(), aplace.location.getLat(), 'gcj02');

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
		});
	});
}