<template>
	<view id="detail">
		<view class="swiperBox">
			<swiper class="swiper" indicator-dots="true" indicator-active-color="#ffffff">
				<swiper-item class="swiperItem" v-for="(item,index) in product.img_path" :key="index">
					<view>
						<image :src="item"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="price flex__between">
			<view class="flex__align">
				<text class="fs_40 c_1a fw_600">￥&nbsp;{{price_original}}</text>
				<text>/米</text>
			</view>
			<view class="flex__between">
				<view class="flex__center__between" @click="like">
					<text class="iconfont iconxin lh_50" :class="is_collect?'c_main':'c_b3'" style="font-size: 48upx;"></text>
					<!-- <text class="iconfont iconxihuan lh_50" v-if="collect_isShow" style="font-size: 48upx;"></text>
					<text class="iconfont iconxin lh_50 c_main" v-else style="font-size: 48upx;"></text> -->

				</view>
				<!-- 分享图片 -->
				<!-- <image src="../../../static/images/fx.png" @tap="share()" style="color: #000;"></image> -->
				<text class="iconfont iconfenxiang_2-copy" @tap="share()" style="font-size: 48upx;"></text>
			</view>
		</view>
		<view class="price_original flex__align">
			<text class="fs_32 c_80 fw_500">原价￥&nbsp;{{product.price}}</text>
			<text class="fs_28">/米</text>
		</view>
		<view class="name c_1a fs_30 ellipsis_two">{{product.name}}</view>
		<view class="fs_26 c_80 sold">已售{{product.sales}}</view>
		<view class="discounts flex__align">
			<view style="letter-spacing: 4upx;">
				<text class="fs_34 fw_800">{{prefer_rate}}%</text>
				<text class="fs_34 fw_800 c_1a">优惠</text>
			</view>
			<text class="c_ff fs_24" @click="customization">定制效果</text>
		</view>
		<view class="choose flex__between__center" @click="ensure_modal=true" v-if="product.spec_open==2">
			<text class="c_1a fs_26 ff_cg">选择规格</text>
			<image src="../../../static/images/bh@2x.png"></image>
		</view>
		<!-- 详情 -->
		<view class="detailText">
			<view class="ff_cg fs_36 c_1a">商品详情</view>
			<rich-text :nodes="product.description" v-if="product.description" class="richText"></rich-text>
		</view>
		<!-- 选择规格 -->
		<view class="footer flex">
			<view class="ff_cg fs_30 c_1a" @tap="addCart">加入购物车</view>
			<view class="ff_cg fs_30 c_ff" @click="buyNow('/pages/app/mall/placeOrder?settlement_type=2')">立即购买</view>
		</view>
		<!-- 回顶部 -->
		<view class="supernatant">
			<view class="flex__center__center" @tap="goTop(e)" :hidden="go_top_hidden">
				<image src="../../../static/images/top.png"></image>
			</view>
			<view class="flex__center__center" @tap="goHome()">
				<image src="../../../static/images/home.png"></image>
			</view>
		</view>
		<!-- 选项规格 -->
		<view class="layer" v-show="ensure_modal">
			<view class="ensure">
				<view>
					<text class="iconfont iconcuohao" @click="ensure_modal=false"></text>
				</view>
				<view class="scrollView">
					<view class="information flex__align"  v-if="loads.index_1!=-1">
						<image :src="item_list.cover_img"></image>
						<view>
							<view>
								<text class="c_1a fs_36 fw_600" style="font-family: 'Avenir Heavy';">￥{{price_original_}}</text>
								<text class="c_1a fs_24 ff_cg">/米</text>
							</view>
							<view >
								<text class="c_80 fs_28" style="font-family: 'Avenir Heavy';">原价￥{{item_list.price}}</text>
								<text class="c_80 fs_24 ff_cg">/米</text>
							</view>
							<view class="ff_cg c_80 fs_28">库存：{{item_list.stock}}件</view>
							<view class="ff_cg c_80 fs_28">已选“{{item_list.spec_item_value}}”</view>
						</view>
					</view>
					
					<view class="selectModels">
						<text class="ff_cg fs_28 title">选择型号</text>
						<view class="choose_choose flex wrap">
							<view :class="loads.index_1==index?'active':''" class="ff_cg fs_24 fw_400 c_33" v-for="(item,index) in product_spec"
							 :key="index" @tap="selected(item,index)">
								{{item.spec_item_value}}
							</view>
						</view>
						<text class="ff_cg fs_28 fw_400 title" style="margin-top: 39upx;">窗户型号</text>
						<view class="window fs_24 ff_cg c_1a">
							<input type="text" placeholder="请输入窗号信息" placeholder-style="color:#CBCBCB" v-model="information">
							<view class="flex__between__center">
								<input type="number" placeholder="请输入窗户宽度" placeholder-style="color:#CBCBCB" v-model="widths">
								<input type="number" placeholder="请输入窗户高度" placeholder-style="color:#CBCBCB" v-model="heights">

								<text class="inputlift fs_24 ff_cg c_1a fw_400">米</text>
								<text class="inputRight fs_24 ff_cg c_1a fw_400">米</text>
							</view>
							<view>
								<input type="number" placeholder="请输入倍数" placeholder-style="color:#CBCBCB" v-model="multiple">
								<text class="fs_24 ff_cg c_1a">倍</text>
							</view>
						</view>
						<text class="ff_cg fs_28 title" style="margin-top: 39upx;">安装方式</text>
						<view class="choose_choose flex wrap">
							<view :class="loads.index_2==index?'active':''" class="ff_cg fs_24 c_33" v-for="(item,index) in installation"
							 :key="index" @tap="way(item,index)">
								{{item.name}}
							</view>
						</view>
						<text class="ff_cg fs_28 fw_400 title" style="margin-top: 39upx;">安装结构</text>
						<view class="choose_choose flex wrap">
							<view :class="loads.index_3==index?'active':''" class="ff_cg fs_24 fw_400 c_33" v-for="(item,index) in structure"
							 :key="index" @tap="struc(item,index)">
								{{item.name}}
							</view>
						</view>
						<text class="ff_cg fs_28 fw_400 title" style="margin-top: 39upx;">帘头<text class="fs_24 ff_cg c_98">(非必选)</text></text>
						<view class="choose_choose flex wrap">
							<view :class="loads.index_4==index?'active':''" class="ff_cg fs_24 fw_400 c_33" v-for="(item,index) in shadeHead"
							 :key="index" @tap="shade(item,index)">
								{{item.name}}
							</view>
						</view>
						<text class="ff_cg fs_28 fw_400 title" style="margin-top: 39upx;">工艺<text class="fs_24 ff_cg c_98">(非必选)</text></text>
						<view class="choose_choose flex wrap">
							<view :class="loads.index_5==index?'active':''" class="ff_cg fs_24 fw_400 c_33" v-for="(item,index) in process"
							 :key="index" @tap="proces(item,index)">
								{{item.name}}
							</view>
						</view>
						<view class="note" v-if="loads.index_5==2">
							<textarea name="" v-model="notices" placeholder="请输入" @input="input"></textarea>
						</view>
					</view>
				</view>
				<view class="footer flex">
					<view class="fw_400 ff_cg fs_30 c_1a" @tap="addCart">加入购物车</view>
					<view class="fw_400 ff_cg fs_30 c_ff" @tap="buyNow">立即购买</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				item_list: {
					spec_item_id: ''
				},
				id: '', //商品id
				product: [],
				product_sku: [], //规格中选项
				product_spec: {}, //规格中选项-型号
				prefer_rate: 0, //优惠
				is_collect: 0, //收藏
				spec_item_value: '布',
				loads: {
					index_1: -1,
					index_2: -1,
					index_3: -1,
					index_4: -1,
					index_5: -1,
				},
				orders: {
					product_id: ''
				},
				collect_isShow: true, //收藏
				// this.orders.product_id = res.data.product.id;
				activityData: [],
				//绑定数据
				information: '', //窗号信息
				heights: '', //窗户高度
				widths: '', //窗户宽度
				multiple: '', //倍数
				// sku:'',
				settlement_type: 2,
				go_top_hidden: true,
				ensure_modal: false,
				isShow: false,
				//安装方式
				installation: [{
					name: '罗马杆'
				}, {
					name: '轨道'
				}, {
					name: '其他'
				}],
				installation_name: '',
				//安装结构
				structure: [{
					name: '顶装'
				}, {
					name: '侧装'
				}, {
					name: '其他'
				}],
				structure_name: '',
				//窗头
				shadeHead: [{
					name: '正贴'
				}, {
					name: '反贴'
				}],
				shadeHead_name: '',
				//工艺
				process: [{
					name: '韩折'
				}, {
					name: '打孔'
				}, {
					name: '其他'
				}],
				process_name: '',
				notices: '',
				notice:'',
				price_original:"",//现价-详情
				price_original_:'',//现价-规格
				
			}
		},
		onLoad(options) {
			this.id = options.id
			console.log(this.id)
		},
		onShow() {
			this.getResule()
		},
		watch: {
			//高
			'heights': function(newVlal, oldVal) {
				let value = String(newVlal)
				if (value.indexOf('.') > 0) {
					var left = value.substr(0, value.indexOf('.'));
					var right = value.substr(value.indexOf('.') + 1, value.length);
					if (right.length > 2) {
						right = right.search(0, 1)
					} else {
						uni.showToast({
							title: '只能为两位小数',
							icon: 'none'
						});
					}
					value = left + '.' + right
				}
				this.heights = value
			},
			//宽
			'widths': function(newVlal, oldVal) {
				let value1 = String(newVlal)
				if (value1.indexOf('.') > 0) {
					var left = value1.substr(0, value1.indexOf('.'));
					var right = value1.substr(value1.indexOf('.') + 1, value1.length);
					if (right.length > 2) {
						right = right.search(0, 1)
					} else {
						uni.showToast({
							title: '只能为两位小数',
							icon: 'none'
						});
					}
					value1 = left + '.' + right
				}
				this.widths = value1
			}
		},
		methods: {
			//
			input(e){
				this.notice = e.detail.value
				console.log()
			},
			//分享
			share() {
				let that = this;
				var navData = JSON.stringify(that.product); // 这里转换成 字符串
				var a = encodeURIComponent(navData)
				uni.navigateTo({
					url: '/pages/app/account/share?product=' + a
				})
			},
			//选择型号
			selected(item, index) {
				this.item_list = item
				this.price_original_ = Number((item.price)*( this.prefer_rate)/100)
				this.spec_item_value = item.spec_item_value
				this.loads.index_1 = index
				
			},
			//安装方式
			way(item, index) {
				this.installation_name = item.name
				this.loads.index_2 = index
			},
			//安装结构
			struc(item, index) {
				this.structure_name = item.name
				this.loads.index_3 = index
			},
			//窗头
			shade(item, index) {
				this.shadeHead_name = item.name
				if(index!=this.loads.index_4){
				    this.loads.index_4 = index;
				}else{
				    this.loads.index_4 = -1;
				}
			},
			//工艺
			proces(item, index) {
				const that = this
				this.process_name = item.name
				if(index!=this.loads.index_5){
				    this.loads.index_5 = index;
				}
				else{
				    this.loads.index_5 = -1;
				}
				
			},
			//数据
			getResule() {
				app.$vm.getData({
					url: 'Mall/getProductDetailData',
					that: this,
					data: {
						product_id: this.id
					},
					loading: 1
				}).then(res => {
					if (res.code == 1) {
						this.product_spec = res.data.product_spec[0].spec_item
						this.prefer_rate = res.data.prefer_rate
						this.product_sku = res.data.product_sku[0]
						this.product = res.data.product; //
						this.price_original = Number((res.data.product.price)*( res.data.prefer_rate)/100)
						this.orders.product_id = res.data.product.id
						this.product.description = res.data.product.description.replace(/\<img/gi,
							'<img style="max-width:100%;height:auto" ');
						this.is_collect = res.data.is_collect;

					}
				})
			},
			getChoose() {
				app.$vm.getData({
					url: 'Mall/getProductDetailData',
					that: this,
					data: {
						product_id: this.id
					},
					loading: 1
				}).then(res => {
					if (res.code == 1) {
						this.product_sku = res.data.product_sku
						console.log(this.product_sku)
					}
				})
			},
			//加入购物车
			addCart() {
				const that = this
				if(that.process_name == '其他'){
					var process_name = that.notices
					console.log(process_name,11)
				}else{
					var process_name = that.process_name
					console.log(process_name,22)
				}
					
				if (that.ensure_modal == false) {
					uni.showToast({
						title: '请选择规格',
						icon: 'none'
					});
					return;
				}
				app.$vm.getData({
					url: 'Mall/updateDetailCart',
					that: this,
					data: {
						product_id: this.id,
						number: this.multiple * this.widths,
						window_type: this.information,
						height: this.heights,
						width: this.widths,
						times: this.multiple,
						install_type: this.installation_name,
						install_style: this.structure_name,
						plane: this.shadeHead_name,
						sku: this.item_list.spec_item_id,
						craft: process_name
					}
				}).then(res => {
					if (res.code == 1) {
						this.show = false;
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						});
					}
				})

			},
			//立即购买
			buyNow() {
				const that = this
				if(that.process_name == '其他'){
					var process_name = that.notices
					console.log(process_name,11)
				}else{
					var process_name = that.process_name
					console.log(process_name,22)
				}
				var number = this.multiple * this.widths
				if (that.ensure_modal == false) {
					uni.showToast({
						title: '请选择规格',
						icon: 'none'
					});
					return;
				}
				
				if (that.settlement_type == 2) {
					app.$vm.getData({
						url: 'Mall/getOrderReady',
						that: this,
						data: {
							settlement_type: this.settlement_type,
							product_id: this.id,
							number: number,
							sku: this.item_list.spec_item_id,
							window_type: this.information,
							height: this.heights,
							width: this.widths,
							times: this.multiple,
							install_type: this.installation_name,
							install_style: this.structure_name,
							plane: this.shadeHead_name,
							craft: process_name

						}
					}).then(res => {
						if (res.code == 1) {
							that.show = false;
							uni.showToast({
								title: res.message,
								icon: 'none'
							});
							setTimeout(function() {
								uni.navigateTo({
									url: '/pages/app/mall/placeOrder?settlement_type=2' + '&product_id=' + that.orders.product_id +
										'&window_type=' + that.information + '&height=' + that.heights + '&sku=' + that.item_list.spec_item_id +
										'&width=' + that.widths + '&times=' + that.multiple + '&install_type=' + that.installation_name +
										'&number=' + number + '&install_style=' + that.structure_name +
										'&plane=' + that.shadeHead_name + '&craft=' + process_name
								})
							}, 500)
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none'
							});
						}
					})
				}

			},
			// 收藏
			like() {
				app.$vm.getData({
					url: 'Mall/submitCollect',
					that: this,
					data: {
						product_id: this.product.id,
						source: 1
					},
					loading: 1
				}).then(res => {
					uni.showToast({
						title: res.message,
						icon: 'none'
					});
					if (res.code == 1 && res.message == '收藏成功') {
						this.is_collect = 1;
					}
					if (res.code == 1 && res.message == '取消收藏成功') {
						this.is_collect = 0;
					}
					// if(this.collect_isShow){
					// 	this.collect_isShow=false
					// 	
					// }else{
					// 	this. collect_isShow=true
					// 	if(res.code==1&&res.message=='取消收藏成功'){
					// 		this.is_collect= 0;	
					// 	}
					// }

				})
			},
			//跳转
			jump(url) {
				uni.navigateTo({
					url: url
				})
			},
			//返回首页
			goHome() {
				uni.switchTab({
					url: '/pages/app/mall/index'
				});
			},
			//置顶
			goTop() {
				uni.pageScrollTo({
					scrollTop: 0,
				})
			},
			//滑动一定位置出现
			onPageScroll: function(e) {
				var go_top_hidden = e.scrollTop > 200 ? false : true
				this.go_top_hidden = go_top_hidden
			},
			//定制
			customization() {
				uni.navigateTo({
					url: "../../webView?id=" + this.id + '&index_=2'
				})
			}
		}
	}
</script>

<style>
	page {
		background: #fff;
	}
</style>
<style lang="less" scoped>
	#detail {
		width: 100%;
		height: 100%;
		line-height: 1;
		padding-bottom: 80upx;

		//lunb
		.swiperBox {
			width: 100%;
			height: 650upx;

			.swiper {
				width: 100%;
				height: 650upx;

				.swiperItem {
					width: 100%;
					height: 650upx;

					&>view {
						&>video {
							width: 100%;
							height: 650upx;
						}

						&>image {
							width: 100%;
							height: 650upx;
						}
					}

				}
			}
		}

		//
		.price {
			margin: 38upx 39upx 17upx 24upx;
			height: 65upx;

			&>view:nth-child(1) {
				height: 63upx;

				&>text:nth-child(1) {
					height: 57upx;
					line-height: 57upx;
					display: block;
				}

				&>text:nth-child(2) {
					height: 40upx;
					line-height: 40upx;
					display: block;
				}
			}

			.like {
				color: #CD2F2E;
			}

			&>view:nth-child(2) {
				&>view {
					margin-right: 70upx;
				}

				&>image {
					width: 42upx;
					height: 42upx;
				}
			}
		}

		.price_original {
			margin: 17upx 39upx 17upx 24upx;
			text-decoration: line-through;
			color: #808080;
		}

		.name {
			font-family: "常规体";
			margin: 0 21upx 0 30upx;
			margin-bottom: 6upx;
			line-height: 1.5;
		}

		.sold {
			font-family: "常规体";
			height: 58upx;
			line-height: 58upx;
			margin-bottom: 8upx;
			padding-left: 30upx;
			letter-spacing: 2upx;
		}

		.discounts {
			width: 100%;
			height: 100upx;
			background: linear-gradient(131deg, rgba(255, 250, 249, 1) 0%, rgba(255, 246, 243, 1) 100%);

			&>view {
				padding-left: 30upx;
				margin-right: 23upx;

				&>text:nth-child(1) {
					color: #FFAA84;
					font-family: "Avenir Heavy";
				}
			}

			&>text {
				display: block;
				width: 150upx;
				height: 44upx;
				line-height: 44upx;
				text-align: center;
				border-radius: 22upx;
				background: linear-gradient(131deg, rgba(255, 178, 144, 1) 0%, rgba(255, 174, 146, 1) 100%);
				font-family: "常规体";
				letter-spacing: 2upx;
			}
		}

		.choose {
			margin: 35upx 30upx 60upx 30upx;
			height: 80upx;
			border: 2upx solid rgba(26, 26, 26, 1);
			background: #fff;

			&>text {
				padding-left: 25upx;
				letter-spacing: 2upx;
			}

			&>image {
				width: 24upx;
				height: 24upx;
				margin-right: 20upx;
			}
		}

		.detailText {
			padding: 0 31upx 0 31upx;
			height: 100%;
			margin-bottom: 100upx;

			&>view {
				height: 50upx;
				line-height: 50upx;
				margin-bottom: 16upx;
			}

			.richText {
				width: 100%;
				word-break: break-all;
			}
		}

		.footer {
			position: fixed;
			bottom: 0;
			left: 0;
			height: 98upx;
			width: 100%;
			z-index: 10;
			background: #fff;

			&>view {
				width: 50%;
				height: 100%;
				text-align: center;
				line-height: 98upx;
				letter-spacing: 2upx;
			}

			&>view:nth-child(1) {
				background: #fff;
				border: 2upx solid rgba(26, 26, 26, 1);
			}

			&>view:nth-child(2) {
				background: #000;
			}
		}

		//置顶
		.supernatant {
			position: fixed;
			bottom: 125upx;
			right: 20upx;
			height: 180upx;
			width: 80upx;
			z-index: 10;

			&>view:nth-child(1) {
				width: 80upx;
				height: 80upx;
				background: #fff;
				margin-bottom: 20upx;
				box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);

				&>image {
					width: 40upx;
					height: 40upx;
				}
			}

			&>view:nth-child(2) {
				width: 80upx;
				height: 80upx;
				background: #fff;
				box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);

				&>image {
					width: 40upx;
					height: 40upx;
				}
			}
		}

		//浮层选择
		.layer {
			position: fixed;
			top: 0;
			bottom: 0;
			width: 100%;
			background: rgba(0, 0, 0, 0.6);
			z-index: 30;
			height: 100%;
			overflow: hidden;

			.ensure {
				width: 100%;
				height: 100%;
				background: #fff;

				&>view:nth-child(1) {
					height: 80upx;
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: flex-end;

					&>text {
						display: block;
						height: 100%;
						width: 80upx;
						display: flex;
						align-items: center;
						justify-content: center;
						font-size: 32upx;
						margin-right: 30upx;
						// margin:0 30upx 16upx 0;
					}
				}

				.scrollView {
					height: 100%;
					overflow-y: auto;

					.information {
						margin: 0 30upx;
						height: 195upx;
						margin-bottom: 40upx;

						&>image {
							display: block;
							width: 260upx;
							height: 195upx;
							margin-right: 36upx;
						}

						&>view {
							line-height: 1;

							&>view:nth-child(1) {
								// line-height: 50upx;
								// height: 50upx;
								margin-bottom: 10upx;
								letter-spacing: 2upx;
							}
							&>view:nth-child(2) {
								margin-bottom: 10upx;
								letter-spacing: 2upx;
								text-decoration: line-through;
								color: #808080;
							}
							&>view:nth-child(3) {
								// line-height: 50upx;
								// height: 50upx;
								margin-bottom: 26upx;
								letter-spacing: 2upx;
							}

							&>view:nth-child(4) {
								// line-height: 50upx;
								// height: 50upx;
								color: #FFAA84;
								letter-spacing: 2upx;
							}
						}
					}

					.selectModels {
						margin: 0 30upx;
						margin-bottom: 230upx;

						.title {
							display: block;
							line-height: 50upx;
							height: 50upx;
							margin-bottom: 16upx;
							color: #333;
							letter-spacing: 2upx;
						}

						.choose_choose {
							width: 100%;

							&>view {
								padding: 18upx 47upx;
								margin-right: 20upx;
								border: 2upx solid #333;
								background: #fff;
							}

							.active {
								color: #fff;
								background: #000
							}
						}

						.window {
							width: 100%;
							height: 100%;

							&>input:nth-child(1) {
								width: 96.5%;
								height: 60upx;
								padding-left: 22upx;
								line-height: 60upx;
								border: 2upx solid #333;
								background: #fff;
							}

							&>view:nth-child(2) {
								height: 60upx;
								margin: 19upx 0;
								position: relative;

								&>input {
									width: 49%;
									height: 100%;
									padding-left: 22upx;
									line-height: 60upx;
									border: 2upx solid #333;
									background: #fff;
								}

								&>input:nth-child(1) {
									margin-right: 8upx;
								}

								.inputlift {
									position: absolute;
									top: 18upx;
									left: 40%;
								}

								.inputRight {
									position: absolute;
									top: 18upx;
									right: 2%;
								}
							}

							&>view:nth-child(3) {
								position: relative;

								&>input {
									width: 45.5%;
									height: 60upx;
									padding-left: 22upx;
									line-height: 60upx;
									border: 2upx solid #333;
									background: #fff;
								}

								&>text {
									position: absolute;
									top: 18upx;
									left: 40%;
								}
							}

						}

						.note {
							width: 100%;
							height: 120upx;
							border: 2upx solid rgba(51, 51, 51, 1);
							margin-top: 10upx;

							&>textarea {
								width: 100%;
								height: 120upx;
								overflow: auto;
								line-height: 1.3;
							}
						}
					}

				}

			}
		}
	}
</style>
