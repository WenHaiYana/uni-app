<template>
	<view id="myOrder">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="header flex__between__center">
			<view class="flex__align" @tap="goBack()">
				<image src="../../../static/images/fh.png"></image>
				<text>订单</text>
			</view>
			<!-- <view class="flex__align">
				<text class="iconfont icon-sousuo"></text>
				<input type="text" placeholder="请输入关键词搜" placeholder-style="color:#B3B3B3"/>
			</view> -->
		</view>
		<view class="content">
			<view class="tab flex__between__center">
				<view v-for="(item,index) in tab_list" :key="index" class="fw_400 fs_24 c_66 ff_cg" :class="loads.index == index?'active':''" @tap="tabIndex(index)">
					{{item.title}}
				</view>
			</view>
			<view class="information" v-for="(item,index) in list" :key="index">
				<view>
					<view class="flex__between__center">
						<text class="c_1a fs_22 fw_400">交易单号:{{item.order_number}}</text>
						<text>{{item.status_name}}</text>
					</view>
					<view class="information-conter" v-for="(item_1,$index) in item.order_product" :key="$index" @tap="jump('/pages/app/mall/orderDataile?id='+item.id)">
						<view class="conter flex">
							<image :src="item_1.product_cover_img"></image>
							<view>
								<view class=" ellipsis_two c_1a fs_24 ff_cg fw_400">{{item_1.product_name}}</view>
								<view class="ff_cg fs_22 c_80 fw_400" style="letter-spacing: 2upx;">已选规格：{{item_1.product_sku_name}}</view>
								<view class="ff_cg fs_22 c_80 fw_400" style="letter-spacing: 2upx;">
									<text>高：{{item_1.height}}米 /</text>
									<text>宽：{{item_1.width}}米 /</text>
									<text>倍数：{{item_1.times}}倍</text>
								</view>
							</view>
						</view>
						<view class="numberOf">
							<text class="c_1a fs_32 fw_600">￥{{item_1.product_price}}<text class="fs24 fw_400 ff_cg">/米</text></text>
							<text class="fs_24 fw_400 ff_cg">数量：{{item_1.number}}米</text>
						</view>
					</view>
					<view class="choose">
						<view class="flex__end__center">
							<view>
								<text class="ff_cg fw_400 fs_22 c_1a">共{{item.product_count}}件商品 合计：</text>
								<text class="ff_zc c_1a fs_26 fw_600">￥{{item.total_price}}</text>
							</view>
							<view>
								<text class="ff_zc c_1a fs_26 fw_400" style="margin-left: 10upx;" v-if="item.status==3||item.status==2||item.status==4">剩余未结尾款￥{{item.least}}</text>
							</view>
						</view>
						<view class="flex__end__center">
							<text class="ff_zc c_1a fs_24 fw_400" v-if="item.status==1" @tap="cancelOrder(item.id)">取消订单</text>
							<text class="ff_zc c_ff fs_24 fw_400" style="background: #000000;" v-if="item.status==1" @tap="orderPayALL(item.id)">已全款支付</text>
							<text class="ff_zc c_ff fs_24 fw_400" v-if="item.status==3" style="background: #000000;" @tap="confirmGoods(item.id)">已收货</text>
							<text class="ff_zc c_1a fs_24 fw_400" v-if="item.status==5||item.status==8" @tap="deleteOrder(item.id)">删除订单</text>
							<text class="ff_zc c_ff fs_24 fw_400" v-if="item.status==4" style="background: #000000;" @tap="orderPayALL(item.id)">已收尾款</text>
							<!-- <text class="ff_zc c_ff fs_24 fw_400" v-if="item.status==4" style="background: #000000;" @tap="orderPayALL(item.id)">已收尾款</text> -->
						</view>
					</view>
				</view>
			</view>
			
		</view>
		<view class="supernatant">
			<view class="flex__center__center" @tap="goTop(e)" :hidden="go_top_hidden">
				<image src="../../../static/images/top.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default{
		data(){
			return{
				loads:{
					index:0
				},
				list:[],
				page:1,
				go_top_hidden: true,
				tab_list:[
					{title:'全部'},
					{title:'待支付'},
					{title:'待发货'},
					{title:'待收货'},
					{title:'待收尾款'},
					{title:'已完成'}
				]
			}
		},
		onShow() {
			this.getResult(1)
		},
		onReachBottom() {
			this.getResult(2)
		},
		methods:{
			//跳转
			jump(url){
				uni.navigateTo({
					url:url
				})
			},
			//返回
			goBack(){
				uni.navigateBack({})
			},
			//切换
			tabIndex(index){
				this.loads.index = index
				this.getResult(1)
			},
			//数据
			getResult(page){
				app.$vm.getList({
					url:'Mall/getMyOrderList',
					that:this,
					data:this.loads,
					loading:1,
					page
				})
			},
			//删除订单
			deleteOrder(id){
				const that_ = this
				uni.showModal({
					content: '确认删除该订单？',
					success(modal_res){
						if(modal_res.confirm){
							app.$vm.getData({
								url:'Mall/submitDeleteOrder',
								that: that_,
								data: {
									order_id: id
								},
								loading: 1
							}).then(res=>{
								if(res.code==1){
									uni.showModal({
										content: res.message,
										showCancel: false,
										success(modal){
											if(modal.confirm){
												that_.getResult(1);
											}
										}
									});
								}else{
									uni.showToast({
										title:res.message,
										icon:'none'
									})
								}
							}) 
						}
					}
				})
			},
			//取消订单
			cancelOrder(id){
				const that_ = this
				uni.showModal({
					content: '确认取消该订单？',
					success(modal_res){
						if(modal_res.confirm){
							app.$vm.getData({
								url:'Mall/cancelOrder',
								that: that_,
								data: {
									order_id: id
								},
								loading: 1
							}).then(res=>{
								if(res.code == 1){
									uni.showModal({
										content: res.message,
										showCancel: false,
										success(modal){
											if(modal.confirm){
												that_.getResult(1);
											}
										}
									});
								}else{
									uni.showToast({
										title:res.message,
										icon:'none'
									})
								}
							}) 
						}
					}
				})
			},
			//确认收货
			confirmGoods(id){
				const that_ = this
				uni.showModal({
					content: '确认收货？',
					success(modal_res){
						if(modal_res.confirm){
							app.$vm.getData({
								url:'Mall/confirmOrder',
								that: that_,
								data: {
									order_id: id
								},
								loading: 1
							}).then(res=>{
								if(res.code == 1){
									uni.showModal({
										content: res.message,
										showCancel: false,
										success(modal){
											if(modal.confirm){
												that_.getResult(1);
											}
										}
									});
								}uni.showModal({
									content: res.message,
									showCancel: false,
									success(modal){
										if(modal.confirm){
											that_.getResult(1);
										}
									}
								})
							}) 
						}
					}
				})
			},
			//商城-已全款支付/已收尾款
			orderPayALL(id){
				const that_ = this
				uni.showModal({
					content: '确认已支付？',
					success(modal_res){
						if(modal_res.confirm){
							app.$vm.getData({
								url:'Mall/orderPayALL',
								that: that_,
								data: {
									order_id: id
								},
								loading: 1
							}).then(res=>{
								if(res.code == 1){
									uni.showModal({
										content: res.message,
										showCancel: false,
										success(){
											that_.getResult(1);
										}
									});
								}uni.showModal({
									content: res.message,
									showCancel: false,
									success(){
										that_.getResult(1);
									}
								});
							}) 
						}
					}
				})
			},
			 //置顶
			goTop(){
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
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background: red;
		z-index: 999;
	}
	
	.top_view {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		background: #fff;
		top: 0;
		z-index: 999;
	}
	#myOrder{
		width: 100%;
		height: 100%;
		.header{
			position: fixed;
			height: 100upx;
			width: 100%;
			background: #fff;
			z-index: 2;
			&>view:nth-child(1){
				margin-left: 30upx;
				margin-right: 69upx;
				height: 100%;
				&>image{
					margin-right:21upx; 
					width: 34upx;
					height: 32upx;
				}
			}
			&>view:nth-child(2){
				margin-right: 30upx;
				width: 500upx;
				height: 60upx;
				border:2upx solid rgba(26,26,26,1);
				&>text{
					margin: 0 20upx;
				}
				&>input{
					width: 100%;
					height: 100%;
				}
			}
		}
		.content{
			width: 100%;
			height: 100%;
			padding-top: 100upx;
			margin-bottom: 65upx;
			.tab{
				margin: 0 30upx 29upx 30upx;
				height: 42upx;
				line-height: 42upx;
				.active{
					font-family: '中粗体';
					font-size: 30upx;
					color: #1a1a1a;
					font-weight: 600;
				}
			}
			.information{
				margin: 0 30upx 27upx 30upx;
				border:2upx solid rgba(128,128,128,1);
				&>view{
					margin: 0 31upx 33upx 29upx;
					&>view:nth-child(1){
						height: 37upx;
						margin-top: 31upx;
						&>text:nth-child(2){
							color: #1a1a1a;
							font: 26upx;
							font-family: '中黑体';
							font-weight: 500;
						}
					}
					.information-conter{
						margin-bottom: 33upx;
						.conter{
							height: 150upx;
							width:100%;
							margin: 34upx 0 24upx 0; 
							&>image{
								width:200upx;
								height: 150upx;
								margin-right: 29upx;
							}
							&>view{
								line-height: 1;
								&>view:nth-child(1){
									width: 402upx;
									line-height: 1.5;
									margin-bottom: 16upx;
								}
								&>view:nth-child(2){
									height: 34upx;
									line-height: 34upx;
									
								}
								&>view:nth-child(3){
									height: 34upx;
									line-height: 34upx;
								}
							}
						}
						.numberOf{
							&>text:nth-child(2){
								margin-left: 60upx;
								color: #FFA365;
								letter-spacing: 1upx;
							}
						}
										
					}
					.choose{
						width:100%;
						height: 100%;
						&>view:nth-child(1){
							height: 38upx;
							margin-bottom: 15upx;
						}
						&>view:nth-child(2){
							&>text{
								display: block;
								border:2upx solid rgba(26,26,26,1);
								width: 180upx;
								height: 60upx;
								line-height: 60upx;
								text-align: center;
								background: #fff;
							}
							&>text:nth-child(2){
								margin-left: 20upx;
							}
						}
					}
				}
			}
		}
			//置顶
		.supernatant{
			position: fixed;
			bottom: 125upx;
			right:20upx;
			// height: 180upx;
			width: 80upx;
			z-index: 10;
			&>view:nth-child(1){
				width:80upx;
				height: 80upx;
				background: #fff;
				// margin-bottom: 20upx;
				box-shadow:0px 2px 8px 0px rgba(0,0,0,0.15);
				&>image{
					width: 40upx;
					height: 40upx;
				}
			}
		}
	}
	
</style>
