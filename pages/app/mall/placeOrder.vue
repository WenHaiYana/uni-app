<template>
	<view id="placeOrder">
		<view class="content">
			<view v-for="(item,index) in cart_product" :key="index" @tap="jump(item)">
				<view class="flex__between">
					<image :src="item.cover_img"></image>
					<view class="title-left">
						<view class="ellipsis_two c_1a fw_400 fs_24 ff_cg">{{item.name}}</view>
						<view class="ff_cg fs_22 c_80 fw_400" style="letter-spacing: 2upx;">已选规格：{{item.product_sku_name}}</view>
						<view class="ff_cg fs_22 c_80 fw_400" style="letter-spacing: 2upx;">
							<text>高：{{item.height}}米 /</text>
							<text>宽：{{item.width}}米 /</text>
							<text>倍数：{{item.times}}倍</text>
						</view>
					</view>
				</view>
				<view class="numberOf">
					<text class="c_1a fs_32 fw_600">￥{{item.price}}<text class="fs24 fw_400 ff_cg">/米</text></text>
					<text class="fs_24 fw_400 ff_cg">数量：{{item.number}}</text>
				</view>
			</view>
		</view>
		<view class="fs_32 c_1a lh_2">请添加安装地址</view>
		<view class="address lh_1" @tap="addres">
			<view class="fs_32 c_1a">
				<text style="margin-right: 30upx;">{{linkman}}</text>
				<text>{{mobile_phone}}</text>
			</view>
			<view class="fs_26 c_4d ff_cg fw_400">{{address}}</view>
		</view>
		<view class="goodsInformation">
			<view>
				<text class="fs_26 ff_cg fw_400 c_80">商品合计</text>
				<text class="fs_34 ff_zc fw_600 c_1a">￥{{goods_amount}}</text>
			</view>
			<!-- <view v-if="prefer_rate!=10">
				<text class="fs_26 ff_cg fw_400 c_80">享受优惠</text>
				<text class="fw_800 fs_28" style="color: #FF866E;font-family: 'Avenir Heavy';">{{prefer_rate}}折优惠</text>
			</view> -->
			<view class="title" @tap="type()">
				<text class="fs_26 ff_cg fw_400 c_80" v-if="num==0">其他</text>
				<text class="fs_26 ff_cg fw_400 c_80" v-else>其他优惠</text>
				<text class="fs_26 fw_500 c_1a" style="font-family:'中黑体' ;">{{num}}<text v-if="num">元</text></text>
			</view>
			<view class="title">
				<view class="fs_26 ff_cg fw_400 c_80">支付方式</view>
				<view class="fs_26 fw_500 c_1a flex__align" style="font-family:'中黑体' ;">
					<picker @change="bindPickerChange" :value="i" :range="pay_way" range-key="name">
						<view>{{pay_way[i].name}}</view>
					</picker>
					<image src="../../../static/images/bh@2x.png"></image>
				</view>
			</view>
			<view class="title flex">
				<text class="fs_26 ff_cg fw_400 c_80" style="width: 20%;">备注</text>
				<view class="fw_400 fs_26 ff_cg c_1a ellipsis_one titleChooe">
					<input type="text" v-model="orders.chooseNode" />
					<!-- <text class="fw_400 fs_26 ff_cg c_1a ellipsis_one" style="width: 100%;"></text> -->
				</view>
			</view>
		</view>
		<view class="footer flex__between">
			<view class="flex__align">
				<text class="fs_26 ff_cg fw_400 c_a1">实付</text>
				<text class="fs_32 fw_600 c_a1" style="font-family: '中粗体';" v-if="num==0">￥{{realPay}}</text>
				<text class="fs_32 fw_600 c_a1" style="font-family: '中粗体';" v-else>￥{{realPay_1}}</text>
			</view>
			<view class="flex__center__center fs_30 ff_cg fw_400 c_ff" @tap="payment(i)">去付款</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				product_id: '', //订单
				i: 0,
				cart_product: [],
				num: '',
				count: 0,
				numHeight: '',
				dataCart: [], //提交数据
				realPay: 0, //实际支付
				realPay_1: 0, //实际支付
				pay_way: [], //支付方式
				goods_amount: '', //总价
				prefer_rate: '', //折扣
				settlement_type: '',
				linkman: '', //联系人（必填）
				mobile_phone: '', //联系电话（必填）
				address: '', //详细地址（必填）
				orders: {
					settlement_type: '', //结算方式（必填 1：购物车结算 2：立即购买）
					window_type: '', //窗号（当 settlement_type = 2必填）
					product_id: '', //立即购买商品ID（当 settlement_type = 2 时 必填）
					sku: '', //立即购买商品SKU编码（当 settlement_type = 2 且商品你开启规格时 必填）
					height: '', //高度（当 settlement_type = 2必填）
					width: '', //宽度（当 settlement_type = 2必填）
					times: '', //倍数（当 settlement_type = 2必填）
					install_type: '', //安装方式（当 settlement_type = 2必填）
					install_style: '', //安装结构（当 settlement_type = 2必填）
					number: '', //立即购买商品数量（当 settlement_type = 2 时 必填）
					plane: '', //窗头（选填）
					craft:'',//工艺（选填)
					chooseNode: '', //配送方式
					
				}
			}
		},
		onLoad(options) {
			const that = this
			that.linkman = '',
			that.address = '',
			that.mobile_phone = '',
			uni.removeStorage({
				key: 'num1',
				success: function(res) {
					that.num = 0
				}
			});
			that.orders.settlement_type = options.settlement_type;
			that.orders.window_type = options.window_type
			that.orders.product_id = options.product_id
			that.orders.sku = options.sku
			that.orders.height = options.height
			that.orders.width = options.width
			that.orders.times = options.times
			that.orders.install_type = options.install_type
			that.orders.install_style = options.install_style
			that.orders.number = options.number
			that.orders.plane = options.plane
			that.orders.craft = options.craft
			that.num = options.num || this.num
			this.getResult()

		},
		onShow() {
			const that = this
			uni.getStorage({
				key: 'num1',
				success: function(e) {
					that.num = e.data
				}
			});
			uni.getStorage({
				key: 'name',
				success: function(e) {
					that.linkman = e.data
				}
			});
			uni.getStorage({
				key: 'phone',
				success: function(e) {
					that.mobile_phone = e.data
				}
			});
			uni.getStorage({
				key: 'address',
				success: function(e) {
					that.address = e.data
				}
			});
			that.getResultPay()
		},

		methods: {
			//跳转
			jump(item) {
				// this.product_id = item.product_id
				uni.navigateTo({
					url: '/pages/app/mall/detail?id=' + item.product_id
				})
			},
			//地址
			addres() {
				uni.navigateTo({
					url: '/pages/app/address/index'
				})
			},
			//其他
			type() {
				uni.navigateTo({
					url: '/pages/app/account/preferential'
				})
			},
			//价钱
			getResultPay(){
				const that = this
				app.$vm.getData({
					url: 'Mall/getOrderReady',
					that: this,
					data: this.orders,
					loading: 1
				}).then(res => {
					if (res.code == 1) {
						var realPay_1 = parseFloat( res.data.goods_amount - Number(that.num)).toFixed(2)
						var realPay = parseFloat(res.data.goods_amount).toFixed(2)
						if (realPay_1 < 0 || realPay < 0) {
							that.realPay_1 = 0
							that.realPay = 0
						} else {
							that.realPay_1 = realPay_1
							that.realPay = realPay
						}
					}
				})
			},
			//数据
			getResult() {
				const that = this
				app.$vm.getData({
					url: 'Mall/getOrderReady',
					that: this,
					data: this.orders,
					loading: 1
				}).then(res => {
					if (res.code == 1) {
						that.linkman = res.data.address.user_name
						that.mobile_phone = res.data.address.mobile_phone
						that.address = res.data.address.address
						that.prefer_rate = res.data.prefer_rate
						that.goods_amount = res.data.goods_amount
						that.cart_product = res.data.cart_product
						that.pay_way = res.data.pay_way
					}
					var list = []
					for (var i = 0; i < res.data.cart_product.length; i++) {
						var num = res.data.cart_product[i]
						that.numHeight = num.height
					}
				})
			},
			
			bindPickerChange(e) {
				let index = e.detail.value
				this.i = e.target.value
			},
			//支付
			payment(i) {
				const that = this
				var navData = JSON.stringify(that.cart_product); // 这里转换成 字符串
				var a = encodeURIComponent(navData)
				that.count++
				if (that.orders.settlement_type == 1) {
					// console.log("我是购物车", 1)
					app.$vm.getData({
						url: 'Mall/submitOrder',
						that: this,
						data: {
							pay_way: this.pay_way[i].id,
							linkman: this.linkman,
							mobile_phone: this.mobile_phone,
							address: this.address,
							settlement_type: this.orders.settlement_type,
							prefer_rate: this.prefer_rate,
							other_money: this.num,
							remark: this.orders.chooseNode,
							craft:this.orders.craft,
							plane:this.orders.plane,
						}
					}).then(res => {
						if (res.code == 1) {
							// console.log(res.data)
							uni.setStorageSync('wechat_code', res.data.wechat_code);
							uni.setStorageSync('alipay_code', res.data.alipay_code);

							if (that.pay_way[i].id == 3) {
								// console.log("我是线下支付", 1)
								uni.showModal({
									content: res.message,
									showCancel: false,
									success(modal_res) {
										if (modal_res.confirm) {
											uni.navigateTo({
												url: '/pages/app/account/modifyPay?id='+res.data.order_id
											})
										}
									}
								});
							} else if (that.pay_way[i].id == 1 || that.pay_way[i].id == 2) {
								// console.log(that.numHeight,'我是购物车')
								// console.log("我是购物车", 2)
								if (that.numHeight > 2.75 && that.count == 1) {
									// console.log("我是购物车", 3)
									uni.navigateTo({
										url: '/pages/app/account/supernatant?id=' + res.data.order_id+'&static=1'
									})
								} else {
									uni.showModal({
										content: res.message,
										showCancel: false,
										success(modal_res) {
											if (modal_res.confirm) {
												uni.navigateTo({
													url: '/pages/app/account/shopCollection?id=' + res.data.order_id
												})
											}
										}
									});
								}
							}
						}
					})
				}
				if (that.orders.settlement_type == 2) {
					console.log("我是立即购买", 1)
					if (that.linkman == '') {
						uni.showToast({
							title: "请填写收货人",
							icon: 'none'
						})
						return false
					}
					if (that.mobile_phone == '') {
						uni.showToast({
							title: "收货人手机号为空",
							icon: 'none'
						})
						return false
					}
					if (that.address == '') {
						uni.showToast({
							title: "收货人地址不能为空",
							icon: 'none'
						})
						return false
					}
					app.$vm.getData({
						url: 'Mall/submitOrder',
						that: this,
						data: {
							product_id: that.orders.product_id,
							number: that.orders.number,
							sku: that.orders.sku,
							pay_way: that.pay_way[i].id,
							prefer_rate: that.prefer_rate,
							other_money: that.num,
							window_type: that.orders.window_type,
							height: that.orders.height,
							width: that.orders.width,
							times: that.orders.times,
							install_type: that.orders.install_type,
							install_style: that.orders.install_style,
							plane: that.orders.plane,
							craft:that.orders.craft,
							remark: that.orders.chooseNode,
							pay_way: that.pay_way[i].id,
							linkman: that.linkman,
							mobile_phone: that.mobile_phone,
							address: that.address,
							settlement_type: that.orders.settlement_type,
						}
					}).then(res => {
						if (res.code == 1) {
							uni.setStorageSync('wechat_code', res.data.wechat_code);
							uni.setStorageSync('alipay_code', res.data.alipay_code);

							// console.log(res.data)
							if (that.pay_way[i].id == 3) {
								uni.showModal({
									content: res.message,
									showCancel: false,
									success(modal_res) {
										if (modal_res.confirm) {
											uni.navigateTo({
												url: '/pages/app/account/modifyPay?id='+res.data.order_id
											})
										}
									}
								});
							} else if (that.pay_way[i].id == 1 || that.pay_way[i].id == 2) {
								// console.log(that.numHeight,'立即购买')
								if (that.numHeight > 2.75 && that.count == 1) {
									uni.navigateTo({
										url: '/pages/app/account/supernatant?cart_product=' + a + '&id=' + res.data.order_id+'&static=2'
									})
								} else {
									uni.showModal({
										content: res.message,
										showCancel: false,
										success(modal_res) {
											if (modal_res.confirm) {
												uni.navigateTo({
													url: '/pages/app/account/shopCollection?id=' + res.data.order_id
												})
											}
										}
									});
								}

							}
						} else {
							uni.showModal({
								content: res.message,
								showCancel: false,
							});
						}
					})
				}

			},
		}
	}
</script>

<style>
	page {
		background: #fff;
	}
</style>
<style lang="less" scoped>
	#placeOrder {
		width: 100%;
		height: 100%;

		//下单商品信息
		.content {
			width: 100%;
			height: 100%;

			&>view {
				margin: 0 27upx 0 33upx;
				height: 269upx;
				border-bottom: 1upx solid #CBCBCB;

				&>view:nth-child(1) {
					margin: 34upx 0 24upx 0;

					&>image {
						width: 200upx;
						height: 150upx;
						margin-right: 29upx;
					}

					.title-left {
						line-height: 1;
						letter-spacing: 2upx;

						&>view:nth-child(1) {
							width: 470upx;
							line-height: 1.3;
							margin-bottom: 8upx;
						}

						&>view:nth-child(2) {
							line-height: 35upx;
							height: 35upx;
							margin-bottom: 8upx;
						}

						&>view:nth-child(3) {
							line-height: 35upx;
							height: 35upx;
						}
					}
				}
			}

			.numberOf {
				&>text:nth-child(2) {
					margin-left: 60upx;
					color: #FFA365;
					letter-spacing: 1upx;
				}
			}
		}

		.lh_2 {
			margin: 0 27upx 0 33upx;
		}

		.address {
			margin: 0 27upx 0 33upx;
			height: 100%;
			border-bottom: 1upx solid #CBCBCB;

			&>view:nth-child(1) {
				font-family: "Avenir Book";
				height: 46upx;
				line-height: 46upx;
				margin: 29upx 0 4upx 0;
			}

			&>view:nth-child(2) {
				height: 37upx;
				line-height: 37upx;
				margin-bottom: 33upx;
			}
		}

		.goodsInformation {
			margin: 0 27upx 98upx 33upx;
			height: 100%;

			&>view {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			&>view:nth-child(1) {
				height: 48upx;
				margin: 38upx 0 36upx 0;
			}

			&>view:nth-child(2) {
				height: 40upx;
				margin-bottom: 42upx;
			}

			.title {
				height: 37upx;
				margin-bottom: 42upx;

				&>view:nth-child(2) {
					&>image {
						width: 22upx;
						height: 22upx;
						margin-left: 5upx;
						margin-top: 4upx;
					}
				}

				.titleChooe {
					width: 100%;

					&>input {
						width: 100%;

						text-align: right;
					}
				}
			}
		}

		.footer {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 98upx;
			letter-spacing: 1upx;

			&>view:nth-child(1) {
				width: 67%;
				height: 100%;
				background: #F5F5F5;

				&>text:nth-child(1) {
					margin: 0 2upx 0 30upx;
				}
			}

			&>view:nth-child(2) {
				width: 33%;
				height: 100%;
				background: #1A1A1A;
				border: 2upx solid #1A1A1A;
			}
		}
	}
</style>
