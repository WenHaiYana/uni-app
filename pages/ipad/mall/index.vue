<template>
	<view id="home">
		<view class="header flex__between__center">
			<view class="headerLeft flex__between__center">
				<view :class="loads.index==index?'c_03 ff_zh fw_400 fs_40x':''" v-for="(item,index) in nav_list" :key="index" @tap="jump(item.path)" @click="tabIndex(index)" class="fs_30x ff_zh fw_400 c_03">{{item.title}}</view>
			</view>
			<view class="headerCorter flex__center__center">
				<image src="../../../static/images/homeLogo.png"></image>
			</view>
			<view class="headerRight flex__end__center">
				<view class="flex__between__center" @tap="jump('/pages/ipad/mall/search')">
					<view class="uni-icon uni-icon-search" style="padding: 0 2px;font-size: 14px;"></view>
					<input type="search" placeholder="请输入关键词搜索" placeholder-style="color:#B3B3B3" disabled="true"/>
				</view>
				<view>
					<view class="uni-icon uni-icon-scan fs_40" @tap="sao()"></view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="banderBox">
				<swiper indicator-dots="true" autoplay="true" circular="true" indicator-active-color="#ffffff" style="height: 100%;">
					<swiper-item v-for="(item,index) in honeData.carousel" :key="index" style="height: 100%;">
						<image :src="item.image" @click="link(item.link_url)" class="banderBox-image"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="banderSmall flex">
				<swiper indicator-dots="true" indicator-active-color="#2e2e2e" style="width: 100%;height: 100%;">
					<swiper-item class="flex swiperItem">
						<view class="lh_1">
							<view @tap="jump('/pages/ipad/account/customization')">
								<image src="../../../static/images/dz.png"></image>
							</view>
							<text class="ff_cg fs_32x fw_400 c_4d">定制效果</text>
						</view>
						<view class="lh_1" @tap="jump('/pages/ipad/mall/personality?index=1')">
							<view>
								<image src="../../../static/images/list_2.png"></image>
							</view>
							<text class="ff_cg fs_32x fw_400 c_4d">DIY窗帘</text>
						</view>	
						<view class="lh_1" v-for="(item,index) in honeData.first" :key="index" @tap="goList(item.id)">
							<view>
								<image :src="item.cover_img"></image>
							</view>
							<text class="ff_cg fs_32x fw_400 c_4d">{{item.name}}</text>
						</view>	
					</swiper-item>
					<swiper-item class="flex__align swiperItem" v-for="(item,index) in honeData.category" :key="index">
						<view class="lh_1" v-for="(item1,$index) in item" :key="$index" @tap="goList(item1.id)">
							<view>
								<image :src="item1.cover_img"></image>
							</view>
							<text class="ff_cg fs_32x fw_400 c_4d">{{item1.name}}</text>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="advertisingImg">
				<view v-for="(item,index) in honeData.ad_position_two" :key="index" @tap="getDetails(item.link_url)">
					<image :src="item.image"></image>
				</view>
			</view>
			<view class="featured">
				<view class="fs_60x ff_cg fw_500 c_1a">精品商品</view>
				<view class="featured-img flex wrap">
					<view v-for="(item,index) in list" :key="index" @tap="jump('/pages/ipad/mall/detaile?id='+item.id)">
						<image :src="item.cover_img"></image>
						<view class="fs_30x ff_cg fw_400 c_1a ellipsis_two">{{item.name}}</view>
						<view>
							<text class="ff_zc fw_600 fs_40x c_1a">￥{{item.price}}</text>
							<text class="fs_40x ff_cg fw_400 c_1a" style="margin-right:20px ;">/米</text>
							<text class="fs_24x ff_cg fw_400 c_80"><text style="margin-right: 10upx;">已售</text>{{item.sales}}</text>
						</view> 
					</view>
				</view>
			</view>
			<view class='sotip'>{{tip}}</view>
			<!-- <uni-load-more :status="load_status"></uni-load-more> -->
		</view>
	</view>
</template>

<script>
	import {uniLoadMore} from '@dcloudio/uni-ui'
	// const app = getApp()
	export default{
		components: {uniLoadMore},
		data(){
			return{
				loads:{
					index: 0
				},
				honeData:[],//
				list:[],
				page:1,
				load_status: 'more',
				nav_list:[
					{
						title:'首页',
						path:'/pages/ipad/mall/index'
					},
					{
						title:'产品',
						path:'/pages/ipad/mall/sort'
					},
					{
						title:'购物车',
						path:'/pages/ipad/mall/cart'
					},
					{
						title:'我的',
						path:'/pages/ipad/mine/personal'
					},
				],
				page:0,
				tip:'暂时无内容~'
			}
		},
		onShow() {
			var user_id= uni.getStorageSync('user_id');
			if(user_id==''){
				uni.navigateTo({
					url:'/pages/ipad/mine/login'
				})
			}
			this.getResult()
			// this.loadList(1);
			this.getList(1);
		},
		onReachBottom(){
			// this.loadList(2);
			// console.log(1)
			this.getList(0);
		},
		methods:{
			//扫一扫
			sao(){
				const that = this
				uni.scanCode({
					success: function (res){
						uni.navigateTo({
							url:'/pages/ipad/mall/detaile?id='+res.result
						})
					}
				});
			},
			//跳列表
			goList(id){
				uni.navigateTo({
					url:'/pages/ipad/mall/list?id='+id+'&second_category_id=0'
				})
			},
			getList:function(page){
				let that=this;
				if(page==1){
					this.page=1;
				}else{
					this.page++;
				}
				that.tip="加载中";
				uni.request({
				  method: 'POST',
				  url: 'https://sxclapp.jucheng01.net/applet.php/Mall/getIndexList',
				  data:{
					  page:this.page,
					  app_code:uni.getStorageSync('app_code'),
					  user_id:uni.getStorageSync('user_id')
				  },
				  header: {
					'content-type': 'application/x-www-form-urlencoded'
				  },
				  dataType: 'json',
				  success: function(res) {
					  if(res.data.data.data_list.data.length==0){
						  that.tip="暂无内容~";
					  }else{
						  that.tip="我们是有底线的~";
					  }
  
					  if(that.page==1){
						  that.list=res.data.data.data_list.data;
					  }else{
						  that.list=[...that.list,...res.data.data.data_list.data]
					  }
					
				  },
				  fail: function(res) {
					
				  }
				})
			},
			//切换与跳转
			jump(url){
				uni.redirectTo({
					url:url
				})
			},
			//
			tabIndex(index){
				this.loads.index = index
			},
			//数据
			getResult(){
				this.getData_({
					url:'Mall/getipadIndexData',
					that: this,
					data: {},
					loading: 1
				}).then(res=>{
					if(res.code == 1){
						this.honeData=res.data;
					}
					
					// console.log(this.honeData)
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
			// // 加载商品
			// loadList(page){
			// 	this.load_status='loading';
			// 	app.$vm.getList({
			// 		url:'Mall/getIndexList',
			// 		that: this,
			// 		data: {},
			// 		loading: 1,
			// 		page:1
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
	.sotip{
		width:100%;
		font-size:20px;
		color:#808080;
		text-align: center;
		margin-top: 0px;
	}
	#home{
		width:100%;
		height: 100%;
		.header{
			width: 100%;
			height: 70px;
			position: fixed;
			z-index: 5;
			background: #fff;
			.headerLeft{
				// padding-top: 50upx;
				margin-left: 10px;
				width:33%;
				height: 100%;
			}
			.headerCorter{
				// padding-top: 50upx;
				width:33%;
				height: 100%;
				&>image{
					width:103px;
					height: 19px;
				}
			}
			.headerRight{
				// padding-top: 50upx;
				width:33%;
				height: 100%;
				&>view:nth-child(1){
					border:1px solid #1A1A1A;
					width:250px;
					height: 20px;
					margin-right: 12px;
					&>input{
						width:100%;
						height: 100%;
						font-size: 11px;
					}
				}
				&>view:nth-child(2){
					margin-right: 10px;
				}
			}
		}
		.content{
			width: 100%;
			height: 100%;
			padding-top: 62px;
			.banderBox{
				width:100%;
				height: 450px;
				.banderBox-image{
					width:100%;
					height:100%;
				}
			}
			.banderSmall{
				margin: 41px 31px 29px 31px;
				height:170px;
				.swiperItem{
					width: 100%;
					&>view{
						width:17%;
						text-align: center;
						height: 100%;
						&>view{
							width: 100%;
							display: flex;
							align-items: center;
							justify-content: center;
							&>image{
								display: block;
								width: 90px;
								height: 90px;
								border-radius: 50%;
								margin-bottom: 14px;
							}
						}
						&>text{
							display: block;
						}
					}
				}
			}
			//广告
			.advertisingImg{
				margin: 0 31px;
				height: 100%;
				&>view{
					width:100%;
					height: 400px;
					margin-bottom: 10px;
					background:rgba(0,0,0,0.7);
					z-index: 1;
					&>image{
						width:100%;
						height: 100%;
					}
				}
			}
			.featured{
				margin:30px 0;
				width: 100%;
				height: 100%;
				line-height: 1;
				&>view:nth-child(1){
					height: 21px;
					line-height: 21px;
					text-align: center;
					margin-bottom: 23px;
				}
				.featured-img{
					margin-left:20px;
					height: 100%;
					&>view{
						// box-shadow: 0 0 4upx #1A1A1A;
						width:30%;
						height: 100%;
						margin-bottom: 9px;
						line-height: 1;
						margin-right:22px; 
						&>image{
							width: 100%;
							height: 200px;
							margin-bottom: 15px;
						}
						&>view:nth-child(2){
							width:100%;
							line-height: 1.5;
							letter-spacing: 1px;
							margin-bottom: 8px;
						}
						&>view:nth-child(3){
							width:100%;
							height: 19px;
							line-height: 19px;
							margin-bottom: 18px;
						}
					}
				}
			}	
		}
	}
</style>
