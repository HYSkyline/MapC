// 定义延迟函数
var sleep = function(time) {
    var startTime = new Date().getTime() + parseInt(time, 10);
    while(new Date().getTime() < startTime) {}
};
// sleep(1000);

function startQuery() {
	var addrListElements = document.getElementsByClassName('addr');
	for (var i = 1; i <= addrListElements.length; i++) {
		document.getElementById('progressCheck').innerHTML = 0;
		var addrText = document.getElementById('addr' + i).innerHTML;
		// console.log('第' + i + '行:' + addrText + ' 开始查询');
		amapAddressQuery(addrText, i, addrListElements.length);
	}
}

function amapAddressQuery(address, idx, amount) {
	// console.log('执行amap的addressQuery函数.');
	AMap.service(["AMap.PlaceSearch"], function() {
		var amapLocal = new AMap.PlaceSearch({
			pageSize:1,
			pageIndex:1
		});
		amapLocal.search(address, function(status, result) {
			sleep(500);
			if (status == 'complete') {
				// console.log('改写第' + idx + '行经纬度');
				var resLng = result.poiList.pois[0].location.getLng();
				var resLat = result.poiList.pois[0].location.getLat();
				var wgs84lnglat = coordtrans(resLng, resLat, 'gcj02');
				document.getElementById("addrLng" + idx).innerHTML = wgs84lnglat[0];
				document.getElementById("addrLat" + idx).innerHTML = wgs84lnglat[1];

				var tpoint = new qq.maps.LatLng(resLat, resLng)
				tmap.panTo(tpoint);
				var marker = new qq.maps.Marker({
					position: tpoint
				});
				marker.setMap(tmap);
				
				var progressContainer = document.getElementById('progressCheck');
				var progressIndex = parseInt(progressContainer.innerHTML) + 1;
				progressContainer.innerHTML = progressIndex;
				document.getElementById('startButton').value = progressIndex + '/' + amount;
				document.getElementsByClassName('g-progress')[0].innerHTML = parseInt(progressIndex * 100 / amount) + '%';
				document.getElementsByClassName('g-progress')[0].style.setProperty('width', parseInt(progressIndex * 100 / amount) + '%');
				// console.log('第' + idx + '行:' + address + ' 查询完成');
			}
		});
	});
}
