function EnterPress(e) {
    var e = e || window.event;
    // console.log('输入框键入搜索内容后gmap加载状态确认为' + gmapLoaded);
    if(e.keyCode == 13) {
    	var titleImage = document.getElementById('titleImage').style;
    	titleImage.backgroundImage = "url(https://hyskyline.github.io/MapC/lib/img/customerr.JPG)";
    	query(); 
    }
}
function EnterSize(e) {
    var e = e || window.event;
    if(e.keyCode == 13) {
    	var titleImage = document.getElementById('titleImage').style;
    	var titleImage = document.getElementById('titleImage').style;
    	titleImage.backgroundImage = "url(https://hyskyline.github.io/MapC/lib/img/customerl.JPG)";
    	// console.log('按下回车,准备缩放到第' + document.getElementById('mapSize').value + '级.')
    	bmap.setZoom(parseInt(document.getElementById('mapSize').value) + 1);
    	amap.setZoom(parseInt(document.getElementById('mapSize').value));
    	tmap.setZoom(parseInt(document.getElementById('mapSize').value));
    	if (gmapLoaded) {
    		gmap.setZoom(parseInt(document.getElementById('mapSize').value));
    	}
    }
}

function query() {
	var target = document.getElementById('inputBox').value;

	if (target.indexOf("，") > 0) {
		target = target.replace(/，/,",");
	}

	// console.log('执行查询前gmap加载状态确认为' + gmapLoaded);
	if (target.indexOf(",") > 0) {
		// console.log('开始查询经纬度');
		lnglatQuery(target);
	} else {
		addressQuery(target);
	}
}

function lnglatQuery(lnglat) {
	// console.log('接收到经纬度' + lnglat);

	var lng = lnglat.split(',')[0];
	var lat = lnglat.split(',')[1];
	// console.log('输入经度:' + lng + '\t输入纬度:' + lat);
	var coordtype = checkCoordType();
	// console.log('确认经纬度为' + coordtype + '类型');
	coordtrans(lng, lat, coordtype);

	var wgs84result = '<li>经纬坐标:<br />' + wgs84lng + ',' + wgs84lat + '</li>';
	var gcj02result = '<li>国测坐标:<br />' + gcj02lng + ',' + gcj02lat + '</li>';
	var bd09result = '<li>百度坐标:<br />' + bd09lng + ',' + bd09lat + '</li>';
	if (gmapLoaded) {
		gmapLngLatQuery(wgs84result, gcj02result, bd09result);
	}
	amapLngLatQuery(wgs84result, gcj02result, bd09result);
	tmapLngLatQuery(wgs84result, gcj02result, bd09result);
	bmapLngLatQuery(wgs84result, gcj02result, bd09result);
}
function addressQuery(address) {
	var results = document.getElementsByClassName('mapResults');
	for (var i = 0; i < results.length; i++) {
		results[i].innerHTML = '网络连接异常(如果只有谷歌地图失联就凑合用用吧)';
	}

	// console.log('开始查询地址' + address);
	if (gmapLoaded) {
		gmapAddressQuery(address);
	}
	amapAddressQuery(address);
	tmapAddressQuery(address);
	bmapAddressQuery(address);
}