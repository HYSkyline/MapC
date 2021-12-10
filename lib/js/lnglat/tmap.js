function tmapAddressQuery(address) {
	// console.log('开始执行tmap的addressQuery函数');
	var tmapLocal = new qq.maps.SearchService({
		complete: function (results) {
			tmap.panTo(results.detail.pois[0].latLng);
			var tplace = results.detail.pois[0];
			var tmapMarker = new qq.maps.Marker({
				position: tplace.latLng
			});
			tmapMarkerArr.push(tmapMarker);
			tmapMarker.setMap(tmap);
			
		}
	});
	tmapLocal.search(address);
}