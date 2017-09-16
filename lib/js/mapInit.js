/*
——Are you happy being ALIVE?
——苟活于世溷浊暧暧,君其丧耶君其喜耶?
——罪の最後は涙じゃないよ,ずっと苦しく背負ってくんだ
——Тот путь пройдём, что предназначен нам судьбой, Я лишь молю с тобой.
*/
var mapSize = parseInt(document.getElementById('mapSize').value);
var bmap = new BMap.Map("bmapContainer");
bmap.centerAndZoom(new BMap.Point(120,30), mapSize);
bmap.enableScrollWheelZoom();
var bMapTypeControl = new BMap.MapTypeControl({anchor: BMAP_ANCHOR_TOP_RIGHT});
bmap.addControl(bMapTypeControl);

var amap = new AMap.Map('amapContainer', {
    resizeEnable: true,
    zoom:mapSize,
    center: [120, 30]
});
amap.plugin(["AMap.MapType"], function() {
	var aMapType= new AMap.MapType({
		defaultType: 0
	});
	amap.addControl(aMapType);
});

var tmapMarkerArr =[];
var tmap = new qq.maps.Map(document.getElementById("tmapContainer"), {
	center: new qq.maps.LatLng(30, 120),
	zoom: mapSize,
	panControl: false,
	zoomControl: false
});

var gmapMarkerArr = [];
function initMap() {
	gmap = new google.maps.Map(document.getElementById('gmapContainer'), {
		zoom: mapSize,
		center: {lat: 30, lng: 120}
	});
}
gmapLoaded = false;
function loadScript() {
	var gmapScript = document.createElement("script");
	gmapScript.type = "text/javascript";
	gmapScript.src = "http://maps.google.cn/maps/api/js?key=AIzaSyC_9PBWoCkG5I9_ARuCSbXZFLM3yGf1Wko&libraries=places&callback=initMap";
	// gmapScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyC_9PBWoCkG5I9_ARuCSbXZFLM3yGf1Wko&libraries=places&callback=initMap";
	document.body.appendChild(gmapScript);
	gmapScript.onload = function() {
		// console.log('谷歌地图加载完成');
		gmapLoaded = true;
	}
}
window.onload = loadScript;
// console.log('地图初始化后gmap加载状态确认为' + gmapLoaded);