<template>
	<view>
	
		<view class="content">
			<view class="bg">
				<view class="photoo" @click="photo" style="background: url('../../../static/upload.png') no-repeat;background-size: calc(94vw) calc(94vw);">
					<image class="subbg" mode="widthFix"  :src="bgimg"></image>
				</view>
			</view>
			<view v-show="chooseimg" class="photo" :style="{top:margintop1,left:marginleft1,width:width,height:height,backgroundImage:'url('+chooseimg+') !important',backgroundSize:' 100% 100%!important'}"
			 @touchstart="touchstart" @touchmove="touchmove" style="background-size: 100% 100%!important;">
				<view  class="three" @touchstart.stop="three" @touchmove.stop="three1"></view>
			</view>
			<!-- <view class="photo" style="background: url('../../../static/upload.png') no-repeat;background-size: 100% 100%;">
			<image mode="widthFix" @click="photo" :src="driver_license_positive"></image>
			<canvas v-show="show" id="cas" style="width: calc(94vw);height: calc(90vh);">
				亲，你滴浏览器太out啦，换一个吧
			</canvas>
		</view> -->
			<!-- <image src="../../../static/test.jpg"></image> -->

			<view class="footer">
				<scroll-view scroll-x style="white-space: nowrap; display: flex;">
					<view @click="choose(index)" v-for="(item,index) of chuan" class="chuan">
						<image :src="item.src"></image>
					</view>

				</scroll-view>
				<view class="bao" @click="save">保存图片</view>
			</view>
			<canvas canvas-id="cas" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
				chuan: [{
						id: 1,
						src: "../../../static/list.png"
					},
					{
						id: 1,
						src: "../../../static/navs.png"
					}
				],
				chooseimg: "",
				bgimg: "",
				choosetop: "",
				chooseleft: ""
			}
		},
		onLoad() {

		},
		onReady: function(e) {
				var photoo = uni.createSelectorQuery().select(".photo");
				photoo.boundingClientRect(data => {
					this.height = data.height
					this.width = data.width
				}).exec()


		},
		methods: {
			photo() {
				uni.chooseImage({
					count: 1, //默认9
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						this.bgimg = tempFilePaths[0]
						this.show = true
						// 						uni.uploadFile({
						// 							url: 'https://tjqcapp.jucheng01.net/applet.php/Basic/saveFile',
						// 							filePath: tempFilePaths[0],
						// 							name: 'file',
						// 							formData: {
						// 	%						'user': 'test'
						// 							},
						// 							success: (uploadFileRes) => {
						// 								this.driver_license_positive_up = JSON.parse(uploadFileRes.data).data.url
						// 								console.log(JSON.parse(uploadFileRes.data).data.url)
						// 
						// 							},
						// 							complete(res) {}
						// 						});
					}
				});

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
			choose(index) {
				this.chooseimg = this.chuan[index].src
			},
			save() {
				uni.showLoading({
    title: '图片生成中...'
});
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

			mounted() {



			}

		},
	}
</script>

<style>
	page {
		background: #fff;
		height: calc(100vh);
		overflow: hidden;
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

	canvas {
		position: absolute !important;
		width: 100% !important;
		height: 100% !important;
		z-index: 300;
		top: -1000px !important;
		display: block;
	}


	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 272upx;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
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

	.footer .bao {
		color: #fff;
		font-size: 28upx;
		text-align: center;
		height: 100upx;
		line-height: 100upx;
		border-top: 2upx #fff solid;
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
</style>
