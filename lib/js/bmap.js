function bmapLngLatQuery() {
	var bpoint = new BMap.Point(bd09lng, bd09lat);
	bmap.panTo(bpoint, mapSize);
	var bmapMarker = new BMap.Marker(bpoint);
	bmap.clearOverlays();
	bmap.addOverlay(bmapMarker);

	var results = document.getElementById('bmapResults');
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
function bmapAddressQuery(address) {
	var bmapSearchOptions = {
		onSearchComplete: function(results){
			if (bmapLocal.getStatus() == BMAP_STATUS_SUCCESS){
				bmap.clearOverlays();
				var bmapResultsList = document.getElementById('bmapResults');
				bmapResultsList.innerHTML = '';
				bmap.panTo(results.getPoi(0).point);
				var maxLength = 10;
				if (results.getCurrentNumPois() < maxLength) {
					maxLength = results.length;
				}

				var resultsParentDiv = document.createElement("div");
				resultsParentDiv.setAttribute("class", "list-group");
				bmapResultsList.appendChild(resultsParentDiv);

				for (var i = 0; i < maxLength; i++){
					var bplace = results.getPoi(i);
					var bmapMarker = new BMap.Marker(bplace.point);
					bmap.addOverlay(bmapMarker);

					var resultsDiv = document.createElement("a");
					(function (location) {
						resultsDiv.addEventListener('click', function () {
							// bmap.panTo(new BMap.Point(location.lng, location.lat));
							bmap.panTo(location);
						}, false);
					})(bplace.point);
					resultsDiv.setAttribute("class", "list-group-item"); 
					resultsDiv.innerHTML += '<span><strong>' + (i + 1).toString() + '. ' + bplace.title + '<br />' + bplace.address + '</strong></span>';
					coordtrans(bplace.point.lng, bplace.point.lat, 'bd09');
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
	};
	var bmapLocal = new BMap.LocalSearch(bmap, bmapSearchOptions);
	bmapLocal.search(address);
}