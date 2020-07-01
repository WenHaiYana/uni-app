'use strict';
/**
 * 根据变化前后的点坐标，计算矩阵
 * @param arg_1     变化前坐标1
 * @param _arg_1    变化后坐标1
 * @param arg_2     变化前坐标2
 * @param _arg_2    变化后坐标2
 * @param arg_3     变化前坐标3
 * @param _arg_3    变化后坐标3
 * @returns {{a: number, b: number, c: number, d: number, e: number, f: number}}
 */
function getMatrix(arg_1, _arg_1, arg_2, _arg_2, arg_3, _arg_3) {
	//传入x值解第一个方程 即  X = ax + cy + e 求ace
	//传入的四个参数，对应三元一次方程：ax+by+cz=d的四个参数：a、b、c、d，跟矩阵方程对比c为1
	var arr1 = [arg_1.x, arg_1.y, 1, _arg_1.x];
	var arr2 = [arg_2.x, arg_2.y, 1, _arg_2.x];
	var arr3 = [arg_3.x, arg_3.y, 1, _arg_3.x];

	var result = equation(arr1, arr2, arr3);

	//传入y值解第二个方程 即  Y = bx + dy + f 求 bdf
	arr1[3] = _arg_1.y;
	arr2[3] = _arg_2.y;
	arr3[3] = _arg_3.y;

	var result2 = equation(arr1, arr2, arr3);

	//获得a、c、e
	var a = result.x;
	var c = result.y;
	var e = result.z;

	//获得b、d、f
	var b = result2.x;
	var d = result2.y;
	var f = result2.z;

	return {
		a: a,
		b: b,
		c: c,
		d: d,
		e: e,
		f: f
	};
}

/**
 * 解三元一次方程，需要传入三组方程参数
 * @param arr1        第一组参数
 * @param arr2        第二组参数
 * @param arr3        第三组参数
 * @returns {{x: number, y: number, z: number}}
 */
function equation(arr1, arr2, arr3) {
	var a1 = +arr1[0];
	var b1 = +arr1[1];
	var c1 = +arr1[2];
	var d1 = +arr1[3];

	var a2 = +arr2[0];
	var b2 = +arr2[1];
	var c2 = +arr2[2];
	var d2 = +arr2[3];

	var a3 = +arr3[0];
	var b3 = +arr3[1];
	var c3 = +arr3[2];
	var d3 = +arr3[3];

	//分离计算单元
	var m1 = c1 - (b1 * c2 / b2);
	var m2 = c2 - (b2 * c3 / b3);
	var m3 = d2 - (b2 * d3 / b3);
	var m4 = a2 - (b2 * a3 / b3);
	var m5 = d1 - (b1 * d2 / b2);
	var m6 = a1 - (b1 * a2 / b2);

	//计算xyz
	var x = ((m1 / m2) * m3 - m5) / ((m1 / m2) * m4 - m6);
	var z = (m3 - m4 * x) / m2;
	var y = (d1 - a1 * x - c1 * z) / b1;

	return {
		x: x,
		y: y,
		z: z
	}
}



/*
		        //是否显示点的checkbox
		        var dotChoose = document.getElementById('dot');
		        //是否显示方格的checkbox
		        var rectChoose = document.getElementById('rect');
		        //是否显示贴图的checkbox
		        var picChoose = document.getElementById('pic');
		        //将图片分割的分数控制
		        var countChoose = document.getElementById('count');

		        //获取url后面跟的参数
		        var a = document.createElement('A');
		        a.href = window.location.href;
		        var ret = {},
		            seg = a.search.replace(/^\?/, '').split('&'),
		            len = seg.length,
		            i = 0,
		            s;
		        for (; i < len; i++) {
		            if (!seg[i]) continue;
		            s = seg[i].split('=');
		            ret[s[0]] = s[1];
		        }

		        //如果url后面有跟参数，则用参数赋值
		        if ('dot' in ret) {
		            if (ret.dot === 'true') dotChoose.setAttribute('checked', '');
		            else dotChoose.removeAttribute('checked');
		        }
		        if ('rect' in ret) {
		            if (ret.rect === 'true') rectChoose.setAttribute('checked', '');
		            else rectChoose.removeAttribute('checked');
		        }
		        if ('pic' in ret) {
		            if (ret.pic === 'true') picChoose.setAttribute('checked', '');
		            else picChoose.removeAttribute('checked');
		        }

		        var hasDot = dotChoose.checked,
		            hasRect = rectChoose.checked,
		            hasPic = picChoose.checked,
		            imgRatio = 1,
		            count = getSelected();

		        dotChoose.onchange = function() {
		            hasDot = this.checked;
		            render();
		        };
		        rectChoose.onchange = function() {
		            hasRect = this.checked;
		            render();
		        };
		        picChoose.onchange = function() {
		            hasPic = this.checked;
		            render();
		        };
		        countChoose.onchange = function() {
		            count = getSelected();
		            //count更改后需要重新计算所有点的初始位置
		            idots = rectsplit(count, dotscopy[0], dotscopy[1], dotscopy[2], dotscopy[3]);
		            render();
		        };

		        function getSelected() {
		            var ops = countChoose.getElementsByTagName('OPTION'),
		                op;
		            for (var i = 0; i < ops.length; i++) {
		                op = ops[i];
		                if (op.selected) return +op.value;
		            }
		        }
		*/


/**
 * 鼠标拖动事件绑定
 * @param e
 */
window.onmousedown = window.ontouchstart = function(e) {
	if (!dots.length) return;

	var area = getArea(e);
	var dot, i;
	//鼠标事件触发区域
	var qy = 40;

	for (i = 0; i < dots.length; i++) {
		dot = dots[i];
		if (area.t >= dot.y - qy && area.t <= dot.y + qy && area.l >= dot.x - qy && area.l <= dot.x + qy) {
			break;
		} else {
			dot = null;
		}
	}

	if (!dot) return;

	window.onmousemove = window.ontouchmove = function(e) {
		var narea = getArea(e);
		var nx = narea.l - area.l;
		var ny = narea.t - area.t;

		dot.x += nx;
		dot.y += ny;

		area = narea;

		render();
	};

	window.onmouseup = window.ontouchend = function() {
		window.onmousemove = null;
		window.onmouseup = null;
	};
};

/**
 * 获取鼠标点击/移过的位置
 * @param e
 * @returns {{t: number, l: number}}
 */
function getArea(e) {
	e = e.touches && e.touches[0] || e || window.event;
	return {
		t: e.clientY - canvas.offsetTop + document.body.scrollTop + document.documentElement.scrollTop,
		l: e.clientX - canvas.offsetLeft + document.body.scrollLeft + document.documentElement.scrollLeft,
	};
}

/**
 * 画布渲染
 */
function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	var ndots = rectsplit(count, dots[0], dots[1], dots[2], dots[3]);

	ndots.forEach(function(d, i) {
		//获取平行四边形的四个点
		var dot1 = ndots[i];
		var dot2 = ndots[i + 1];
		var dot3 = ndots[i + count + 2];
		var dot4 = ndots[i + count + 1];

		//获取初始平行四边形的四个点
		var idot1 = idots[i];
		var idot2 = idots[i + 1];
		var idot3 = idots[i + count + 2];
		var idot4 = idots[i + count + 1];

		if (dot2 && dot3 && i % (count + 1) < count) {
			//绘制三角形的下半部分
			renderImage(idot3, dot3, idot2, dot2, idot4, dot4, idot1);

			//绘制三角形的上半部分
			renderImage(idot1, dot1, idot2, dot2, idot4, dot4, idot1);
		}

		if (hasDot) {
			ctx.fillStyle = 'red';
			ctx.fillRect(d.x - 1, d.y - 1, 2, 2);
		}
	});
}

var DRAW_IMAGE_EXTEND_EX = 1;

function extendVert(x0, y0, x1, y1, x2, y2) {
	var x = 2 * x0 - x1 - x2,
		y = 2 * y0 - y1 - y2;
	var d = Math.sqrt(DRAW_IMAGE_EXTEND_EX / (x * x + y * y));
	return [x0 + x * d, y0 + y * d];
}

/**
 * 计算矩阵，同时渲染图片
 * @param arg_1
 * @param _arg_1
 * @param arg_2
 * @param _arg_2
 * @param arg_3
 * @param _arg_3
 */
function renderImage(arg_1, _arg_1, arg_2, _arg_2, arg_3, _arg_3, vertex) {
	ctx.save();

	var x0 = _arg_1.x;
	var y0 = _arg_1.y;
	var x1 = _arg_2.x;
	var y1 = _arg_2.y;
	var x2 = _arg_3.x;
	var y2 = _arg_3.y;

	var s0 = extendVert(x0, y0, x1, y1, x2, y2);
	var s1 = extendVert(x1, y1, x0, y0, x2, y2);
	var s2 = extendVert(x2, y2, x1, y1, x0, y0);

	ctx.beginPath();
	ctx.moveTo(s0[0], s0[1]);
	ctx.lineTo(s1[0], s1[1]);
	ctx.lineTo(s2[0], s2[1]);
	ctx.closePath();

	ctx.clip();

	if (hasPic) {
		//传入变换前后的点坐标，计算变换矩阵
		var result = matrix.getMatrix.apply(this, arguments);

		//变形
		ctx.transform(result.a, result.b, result.c, result.d, result.e, result.f);

		var w = img.width / count;
		var h = img.height / count;
		//绘制图片
		var res =  ctx.drawImage(
            img,
            (vertex.x - idots[0].x) / imgRatio - 1,
            (vertex.y - idots[0].y) / imgRatio - 1,
            w / imgRatio + 2,
            h / imgRatio + 2,
            vertex.x - 1,
            vertex.y - 1,
            w + 2,
            h + 2
        );
	}

	ctx.restore();
}

/**
 * 将 abcd 四边形分割成 n 的 n 次方份，获取 n 等分后的所有点坐标
 * @param n     多少等分
 * @param a     a 点坐标
 * @param b     b 点坐标
 * @param c     c 点坐标
 * @param d     d 点坐标
 * @returns {Array}
 */
function rectsplit(n, a, b, c, d) {
	// ad 向量方向 n 等分
	var ad_x = (d.x - a.x) / n;
	var ad_y = (d.y - a.y) / n;
	// bc 向量方向 n 等分
	var bc_x = (c.x - b.x) / n;
	var bc_y = (c.y - b.y) / n;

	var ndots = [];
	var x1, y1, x2, y2, ab_x, ab_y;

	//左边点递增，右边点递增，获取每一次递增后的新的向量，继续 n 等分，从而获取所有点坐标
	for (var i = 0; i <= n; i++) {
		//获得 ad 向量 n 等分后的坐标
		x1 = a.x + ad_x * i;
		y1 = a.y + ad_y * i;
		//获得 bc 向量 n 等分后的坐标
		x2 = b.x + bc_x * i;
		y2 = b.y + bc_y * i;

		for (var j = 0; j <= n; j++) {
			// ab 向量为：[x2 - x1 , y2 - y1]，所以 n 等分后的增量为除于 n
			ab_x = (x2 - x1) / n;
			ab_y = (y2 - y1) / n;

			ndots.push({
				x: x1 + ab_x * j,
				y: y1 + ab_y * j,
			});
		}
	}

	return ndots;
}
var canvas = '';
var ctx = '';
var hasDot = true,//带点
	hasRect = true,
	hasPic = true,
	imgRatio = 1,
	count = 4;
var dots = [];
var dotscopy, idots;
var img = new Image();
var maxHeight = 460 / 2;

function init(image_url, cavas_id) {
	canvas = document.getElementById(cavas_id);
	ctx = canvas.getContext('2d');
	img = new Image();
	img.crossOrigin = "anonymous";
	img.src = image_url;
	img.onload = function() {
		var img_w = img.width,
			img_h = img.height;

		if (img_h > maxHeight) {
			imgRatio = maxHeight / img_h;
			img_h = maxHeight;
			img_w *= imgRatio;
		}
		var left = (canvas.width - img_w) / 2;
		var top = (canvas.height - img_h) / 2;

		img.width = img_w;
		img.height = img_h;

		dots = [{
				x: left,
				y: top
			},
			{
				x: left + img_w,
				y: top
			},
			{
				x: left + img_w,
				y: top + img_h
			},
			{
				x: left,
				y: top + img_h
			},
		];

		//保存一份不变的拷贝
		dotscopy = [{
				x: left,
				y: top
			},
			{
				x: left + img_w,
				y: top
			},
			{
				x: left + img_w,
				y: top + img_h
			},
			{
				x: left,
				y: top + img_h
			},
		];

		//获得所有初始点坐标
		idots = rectsplit(count, dotscopy[0], dotscopy[1], dotscopy[2], dotscopy[3]);

		render();
	};
}


var matrix = {
	getMatrix: getMatrix,
	equation: equation,
	init: init
};
