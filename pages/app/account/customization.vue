<template>
	<view>
		<view class="content">
			<div style="height: 750upx" v-show="!backgroundSrc" >
				<div class="choose-image" @click="chooseImage" :class="{ipad}"></div>
			</div>
			
			<canvas
				v-show="backgroundSrc"
				canvas-id="canvas"
				:style="{width: canvasWidth + 'px', height: canvasHeight + 'px'}"
				@touchstart="onTouchStart"
				@touchmove="onTouchMove"
				@touchend="onTouchEnd"
			></canvas>
			
			<div class="handle-wrapper">
				<div class="handle">
					<ul class="tab">
						<li @click="onChangeTab(0)" :class="{active: currentTab === 0}" v-if="isShow">商品效果图</li>
						<li @click="onChangeTab(1)" :class="{active: currentTab === 1}">我的diy</li>
						<li @click="onChangeTab(2)" :class="{active: currentTab === 2}">收藏的窗帘</li>
					</ul>
					
					<span @click="handleClear">清除图片</span>
					<span @click="toWebView">URL跳转</span>
				</div>
				
				<view class="information-img">
					<scroll-view class="image-list" scroll-x="true" v-show="localImage.length">
						<view class="image-item" v-for="(item1, index1) in localImage" :key="index1"  @click="handleChooseImage(item1)">
							<img :src="item1">
						</view>
					</scroll-view>
				</view>
			</div>
			
			<button @click="handleUpload">上传图片</button>
			
			<view class="footer" v-if='isShowPhone1'>
				<view class="bao" @click="save">保存图片</view>
			</view>
			<view class="footer1" v-if='isShowPhone2'>
				<view class="bao" @click="save">保存图片</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	
	import matrix from '../../../utils/matrix.js';
	
	const COUNT = 6;
	
	const DRAW_IMAGE_EXTEND_EX = 3;
	
	function extendVert(x0, y0, x1, y1, x2, y2) {
	    var x = 2 * x0 - x1 - x2, y = 2 * y0 - y1 - y2;
	    var d = Math.sqrt(DRAW_IMAGE_EXTEND_EX / (x * x + y * y));
	    return [x0 + x * d, y0 + y * d];
	}
	
	export default {
		data() {
			return {
				isShowPhone1:true,
				isShowPhone2:true,
				isShowPic:true,
				isShow:true,
				localImage:[],//图片容器
				index_:'',//
				product_id:'',//商品id
				driver_license_positive: "",
				show: true,
				canvas: "",
				ctx: "",
				dots: [],
				count: 1,
				idots: [],
				img: "",
				imgRatio: 1,
				height: "",
				width: "",
				area: "",
				dot: "",
				margintop0: 0,
				marginleft0: 0,
				margintop1: "30%",
				marginleft1: "35%",
				pos: {},
				subbgheight: "",
				subbgweight: "",
				chuan: [],//chuan
				chooseimg: "",
				bgimg: "",
				choosetop: "",
				chooseleft: "",
				imageSrc: '',
				backgroundSrc: '',
				canvasWidth: 0,
				canvasHeight: 0,
				imageWidth: 0,
				imageHeight: 0,
				testW: 0,
				testH: 0,
				// localImage: [{
				// 		id: 1,
				// 		src: "/static/list.png"
				// 	},
				// 	{
				// 		id: 1,
				// 		src: "/static/navs.png"
				// 	}
				// ],
				currentTab: 0,
				ipad: false,
			}
		},
		onShow() {
			this.getResult()
		},
		onLoad(options) {
			const that = this
			uni.getSystemInfo({
				success: function (res) {
					var iPad  = res.model
					console.log(iPad )
					if(iPad){
						console.log(22)
						that.isShowPic = false
						that.isShowPhone1=false,
						that.isShowPhone2 = true
					}else{
						console.log(res.model,11)
						that.isShowPic = true
						that.isShowPhone1 = true,
						that.isShowPhone2 = false
					}
				}
			});
			this.product_id = options.id
			
			if(options.index_==0){
				this.isShow = false
				this.currentTab=1
			}else{
				this.isShow = true
			}
			// console.log(this.product_id)
		},
		
		onReady: function(e) {
			return;
			console.log(app)
				var photoo = uni.createSelectorQuery().select(".photo");
				photoo.boundingClientRect(data => {
					this.height = data.height
					this.width = data.width
				}).exec()
		},
		
		mounted() {
			this.$nextTick(() => {
				this.initCanvas();
			})
		},
		
		methods: {
			toWebView(){
				uni.navigateTo({
					url:'../../webView'
				})
			},
			handleUpload() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.imageSrc = res.tempFiles[0].path;
						this.setCanvasByImage();
					}
				})
			},

			//数据
			getResult(){
				app.$vm.getData({
					url:'Mall/getProductDiy',
					that: this,
					data: {
						product_id:this.product_id,
						type :this.currentTab,
					},
					loading: 1,
				}).then(res=>{
					if(res.code ==1){
						this.localImage = res.data;
					}
				})
			},
			
			handleClear() {
				this.canvas.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
				this.backgroundSrc = '';
				this.imageSrc = '';
			},
		
			handleChooseImage(src) {
				if (!this.backgroundSrc) {
					return uni.showToast({
						title: '请先上传背景图图片',
						icon: 'none'
					})
				}
				
				if (this.iamgeSrc === src) return;
				
				this.imageSrc = src;
				this.setCanvasByImage();
			},
			
			onChangeTab(newIndex) {
				if (this.currentTab === newIndex) return;
				
				this.localImage = [];
				this.currentTab = newIndex;
				this.getResult()
			},
			
			initCanvas() {
				const canvas = uni.createCanvasContext('canvas');
				
				const { windowWidth, pixelRatio, model } = uni.getSystemInfoSync();
				this.pixelRatio = pixelRatio;

				this.canvasWidth = windowWidth;
				this.canvasHeight = windowWidth;
				
				this.qy = (40 / 750) * windowWidth;

				if (model.toLowerCase().indexOf('ipad') > -1) {
					this.canvasHeight *= 0.8;
					this.ipad = true;
				}
				
				this.canvas = canvas;
			},
			
			chooseImage() {
				const that = this;
				uni.chooseImage({
					count: 1,
					success: function(res) {
						that.backgroundSrc = res.tempFiles[0].path;
						// that.setCanvasByImage();
						that.initCanvasBackground();
					}
				})
			},
			
			initCanvasBackground() {
				uni.getImageInfo({
					src: this.backgroundSrc,
					success: (res) => {
						let { width, height } = res;
						const radio = height / width;
						
						const backgroundWidth = this.canvasWidth;
						const backgroundHeight = backgroundWidth * radio;
						this.backgroundWidth = backgroundWidth;
						this.backgroundHeight = backgroundHeight;
						
						this.canvas.drawImage(
							this.backgroundSrc,
							0,
							0,
							backgroundWidth,
							backgroundHeight,
						);
						
						this.canvas.draw();
					}
				})
			},
			
			renderBackground() {
				this.canvas.drawImage(
					this.backgroundSrc,
					0,
					0,
					this.backgroundWidth,
					this.backgroundHeight,
				);
			},
			
			setCanvasByImage() {
				// 初始化配置项参数
				const maxHeight = this.canvasHeight / 1.5;
				
				let imgRatio = 1;
				
				const { canvasWidth, canvasHeight } = this;
				
				const that = this;
				
				function getNumber() {
					console.log((number / 750) * canvasWidth);
					return (number / 750) * canvasWidth;
				}
				
				uni.getImageInfo({
					src: this.imageSrc,
					success: function(response) {
						let imageWidth = Number(response.width);
						let imageHeight = Number(response.height);
						
						var img_w = imageWidth,
						    img_h = imageHeight;
						
						if (img_h > maxHeight) {
						    imgRatio = maxHeight / img_h;
						    img_h = maxHeight;
						    img_w *= imgRatio;
						}
						
						if (img_w > that.canvasWidth * 0.96) {
							const w_h = img_h / img_w;
							img_w = that.canvasWidth * 0.96;
							img_h = img_w * w_h;
						}
						
						var left = (canvasWidth - img_w) / 2;
						var top = (canvasHeight - img_h) / 2;
						
						imageWidth = img_w;
						imageHeight = img_h; 
						
						that.imageWidth = imageWidth;
						that.imageHeight = imageHeight;
						
						const dots = [
						    { x: left, y: top },
						    { x: left + img_w, y: top },
						    { x: left + img_w, y: top + img_h },
						    { x: left, y: top + img_h },
						];
						
						//保存一份不变的拷贝
						const dotscopy = [
						    { x: left, y: top },
						    { x: left + img_w, y: top },
						    { x: left + img_w, y: top + img_h },
						    { x: left, y: top + img_h },
						];
						
						//获得所有初始点坐标
						const idots = that.rectsplit(COUNT, dotscopy[0], dotscopy[1], dotscopy[2], dotscopy[3]);
						
						that.dots = dots;
						that.dotscopy = dotscopy;
						that.idots = idots;
						that.imgRatio = imgRatio;
						
						that.render();
					}
				})
			},
			
			/**
			 * 将 abcd 四边形分割成 n 的 n 次方份，获取 n 等分后的所有点坐标
			 * @param n     多少等分
			 * @param a     a 点坐标
			 * @param b     b 点坐标
			 * @param c     c 点坐标
			 * @param d     d 点坐标
			 * @returns {Array}
			 */
			rectsplit(n, a, b, c, d) {
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
			},
					
			 /**
			 * 画布渲染
			 */
			render() {
				this.canvas.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
				this.renderBackground();
				
				const { dots, idots } = this;
				
				const ndots = this.rectsplit(COUNT, dots[0], dots[1], dots[2], dots[3]);
				
				ndots.forEach((d, i) => {
				    //获取平行四边形的四个点
				    var dot1 = ndots[i];
				    var dot2 = ndots[i + 1];
				    var dot3 = ndots[i + COUNT + 2];
				    var dot4 = ndots[i + COUNT + 1];
				
				    //获取初始平行四边形的四个点
				    var idot1 = idots[i];
				    var idot2 = idots[i + 1];
				    var idot3 = idots[i + COUNT + 2];
				    var idot4 = idots[i + COUNT + 1];
				
				    if (dot2 && dot3 && i % (COUNT + 1) < COUNT) {
				        //绘制三角形的下半部分
				        this.renderImage(idot3, dot3, idot2, dot2, idot4, dot4, idot1);
				
				        //绘制三角形的上半部分
				        this.renderImage(idot1, dot1, idot2, dot2, idot4, dot4, idot1);
				    }
				});
				
				const qy = this.qy;

				this.canvas.setFillStyle('rgba(0, 0, 0, 0.5)');
				dots.forEach(item => {
					this.canvas.beginPath();
					this.canvas.arc(item.x, item.y, qy, 0, 2 * Math.PI);
					this.canvas.fill();
					this.canvas.closePath();
				})
				
				this.canvas.draw(true);
			},
			
			 /**
			 * 计算矩阵，同时渲染图片
			 * @param arg_1
			 * @param _arg_1
			 * @param arg_2
			 * @param _arg_2
			 * @param arg_3
			 * @param _arg_3
			 */
			renderImage(arg_1, _arg_1, arg_2, _arg_2, arg_3, _arg_3, vertex) {
				const ctx = this.canvas;
			    ctx.save();
				
				const x0 = _arg_1.x;
				const y0 = _arg_1.y;
				const x1 = _arg_2.x;
				const y1 = _arg_2.y;
				const x2 = _arg_3.x;
				const y2 = _arg_3.y;
			
				var s0 = extendVert(x0, y0, x1, y1, x2, y2);
				var s1 = extendVert(x1, y1, x0, y0, x2, y2);
				var s2 = extendVert(x2, y2, x1, y1, x0, y0);
			
				ctx.beginPath();
				ctx.moveTo(s0[0], s0[1]);
				ctx.lineTo(s1[0], s1[1]);
				ctx.lineTo(s2[0], s2[1]);
				ctx.closePath();
				
				ctx.lineWidth = 1;
                ctx.strokeStyle = 'transparent';
                ctx.stroke();
			
			    ctx.clip();
			
				//传入变换前后的点坐标，计算变换矩阵
				var result = matrix.getMatrix.apply(this, arguments);
					
				//变形
				ctx.setTransform(result.a, result.b, result.c, result.d, result.e, result.f);
				
				const { imgRatio, idots } = this;
				
				var w = this.imageWidth / COUNT;
				var h = this.imageHeight / COUNT;
				
				//绘制图片
				ctx.drawImage(
					this.imageSrc,
					(vertex.x - idots[0].x) / imgRatio - 1,
					(vertex.y - idots[0].y) / imgRatio - 1,
					w / imgRatio + 2,
					h / imgRatio + 2,
					vertex.x - 1,
					vertex.y - 1,
					w + 2,
					h + 2
				);
			
			    ctx.restore();
			},
			
			onTouchStart(e) {
				if (!this.dots || !this.dots.length) return;
				
				const area = this.getArea(e);
				this.area = area;
				
				const dots = this.dots;
				
				let dot, i;
				
				//鼠标事件触发区域
				const qy = this.qy;
				
				for (i = 0; i < dots.length; i++) {
				    dot = dots[i];
				    if (area.t >= dot.y - qy && area.t <= dot.y + qy && area.l >= dot.x - qy && area.l <= dot.x + qy) {
				        break;
				    } else {
				        dot = null;
				    }
				}
				
				if (!dot) return;
				
				this.dot = dot;
				this.canMove = true;
			},
			
			onTouchMove(e) {
				if (!this.canMove || this.touchTimer) return;
				
				this.touchTimer = setTimeout(() => {					
					this.touchTimer = null;
					
					const dot = this.dot;
					
					let narea = this.getArea(e);
					const area = this.area;
					
					const nx = narea.l - area.l;
					const ny = narea.t - area.t;
					
					dot.x += nx;
					dot.y += ny;
					
					this.area = narea;
					
					this.render();
				}, 100);
			},
			
			onTouchEnd() {
				this.canMove = false;
				this.touchTimer = null;
			},
			
			 /**
			 * 获取鼠标点击/移过的位置
			 * @param e
			 * @returns {{t: number, l: number}}
			 */
			getArea(e) {
			    e = e.touches[0];
			    return {
			        t: e.y,
			        l: e.x,
			    };
			},

			touchstart(e) {
				this.marginleft0 = e.changedTouches[0].clientX - e.target.offsetLeft;
				this.margintop0 = e.changedTouches[0].clientY - e.target.offsetTop;

			},
			touchmove(e) {
				this.marginleft1 = (e.changedTouches[0].pageX - this.marginleft0) + "px";
				this.margintop1 = (e.changedTouches[0].pageY - this.margintop0) + "px";
			},

			three(e) {
				var photoo = uni.createSelectorQuery().select(".photo");
				photoo.boundingClientRect(data => {
					this.height = data.height
					this.width = data.width
				}).exec(res=>{this.pos = {
					'w': this.width,
					'h': this.height,
					'x': e.changedTouches[0].clientX,
					'y': e.changedTouches[0].clientY
				};})
			},
			three1(e) {
				var w = Math.max(30, e.changedTouches[0].clientX - this.pos.x + this.pos.w)
				var h = Math.max(30, e.changedTouches[0].clientY - this.pos.y + this.pos.h)
				// console.log(w,h)
				// 设置图片的最大宽高
				this.width = w + 'px';
				this.height = h + 'px';
			},

			save() {
				if (!this.imageSrc) {
					uni.showToast({
						title: '请先上传图片',
						icon: 'none'
					})
				}
				
				uni.showLoading({
					title: '图片生成中...'
				});
				
				uni.canvasToTempFilePath({
					width: this.canvasWidth,
					height: this.canvasHeight,
					canvasId: 'canvas',
					success: res => {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: _res => {
								uni.hideLoading();
								uni.showToast({
									title: '图片已保存'
								})
							},
							fail: _err => {
								console.log(_err);
								uni.hideLoading();
							}
						})
					},
					fail: err => {
						console.log(err);
						uni.hideLoading();
					}
				})
				
				return;
				var subbg = uni.createSelectorQuery().select(".subbg");
				
				subbg.boundingClientRect(data => {
					this.subbgheight = data.height
					this.subbgwidth = data.width

				}).exec(res => {
					var photo = uni.createSelectorQuery().select(".photo");
					photo.boundingClientRect(data => {
						this.choosetop = data.top
						this.chooseleft = data.left
					}).exec(res => {
						this.ctx = uni.createCanvasContext('cas');
						this.ctx.drawImage(
							this.bgimg,
							0,
							0,
							this.subbgwidth,
							this.subbgheight,
						);
						this.ctx.drawImage(
							this.chooseimg,
							this.chooseleft,
							this.choosetop,
							this.width,
							this.height,
						);
						this.ctx.draw(false, () => {
							uni.canvasToTempFilePath({
								width: this.subbgwidth,
								height: this.subbgheight,
								canvasId: 'cas',
								success: res => {
									uni.saveImageToPhotosAlbum({
										filePath: res.tempFilePath,
										success: res => {
											uni.hideLoading();
											uni.showToast({
												title: '图片已保存'
											})
										}
									})
									console.log(res.tempFilePath)
								},
								complete(res) {
									console.log(res)
								}
							})
						})
					})
				})
			},
			back(){
				uni.navigateBack({
					delta: 1
				})
			},
		},
	}
</script>

<style lang="less">
	page {
		background: #fff;
		height: calc(100vh);
		overflow: hidden;
	}
	
	.choose-image {
		width: 750upx;
		height: 750upx;
		background: url('../../../static/upload.png') no-repeat;
		background-size: cover;
		
		&.ipad {
			height: 80%;
		}
	}

	.choose-item-image {
		height: 100px;
		margin-right: 20upx;
	}
	
	.information-img{
		margin: 10upx 15upx 0 30upx;
		height: 150upx;
		box-sizing: border-box;
		
		.image-list {
			display: flex;
			align-items: center;
			width: 100%;
			height: 100%;
			flex-wrap: nowrap;
			white-space: nowrap;
			
			.image-item {
				display: inline-block;
				flex: none;
				width: 150upx;
				height: 150upx;
				margin-right: 10upx;
				
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
		
		.swiper{
			height: 150upx;
		}
	}
		
	.back{
		position: fixed;
		top: 88upx;
		left: 0;
		width: 100%;
		height: 100upx;
		font-size: 28upx;
		color:#1a1a1a;
		line-height: 88upx;
	}
	.back image{
		width: 30upx;
		height: 30upx;
		margin: -6upx 30upx 0;
		vertical-align: middle;
	}
	.content {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: calc(100vh - 44px);
		overflow: hidden;
	}

	.bg {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
	}

	.bg image {
		width: 100%;
	}
	.photoo{
		width: 94%;
		margin: 30upx auto;
		height: calc(100vh - 74px);
	}
	.photo {
		position: absolute;
		width: calc(30vw);
		height: calc(30vw);
		z-index: 9999;


	}

	.photo image {
		width: 100%
	}

	.one,
	.two,
	.three,
	.four {
		position: absolute;
		width: 30upx;
		height: 30upx;
		background-color: rgb(122, 191, 238);
	}

	.one {
		top: 0;
		left: 0
	}

	.two {
		top: 0;
		right: 0
	}

	.four {
		bottom: 0;
		left: 0
	}

	.three {
		bottom: 0;
		right: 0
	}

/* 	canvas {
		position: absolute !important;
		width: 100% !important;
		height: 100% !important;
		z-index: 300;
		top: -1000px !important;
		display: block;
	} */


	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100upx;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
	}
	.footer .bao {
		color: #fff;
		font-size: 28upx;
		text-align: center;
		height: 100upx;
		line-height: 100upx;
		border-top: 2upx #fff solid;
	}
	.footer1 {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100upx;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
	}
	.footer1 .bao {
		color: #fff;
		font-size: 28upx;
		text-align: center;
		height: 100upx;
		// line-height: 100upx;
		border-top: 2upx #fff solid;
	}
	.chuan {
		display: inline-block;
		width: 140upx;
		height: 140upx;
		border-radius: 6upx;
		margin: 16upx;
	}

	.chuan image {
		display: block;
		width: 140upx !important;
		height: 140upx !important;
	}

	


	/* body{
		 -moz-user-select: none;}
        #cas{
            position: absolute;
            top: 80px;
            left: 0;
            right: 0;
            margin: auto;
            border: 1px solid;
        }
        .tips{text-align: center;margin: 15px 0;}
        .control{ text-align: center; } */
		
		.handle-wrapper {
			margin-top: 20upx;
			padding: 0 10upx;
		}
		
		.handle {
			display: flex;
			justify-content: space-between;
			padding: 20upx 10upx;
			font-size: 30upx;
		}
		
		.tab {
			display: flex;
		}
		
		.tab li {
			margin-right: 15upx;
			flex: none;
			
			&.active {
				font-weight: bold;
			}
		}
</style>
