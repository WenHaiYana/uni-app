
	let that=""
	let ctx= uni.createCanvasContext('cas')
	function photo() {
		uni.chooseImage({
			count: 1, //默认9
			success: (res) => {

				const tempFilePaths = res.tempFilePaths;
				that.driver_license_positive = tempFilePaths[0]
				that.show = true
			}
		})

	}
	function beigin(thatt) {
		that=thatt
		// that.canvas = document.getElementById('cas');
		that.dots = [];
		var dotscopy, idots;
		// var img = new Image();
		var maxHeight = 200;
		var chooseimg = uni.createSelectorQuery().select(".chooseimg");
		chooseimg.boundingClientRect(data => {
			that.imgheight = data.height
			that.imgwidth = data.width
		}).exec(() => {
			var img = '../../static/navs.png';
			// img.onload = () => {
			var img_w = that.imgwidth,
				img_h = that.imgheight;

			if (img_h > maxHeight) {
				that.imgRatio = maxHeight / img_h;
				img_h = maxHeight;
				img_w *= that.imgRatio;
			}

			var left = (353 - img_w) / 2;
			var top = (623 - img_h) / 2;
			that.imgwidth = img_w;
			that.imgheight = img_h;
			that.dots = [{
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
			that.img = img
			//获得所有初始点坐标
			//count更改后需要重新计算所有点的初始位置
			that.idots = rectsplit(that.count, dotscopy[0], dotscopy[1], dotscopy[2], dotscopy[3]);

			render(that);
		});

		// };

	};
	/**
	 * 画布渲染
	 */
	function render(that) {
		
		// ctx.clearRect(0, 0, canvas.width, canvas.height);
		var idots = that.idots
		var dots = that.dots
		var count = that.count
		ctx.clearRect(0, 0, 1000, 500);
		var ndots = rectsplit(that.count, dots[0], dots[1], dots[2], dots[3]);
		
		ndots.forEach((d, i) => {

			//获取平行四边形的四个点
			var dot1 = ndots[i];
			var dot2 = ndots[i + 1];
			var dot3 = ndots[i + count + 2];
			var dot4 = ndots[i + count + 1];
			console.log(dot1)
			//获取初始平行四边形的四个点
			var idot1 = idots[i];
			var idot2 = idots[i + 1];
			var idot3 = idots[i + count + 2];
			var idot4 = idots[i + count + 1];
			if (dot2 && dot3 && i % (count + 1) < count) {
				//绘制三角形的下半部分
				renderImage(idot3, dot3, idot2, dot2, idot4, dot4, idot1,that);
				//绘制三角形的上半部分
				renderImage(idot1, dot1, idot2, dot2, idot4, dot4, idot1,that);
			}
			

			// if (count) {
			// 
			// 	ctx.fillStyle = 'red';
			// 	ctx.fillRect(d.x - 1, d.y - 1, 2, 2);
			// }
		});
		console.log(1)
		// setTimeout((){that.show=true},500)
		// that.show=true
		
	};
	/**
	 * 计算矩阵，同时渲染图片
	 * @param arg_1
	 * @param _arg_1
	 * @param arg_2
	 * @param _arg_2
	 * @param arg_3
	 * @param _arg_3
	 */
	function renderImage(arg_1, _arg_1, arg_2, _arg_2, arg_3, _arg_3, vertex,that) {
		ctx.save();

		var img = that.img
		var idots = that.idots
		var imgRatio = that.imgRatio
		var count = that.count
		//根据变换后的坐标创建剪切区域
		ctx.beginPath();
		ctx.moveTo(_arg_1.x, _arg_1.y);
		ctx.lineTo(_arg_2.x, _arg_2.y);
		ctx.lineTo(_arg_3.x, _arg_3.y);
		ctx.closePath();
		// if (that.count) {
		// 	ctx.lineWidth = 2;
		// 	ctx.strokeStyle = 'red';
		// 	ctx.stroke();
		// }
		ctx.strokeStyle = '#fff'
		ctx.stroke();
		ctx.clip();
		ctx.draw()
		var result = getMatrix.apply(that, arguments);
		//变形

		ctx.transform(result.a, result.b, result.c, result.d, result.e * 3, result.f * 3);
		var w = that.imgwidth / count;
		var h = that.imgheight / count;
		//绘制图片
		ctx.drawImage(
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
		// }
		ctx.stroke();
		ctx.clip();
		ctx.draw()
		ctx.restore();



	};

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
	};
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

	};
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
	};

	function getArea(e) {
		var canvas = that.canvas
		// e = e || window.event;
		// console.log( canvas.offsetTop)
		return {
			t: e.changedTouches[0].clientY,
			l: e.changedTouches[0].clientX,
		};
		// return {
		// 	t:e.changedTouches[0].clientY - canvas.offsetTop + document.body.scrollTop + document.documentElement.scrollTop,
		// 	l: e.changedTouches[0].clientX - canvas.offsetLeft + document.body.scrollLeft + document.documentElement.scrollLeft,
		// };
	} 
	export {photo,getArea,getMatrix,equation,rectsplit,renderImage,beigin,render}

