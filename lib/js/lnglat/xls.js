var sleep = function(time) {
    var startTime = new Date().getTime() + parseInt(time, 10);
    while(new Date().getTime() < startTime) {}
};

function selectFile() {
	document.getElementById('file').click();
}

// 读取本地excel文件
function readWorkbookFromLocalFile(file, callback){
	// console.log("read excel");
	var reader = new FileReader();
	reader.onload = function(e){
		var data = e.target.result;
		workbook = XLSX.read(data, {type: 'binary'});
		if(callback) callback(workbook);
	};
	reader.readAsBinaryString(file);
}

// 加载网站自带的样表
function readWorkbookFromRemoteFile(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('get', url, true);
	xhr.responseType = 'arraybuffer';
	xhr.onload = function(e) {
		if(xhr.status == 200) {
			var data = new Uint8Array(xhr.response)
			var workbook = XLSX.read(data, {type: 'array'});
			if(callback) callback(workbook);
		}
	};
	xhr.send();
}
function loadRemoteFile(url) {
	readWorkbookFromRemoteFile(url, function(workbook) {
		readWorkbook(workbook);
	});
}

// 解析excel文件
function readWorkbook(workbook) {
	// console.log("parse excel");
	var sheetNames = workbook.SheetNames; // 工作表名称集合
	var worksheet = workbook.Sheets[sheetNames[0]]; // 只读取第一张sheet
	var csv = XLSX.utils.sheet_to_csv(worksheet);
	document.getElementById('tableContainer').innerHTML = "";
	document.getElementById('tableContainer').innerHTML = csv2table(csv);
}

// 借助csv生成html表格
function csv2table(csv) {
	var tableHtml = '<table>';
	var rows = csv.split('\n');
	rows.pop(); // 最后一行没用的
	rows.forEach(function(row, idx) {
		var columns = row.split(',');
		if(idx == 0) { // 添加列索引
			tableHtml += '<thead>';
			columns.forEach(function(column) {
				tableHtml += '<th>'+column+'</th>';
			});
			tableHtml += '<th>经度</th><th>纬度</th>'
			tableHtml += '</thead>';
		} else {
			tableHtml += '<tr>';
			columns.forEach(function(column) {
				tableHtml += '<td class="addr" id="addr' + idx + '"">'+column+'</td>';
			});
			tableHtml += '<td class="resLng" id="addrLng' + idx + '"></td><td class="resLat" id="addrLat' + idx + '"></td>';
			tableHtml += '</tr>';
		}
	});
	tableHtml += '</table>';
	return tableHtml;
}

// 首先展示样表
loadRemoteFile('sample.xlsx');

// 选定excel文件后刷新表格视图
document.getElementById('file').addEventListener('change', function(e) {
	var files = e.target.files;
	// console.log(files);
	if(files.length == 0) return;
	var f = files[0];
	if(!/\.xlsx$/g.test(f.name)) {
		alert('仅支持读取xlsx格式');
		return;
	}
	readWorkbookFromLocalFile(f, function(workbook) {
		readWorkbook(workbook);
	});
});
