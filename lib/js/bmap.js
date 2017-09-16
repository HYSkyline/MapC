function bmapLngLatQuery(wgs84result, gcj02result, bd09result) {
	var bpoint = new BMap.Point(bd09lng, bd09lat);
	bmap.panTo(bpoint, mapSize);
	var bmapMarker = new BMap.Marker(bpoint);
	bmap.clearOverlays();
	bmap.addOverlay(bmapMarker);

	var results = document.getElementById('bmapResults');
	results.innerHTML = '';
	var resultsDiv = document.createElement("ul");
	resultsDiv.innerHTML = wgs84result + gcj02result + bd09result;
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
					resultsDiv.innerHTML += '<p><strong>' + (i + 1).toString() + '. ' + bplace.title + '<br />' + bplace.address + '</strong></p>';
					coordtrans(bplace.point.lng, bplace.point.lat, 'bd09');
					resultsDiv.innerHTML += '<p><strong>WGS84坐标:</strong><br />' + wgs84lng + ',' + wgs84lat + '</p>';
					resultsDiv.innerHTML += '<p><strong>GCJ02坐标:</strong><br />' + gcj02lng + ',' + gcj02lat + '</p>';
					resultsDiv.innerHTML += '<p><strong>BD09坐标:</strong><br />' + bd09lng + ',' + bd09lat + '</p>';
					resultsParentDiv.appendChild(resultsDiv);
				}
			}
		}
	};
	var bmapLocal = new BMap.LocalSearch(bmap, bmapSearchOptions);
	bmapLocal.search(address);
}