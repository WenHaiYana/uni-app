<template>
	<view id="theOrder">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="header flex__between__center">
			<view class="header-le flex__between__center">
				<image src="../../../static/images/fh.png" @tap="jump('/pages/ipad/mine/personal')"></image>
				<view class="tab flex__between__center">
					<view v-for="(item,index) in tab_list" :key="index" class="fw_400 fs_24x c_66 ff_cg" :class="loads.index == index?'active':''"
					 @tap="tabIndex(index)">
						{{item.title}}
					</view>
				</view>
			</view>
			<!-- <view class="header-rg flex__align">
				<text class="iconfont icon-sousuo"></text>
				<input type="text" placeholder="请输入关键词搜" placeholder-style="color:#B3B3B3"/>
			</view> -->
		</view>
		<view class="content">
			<view class="information" v-for="(item,index) in list" :key="index">
				<view>
					<view class="flex__between__center">
						<text class="c_1a fs_22x fw_400">交易单号:{{item.order_number}}</text>
						<text class="title">{{item.status_name}}</text>
					</view>
					<view class="information-conter" v-for="(item_1,$index) in item.order_product" :key="$index" @tap="jump('/pages/ipad/mall/orderDateile?id='+item.id)">
						<view class="conter flex">
							<image :src="item_1.product_cover_img"></image>
							<view>
								<view class=" ellipsis_two c_1a fs_24x ff_cg fw_400">{{item_1.product_name}}</view>
								<view class="ff_cg fs_22x c_80 fw_400" style="letter-spacing: 1px;">已选规格：{{item_1.product_sku_name}}</view>
								<view class="ff_cg fs_22x c_80 fw_400" style="letter-spacing: 1px;">
									<text>高：{{item_1.height}}米 /</text>
									<text>宽：{{item_1.width}}米 /</text>
									<text>倍数：{{item_1.times}}倍</text>
								</view>
							</view>
						</view>
						<view class="numberOf">
							<text class="c_1a fs_32x fw_600">￥{{item_1.product_price}}<text class="fs_24x fw_400 ff_cg">/米</text></text>
							<text class="fs_24x fw_400 ff_cg">数量：{{item_1.number}}米</text>
						</view>
					</view>
					<view class="choose flex__end__center">
						<view class="flex__end__center">
							<text class="ff_cg fw_400 fs_22x c_1a">共{{item.product_count}}件商品 合计：</text>
							<text class="ff_zc c_1a fs_26x fw_600">￥{{item.total_price}}</text>
						</view>
						<view class="flex__end__center">
							<text class="ff_zc c_1a fs_24x fw_400" v-if="item.status==1" @tap="cancelOrder(item.id)">取消订单</text>
							<text class="ff_zc c_ff fs_24x fw_400" style="background: #000000;" v-if="item.status==1" @tap="orderPayALL(item.id)">已支付</text>
							<text class="ff_zc c_ff fs_24x fw_400" style="background: #000000;" v-if="item.status==3" @tap="confirmGoods(item.id)">已收货</text>
							<text class="ff_zc c_1a fs_24x fw_400" v-if="item.status==5||item.status==8" @tap="deleteOrder(item.id)">删除订单</text>
							<text class="ff_zc c_ff fs_24x fw_400" style="background: #000000;" v-if="item.status==4" @tap="orderPayALL(item.id)">已收尾款</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="sotip">{{tip}}</view>
		<view class="supernatant">
			<view class="flex__center__center" @tap="goTop(e)" :hidden="go_top_hidden">
				<image src="../../../static/images/top.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loads:{
					index: 0
				},
				list: [],
				page: 0,
				tip:'暂无数据~',
				go_top_hidden: true,
				tab_list: [{
						title: '全部'
					},
					{
						title: '待支付'
					},
					{
						title: '待发货'
					},
					{
						title: '待收货'
					},
					{
						title: '待收尾款'
					},
					{
						title: '已完成'
					}
				]
			}
		},
		onShow() {
			// this.getResult(1)
			this.getList(1);
		},
		onReachBottom() {
			this.getList(0);
		},
		methods: {
			//切换
			tabIndex(index) {
				this.loads.index = index
				this.getList(1);
			},
			//
			jump(url) {
				uni.navigateTo({
					url: url
				})
			},
			goBack() {
				uni.navigateBack({
					delta: 0
				})
			},
			getList: function(page) {
				let that = this;
				if (page == 1) {
					this.page = 1;
				} else {
					this.page++;
				}
				that.tip = "加载中";
				uni.request({
					method: 'POST',
					url: 'https://sxclapp.jucheng01.net/applet.php/Mall/getMyOrderList',
					data: {
						page: this.page,
						app_code: uni.getStorageSync('app_code'),
						user_id: uni.getStorageSync('user_id'),
						index:this.loads.index
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					dataType: 'json',
					success: function(res) {
						if (res.data.data.data_list.data.length == 0) {
							that.tip = "暂无内容~";
						} else {
							that.tip = "我们是有底线的~";
						}

						if (that.page == 1) {
							that.list = res.data.data.data_list.data;
						} else {
							that.list = [...that.list, ...res.data.data.data_list.data]
						}

					},
					fail: function(res) {

					}
				})
			},
			//数据
			getResult(page) {
				this.getList({
					url: 'Mall/getMyOrderList',
					that: this,
					data: this.loads,
					loading: 1,
					page
				})
			},
			//删除订单
			deleteOrder(id) {
				const that_ = this
				uni.showModal({
					content: '确认删除该订单？',
					success(modal_res) {
						if (modal_res.confirm) {
							that_.getData({
								url: 'Mall/submitDeleteOrder',
								that: that_,
								data: {
									order_id: id
								},
								loading: 1
							}).then(res => {
								if (res.code == 1) {
									uni.showModal({
										content: res.message,
										showCancel: false,
										success(modal) {
											if (modal.confirm) {
												that_.getList(1);
											}
										}
									});
								} else {
									uni.showToast({
										title: res.message,
										icon: 'none'
									})
								}
							})
						}
					}
				})
			},
			//取消订单
			cancelOrder(id) {
				const that_ = this
				uni.showModal({
					content: '确认取消该订单？',
					success(modal_res) {
						if (modal_res.confirm) {
							that_.getData({
								url: 'Mall/cancelOrder',
								that: that_,
								data: {
									order_id: id
								},
								loading: 1
							}).then(res => {
								if (res.code == 1) {
									uni.showModal({
										content: res.message,
										showCancel: false,
										success(modal) {
											if (modal.confirm) {
												that_.getList(1);
											}
										}
									})
								} else {
									uni.showToast({
										title: res.message,
										icon: 'none'
									})
								}
							})
						}
					}
				})
			},
			//确认收货
			confirmGoods(id) {
				const that_ = this
				uni.showModal({
					content: '确认收货？',
					success(modal_res) {
						if (modal_res.confirm) {
							that_.getData({
								url: 'Mall/confirmOrder',
								that: that_,
								data: {
									order_id: id
								},
								loading: 1
							}).then(res => {
								if (res.code == 1) {
									uni.showModal({
										content: res.message,
										showCancel: false,
										success() {
											that_.getList(1);
										}
									});
								}
								uni.showModal({
									content: res.message,
									showCancel: false,
									success(modal) {
										if (modal.confirm) {
											that_.getList(1);
										}
									}
								})
							})
						}
					}
				})
			},
			//商城-已全款支付/已收尾款
			orderPayALL(id) {
				const that_ = this
				uni.showModal({
					content: '确认收货？',
					success(modal_res) {
						if (modal_res.confirm) {
							that_.getData({
								url: 'Mall/orderPayALL',
								that: that_,
								data: {
									order_id: id
								},
								loading: 1
							}).then(res => {
								if (res.code == 1) {
									uni.showModal({
										content: res.message,
										showCancel: false,
										success(modal) {
											if (modal.confirm) {
												that_.getList(1);
											}
										}
									});
								}
								uni.showModal({
									content: res.message,
									showCancel: false,
									success() {
										that_.getList(1);
									}
								});
							})
						}
					}
				})
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

		}
	}
</script>

<style lang="less" scoped>
	.sotip{
		text-align: center;
		font-size:20px;
		width:100%;
		color:#b3b3b3;
		margin-top:10px;
	}
	#theOrder {
		width: 100%;
		height: 100%;

		.header {
			width: 100%;
			height: 70px;
			background: #fff;
			// background: red;
			position: fixed;
			z-index: 10;

			.header-le {
				width: 50%;
				height: 100%;

				&>image {
					width: 30px;
					height: 25px;
					margin: 0 19px 0 10px;
				}

				.tab {
					width: 100%;
					height: 100%;

					.active {
						font-family: '中粗体';
						font-size: 15px;
						color: #1a1a1a;
						font-weight: 600;
					}
				}
			}

			.header-rg {
				width: 30%;
				margin-right: 10px;
				height: 30px;
				border: 1px solid rgba(26, 26, 26, 1);

				&>text {
					padding: 0 5px;
				}

				&>input {
					width: 100%;
					height: 30px;
				}
			}
		}

		.content {
			width: 100%;
			height: 100%;
			padding-top: 70px;

			.information {
				margin: 0 30px 13px 30px;
				border: 1px solid rgba(128, 128, 128, 1);

				&>view {
					margin: 0 15px 16px 15px;

					&>view:nth-child(1) {
						height: 18px;
						margin-top: 15px;

						.title {
							color: #1a1a1a;
							font-size: 13px;
							font-family: '中黑体';
							font-weight: 500;
						}
					}

					.information-conter {
						margin-bottom: 16px;

						.conter {
							height: 75px;
							width: 100%;
							margin: 17px 0 12px 0;

							&>image {
								width: 100px;
								height: 75px;
								margin-right: 15px;
							}

							&>view {
								line-height: 1;

								&>view:nth-child(1) {
									width: 201px;
									line-height: 1.5;
									margin-bottom: 11px;
								}

								&>view:nth-child(2) {
									height: 17px;
									line-height: 17px;

								}

								&>view:nth-child(3) {
									height: 17px;
									line-height: 17px;
								}
							}
						}

						.numberOf {
							&>text:nth-child(2) {
								margin-left: 30px;
								color: #FFA365;
								letter-spacing: 1px;
							}
						}

					}

					.choose {
						width: 100%;
						height: 100%;

						&>view:nth-child(1) {
							height: 19px;
							margin-bottom: 7px;

							&>text:nth-child(2) {
								margin-right: 12px;
							}
						}

						&>view:nth-child(2) {
							margin-left: 12px;
							height: 30px;

							&>text {
								display: block;
								border: 1px solid rgba(26, 26, 26, 1);
								width: 90px;
								height: 30px;
								line-height: 30px;
								text-align: center;
								background: #fff;
							}

							&>text:nth-child(2) {
								margin-left: 10px;
							}
						}
					}
				}
			}
		}

		//置顶
		.supernatant {
			position: fixed;
			bottom: 67px;
			right: 20px;
			// height: 180upx;
			width: 40px;
			z-index: 10;

			&>view:nth-child(1) {
				width: 40px;
				height: 40px;
				background: #fff;
				// margin-bottom: 20upx;
				box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.15);

				&>image {
					width: 20px;
					height: 20px;
				}
			}
		}
	}
</style>
