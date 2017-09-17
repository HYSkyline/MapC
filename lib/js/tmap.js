function tmapLngLatQuery() {
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
				resultsDiv.innerHTML += '<span><strong>' + (i + 1).toString() + '. ' + tplace.name + '<br />' + tplace.address + '</strong></span>';
				coordtrans(tplace.latLng.getLng(), tplace.latLng.getLat(), 'gcj02');
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
	tmapLocal.search(address);
}