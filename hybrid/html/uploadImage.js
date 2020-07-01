function changeImg(obj) {

	if (!obj.id) return;

	if (!obj.limitType) return;

	var dom = document.querySelector("#" + obj.imgBox);

	var objDome = $("#" + obj.imgBox);

	var files = document.querySelector("#" + obj.id).files[0];

	var reader = new FileReader();

	var type = files.type && files.type.split('/')[1]; //文件的类型，判断是否是图片

	var size = files.size; //文件的大小，判断图片的大小

	if (obj.limitType.indexOf(type) == -1) {

		alert('不符合上传要求');

		return;

	}

	//判断是否传入限制大小。压不压缩。

	var limitSize = obj.limitSize ? parseInt(obj.limitSize) : 0;

	if (size < limitSize) {

		reader.readAsDataURL(files); // 不压缩，直接转base64

		reader.onloadend = function() {

			// dom.style.backgroundImage = "url(" + this.result + ")";
			dom.src = this.result

			//如果要上传的话，在这里调用ajax

			objDome.parents('.img-box').find(".default-box").hide();

			if (obj.callback) {
				obj.callback(this.result);
			}
		}

	} else { //压缩

		var imageUrl = this.getObjectURL(files); //创造url

		this.convertImg(imageUrl, function(base64Img) { //调用压缩函数

			// dom.style.backgroundImage = "url(" + base64Img + ")";
			dom.src = base64Img;
			//如果要上传的话，在这里调用ajax

			objDome.parents('.img-box').find(".default-box").hide();

			if (obj.callback) {
				obj.callback(base64Img);
			}
		}, type)

	}

}

function convertImg(url, callback, outputFormat) {

	var canvas = document.createElement('CANVAS'); //绘制canvas

	var ctx = canvas.getContext('2d');

	var img = new Image; //初始化图片

	img.crossOrigin = 'Anonymous';

	img.onload = function() {

		var width = img.width;

		var height = img.height;

		// 按比例压缩2倍       //设置压缩比例，最后的值越大压缩越高

		var rate = (width < height ? width / height : height / width) / 2;

		canvas.width = width * rate;

		canvas.height = height * rate; //绘制新图

		ctx.drawImage(img, 0, 0, width, height, 0, 0, width * rate, height * rate); //转base64

		var dataURL = canvas.toDataURL(outputFormat || 'image/png');

		callback.call(this, dataURL); //回调函数传入base64的值

		canvas = null;

	};

	img.src = url;

}

function getObjectURL(file) { //创造指向该图的URL

	var url = null;

	if (window.createObjectURL != undefined) { //大部分执行这个

		url = window.createObjectURL(file);

	} else if (window.URL != undefined) { // 兼容

		url = window.URL.createObjectURL(file);

	} else if (window.webkitURL != undefined) { // 兼容

		url = window.webkitURL.createObjectURL(file);

	}

	return url;

}

function init(fileId, imgBox, callback) {
	document.querySelector("#" + fileId).addEventListener("change", function() {
		changeImg({
			id: fileId, //input的Id   必须
			imgBox: imgBox, //显示位置Id   必须
			limitType: ['jpg', 'png', 'jpeg'], //支持的类型   必须
			limitSize: 819200, //图片超过多大开始进行压缩    可不传
			callback: callback
		});

	});
}
var imageUpload = {
	init: init
}
