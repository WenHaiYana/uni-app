<template>
	<view id="home">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="header flex__between__center">
			<image :src="honeData.logo"></image>
			<view class="flex__between__center fs_22" @tap="jump('/pages/app/mall/search?id='+id)">
				<view class=" fs_28 c_b3 uni-icon uni-icon-search" style="margin-top: 6upx;padding: 0 22upx;"></view>
				<input class="fs_28 c_b3" type="search" placeholder="请输入关键词搜索" placeholder-style="color:#B3B3B3" style="background: #fff;"
				 disabled="true" />
			</view>
			<view>
				<view class="uni-icon uni-icon-scan fontSize" @tap="sao()"></view>
			</view>
		</view>
		<view class="content">
			<view class="banderBox">
				<swiper indicator-dots="true" autoplay="true" circular="true" indicator-active-color="#ffffff" style="height: 100%;">
					<swiper-item v-for="(item,index) in honeData.carousel" :key="index" style="height: 100%;">
						<image :src="item.image" @tap="getDetails(item.link_url)" class="banderBox-image"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="banderSmall flex__between__center">
				<swiper indicator-dots="true" indicator-active-color="#2e2e2e" style="width: 100%;height: 100%;">
					<swiper-item class="flex swiperItem">
						<!-- <view class="lh_1" @tap="jump('/pages/app/account/customization?index_=0')"> -->
						<view class="lh_1" @click="toWebView()">
							<view class="flex__center__center">
								<image src="../../../static/images/dz.png"></image>
							</view>
							<text>定制效果</text>
						</view>
						<view class="lh_1" @tap="jump('/pages/app/mall/personality')">
							<view class="flex__center__center">
								<image src="../../../static/images/list_2.png"></image>
							</view>
							<text>DIY窗帘</text>
						</view>
						<view class="lh_1" v-for="(item,index) in honeData.first" :key="index" @tap="goList(item.id)">
							<view class="flex__center__center">
								<image :src="item.cover_img"></image>
							</view>
							<text>{{item.name}}</text>
						</view>
					</swiper-item>
					<swiper-item class="flex swiperItem" v-for="(item,index) in honeData.category" :key="index">
						<view class="lh_1" v-for="(item1,$index) in item" :key="$index" @tap="goList(item1.id)">
							<view class="flex__center__center">
								<image :src="item1.cover_img"></image>
							</view>
							<text>{{item1.name}}</text>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<!-- 广告图 -->
			<view class="advertisingImg" v-if="honeData.ad_position_two.length">
				<view v-for="(item,index) in honeData.ad_position_two" :key="index" @tap="getDetails(item.link_url)">
					<image :src="item.image"></image>
				</view>
			</view>
			<view class="selectGoods">
				<view class="fs_40 flex__center__center">精选商品</view>
				<view class="flex__between__center wrap">
					<view v-for="(item,index) in list" :key="index" class="lh_1" @tap="jump('/pages/app/mall/detail?id='+item.id)">
						<image :src="item.cover_img"></image>
						<view class="ellipsis_one">{{item.name}}</view>
						<view>
							<text>
								<text class="fw_b">￥{{item.price}}</text>
								<text class="fw_400">/米</text>
							</text>
							<text class="fs_24">已售{{item.sales}}</text>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="load_status"></uni-load-more>
		</view>
	</view>
</template>
<script>
	import {
		uniLoadMore
	} from '@dcloudio/uni-ui'
	const app = getApp();
	export default {
		data() {
			return {
				honeData: [], //
				list: [],
				page: 1,
				load_status: 'more',
				id: '',
			}
		},
		components: {
			uniLoadMore
		},
		onShow() {
			var user_id = uni.getStorageSync('user_id');
			if (user_id == '') {
				uni.navigateTo({
					url: '/pages/app/mine/login'
				})
			}
			this.getResult()
			this.loadList(1);
		},
		onReachBottom() {
			this.loadList(2);
		},
		methods: {
			toWebView() {
				uni.navigateTo({
					url: '../../webView?index=1'
				})
			},
			//扫一扫
			sao() {
				const that = this
				uni.scanCode({
					success: function(res) {
						uni.navigateTo({
							url: '/pages/app/mall/detail?id=' + res.result
						})
					}
				});
			},
			//数据
			getResult() {
				app.$vm.getData({
					url: 'Mall/getIndexData',
					that: this,
					data: {},
					loading: 1,
				}).then(res => {
					if (res.code == 1) {
						// console.log(res)
						this.honeData = res.data;
						// console.log(this.honeData.category)
					}

				});
			},
			//广告位跳转
			getDetails(url) {
				if (url.indexOf("http") != -1) {
					uni.navigateTo({
						'url': '/pages/app/webView?url=' + url
					})
				} else {
					uni.navigateTo({
						'url': url
					})
				}
			},
			goList(id) {
				this.id = id
				uni.navigateTo({
					url: '/pages/app/mall/list?id=' + id + '&second_category_id=0'
				})
			},
			jump(url) {
				uni.navigateTo({
					url: url
				})
			},
			// // 加载商品
			loadList: function(page) {
				let that = this;
				if (page == 1) {
					this.page = 1;
				} else {
					this.page++;
				}
				that.tip = "加载中";
				uni.request({
					method: 'POST',
					url: 'https://sxclapp.jucheng01.net/applet.php/Mall/getIndexList',
					data: {
						page: this.page,
						app_code: uni.getStorageSync('app_code'),
						user_id: uni.getStorageSync('user_id')
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
			// loadList(page){
			// 	this.load_status='loading';
			// 	app.$vm.getList({
			// 		url:'Mall/getIndexList',
			// 		that: this,
			// 		data: {},
			// 		loading: 1,
			// 		page
			// 	}).then(res=>{
			// 		if(res.code==1){
			// 			this.load_status='noMore';
			// 		}
			// 	});
			// }
		}
	}
</script>

<style lang="less" scoped>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #fff;
	}

	.top_view {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		background-color: #fff;
		top: 0;
		z-index: 999;
	}

	#home {
		width: 100%;
		height: 100%;

		.header {
			width: 100%;
			position: fixed;
			z-index: 10;
			height: 98upx;
			background: #fff;

			&>image {
				display: block;
				height: 57upx;
				width: 22%;
				margin-left: 21upx;
			}

			&>view:nth-child(2) {
				height: 57upx;
				width: 56%;
				border: 2upx solid #1A1A1A;

				&>input {
					width: 100%;
					height: 100%;
				}
			}

			&>view:nth-child(3) {
				margin-right: 32upx;
			}
		}

		.content {
			width: 100%;
			height: auto;
			padding-top: 88upx;
			background: #fff;

			.banderBox {
				height: 330upx;

				.banderBox-image {
					width: 100%;
					height: 330upx;
				}
			}

			.banderSmall {
				margin: 39upx 40upx 0 40upx;
				height: 200upx;
				margin-bottom: 40upx;

				.swiperItem {
					width: 100%;
					height: 100%;

					&>view {
						width: 20%;
						// margin-right: 55upx;
						text-align: center;

						&>view {
							width: 100%;

							&>image {
								display: block;
								width: 90upx;
								height: 90upx;
								border-radius: 50%;
								margin-bottom: 13upx;
							}
						}

						&>text {
							width: 100%;
							display: block;
							font-size: 24upx;
							color: #4d4d4d;
							font-weight: 400;
							font-family: "常规体";
							margin-bottom: 34upx;
						}
					}
				}
			}

			.advertisingImg {
				margin: 0 30upx;
				height: 100%;
				margin-bottom: 54upx;

				&>view {
					width: 100%;
					height: 250upx;
					background: rgba(0, 0, 0, 0.59);
					z-index: 1;
					margin-bottom: 30upx;

					&>image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.selectGoods {
				width: 100%;
				height: 100%;

				&>view:nth-child(1) {
					letter-spacing: 8upx;
					color: #1A1A1A;
					font-weight: 500;
					font-family: "中黑体";
					margin-bottom: 29upx;
				}

				&>view:nth-child(2) {
					margin: 0 30upx;
					height: 100%;

					&>view {
						width: 49.3%;
						height: 100%;

						&>image {
							width: 100%;
							height: 340upx;
							display: block;
							margin-bottom: 22upx;
						}

						&>view:nth-of-type(1) {
							height: 40upx;
							line-height: 40upx;
							text-align: left;
							margin-bottom: 9upx;
							font-family: "常规体";
						}

						&>view:nth-of-type(2) {
							height: 46upx;
							line-height: 46upx;
							text-align: left;
							margin-bottom: 42upx;

							&>text:nth-child(1) {
								color: #1A1A1A;

								&>text:nth-child(1) {
									font-family: "中粗体";
								}

								&>text:nth-child(2) {
									font-family: "常规体";
								}
							}

							&>text:nth-child(2) {
								font-family: "常规体";
								color: #808080;
							}
						}
					}
				}
			}
		}
	}
</style>
