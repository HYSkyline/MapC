// 定义延迟函数
var sleep = function(time) {
    var startTime = new Date().getTime() + parseInt(time, 10);
    while(new Date().getTime() < startTime) {}
};
// sleep(1000);

function startQuery() {
	var addrListElements = document.getElementsByClassName('addr');
	for (var i = 1; i <= addrListElements.length; i++) {
		var addrText = document.getElementById('addr' + i).innerHTML;
		// var alnglat = [120+i*0.01, 30+i*0.01];
		console.log('第' + i + '行:' + addrText + ' 开始查询');
		var alnglat = amapAddressQuery(addrText, i);
		sleep(200);
	}
}

function amapAddressQuery(address, idx) {
	// console.log('执行amap的addressQuery函数.');
	AMap.service(["AMap.PlaceSearch"], function() {
		var amapLocal = new AMap.PlaceSearch({
			pageSize:1,
			pageIndex:1
		});
		amapLocal.search(address, function(status, result) {
			if (status == 'complete') {
				console.log('改写第' + idx + '行经纬度');
				var resLng = result.poiList.pois[0].location.getLng();
				var resLat = result.poiList.pois[0].location.getLat();
				document.getElementById("addrLng" + idx).innerHTML = resLng;
				document.getElementById("addrLat" + idx).innerHTML = resLat;

				var tpoint = new qq.maps.LatLng(resLat, resLng)
				tmap.panTo(tpoint);
				var marker = new qq.maps.Marker({
					position: tpoint,
					map: tmap
				})
			}
		});
	});
}
