'use strict';
/**
 * 根据window.devicePixelRatio获取像素比
 */
function DPR() {
	if (window.devicePixelRatio && window.devicePixelRatio > 1) {
		return window.devicePixelRatio;
	}
	return 1;
}
/**
 *  将传入值转为整数
 */
function parseValue(value) {
	return parseInt(value, 10);
};
/**
 * 绘制canvas
 */
function drawCanvas(selector, callback) {
	// 获取想要转换的 DOM 节点
	var dom = document.querySelector(selector);
	var box = window.getComputedStyle(dom);
	// DOM 节点计算后宽高
	var width = parseValue(box.width);
	var height = parseValue(box.height);
	// 获取像素比
	var scaleBy = DPR();
	// 创建自定义 canvas 元素
	var canvas = document.createElement('canvas');

	// 设定 canvas 元素属性宽高为 DOM 节点宽高 * 像素比
	canvas.width = width * scaleBy;
	canvas.height = height * scaleBy;
	// 设定 canvas css宽高为 DOM 节点宽高
	canvas.style.width = "${width}px";
	canvas.style.height = "${height}px";

	// 获取画笔
	var context = canvas.getContext('2d');
	// 将所有绘制内容放大像素比倍
	context.scale(scaleBy, scaleBy);

	var x = width;
	var y = height;
	var opts = {
		// scale: 4, // 添加的scale 参数
		canvas: canvas, //自定义 canvas
		logging: false, //日志开关，便于查看html2canvas的内部执行流程
		// width: width, //dom 原始宽度
		// height: height,
		// useCORS: true // 【重要】开启跨域配置

		onrendered: function(canvas) {
			console.log(1);
		}

	};
	html2canvas(dom, opts).then(function(canvas) {
		// convertCanvasToImage(canvas, x, y)
		var image = {
			src: canvas.toDataURL("image/png"),
			width: x,
			height: y
		};
		if (callback) {
			callback(image)
		}
	})
}

/**
 * 图片转base64格式
 */
function convertCanvasToImage(canvas, x, y) {
	var image = new Image();
	var _container = document.getElementsByClassName('container')[0];
	var _body = document.getElementsByTagName('body')[0];
	image.width = x;
	image.height = y;
	image.src = canvas.toDataURL("image/png", 1.0);
	// _body.removeChild(_container);
	document.body.appendChild(image);
	return image;
}

var htmlToCanvas = {
	init: drawCanvas
};
