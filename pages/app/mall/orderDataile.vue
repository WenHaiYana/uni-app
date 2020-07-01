<template>
	<view id="orderDataile">
		<view class="content">
			<view>
				<view>
					<view class="fs_40 c_1a fw_600 ff_zc">{{orderDataile.status_name}}</view>
					<view class="fs_24 c_1a">交易单号:{{orderDataile.order_number}}</view>
				</view>
				<view v-for="(item,index) in orderDataile.order_product" :key="index">
					<view class="flex information">
						<image :src="item.product_cover_img"></image>
						<view>
							<view class=" ellipsis_two c_1a fs_24 ff_cg fw_400">{{item.product_name}}</view>
							<view class="ff_cg fs_22 c_80 fw_400">已选规格：{{item.product_sku_name}}</view>
							<view class="ff_cg fs_22 c_80 fw_400 ellipsis_one" >窗号:{{item.window_type}}</view>
							<view class="ff_cg fs_22 c_80 fw_400">
								<text>高：{{item.height}}米 /</text>
								<text>宽：{{item.width}}米 /</text>
								<text>倍数：{{item.times}}倍</text>
							</view>
							<view class="ff_cg fs_22 c_80 fw_400" v-if="item.install_type">安装方式:{{item.install_type}}</view>
							<view class="ff_cg fs_22 c_80 fw_400" v-if="item.install_style">安装结构:{{item.install_style}}</view>
							<view class="ff_cg fs_22 c_80 fw_400" v-if="item.plane">窗头:{{item.plane}}</view>
							<view class="ff_cg fs_22 c_80 fw_400" v-if="item.craft">工艺:{{item.craft}}</view>
						</view>
					</view>
					<view class="numberOf">
						<text class="c_1a fs_32 fw_600">￥{{item.product_price}}<text class="fs24 fw_400 ff_cg">/米</text></text>
						<text class="fs_24 fw_400 ff_cg">数量：{{item.number}}米</text>
					</view>	
				</view>
			</view>
				
		</view>
		<view class="address lh_1">
			<view class="fs_32 c_1a">
				<text style="margin-right: 20upx;">{{orderDataile.linkman}}</text>
				<text>{{orderDataile.mobile_phone}}</text>
			</view>
			<view class="fs_26 c_4d ff_cg fw_400">{{orderDataile.address}}</view>
		</view>
		<view class="goodsInformation">
			<view>
				<text class="fs_26 ff_cg fw_400 c_80">商品合计</text>
				<text class="fs_34 ff_zc fw_600 c_1a">￥{{orderDataile.total_price}}</text>
			</view>
			<!-- <view>
				<text class="fs_26 ff_cg fw_400 c_80">享受优惠</text>
				<text class="fw_800 fs_28" style="color: #FF866E;font-family: 'Avenir Heavy';">{{orderDataile.prefer_rate}}折优惠</text>
			</view> -->
			<view class="title">
				<text class="fs_26 ff_cg fw_400 c_80">其他</text>
				<text class="fs_26 fw_500 c_1a" style="font-family:'中黑体' ;">{{orderDataile.paid_money}}元</text>
			</view>
			<view class="title">
				<view class="fs_26 ff_cg fw_400 c_80">支付方式</view>
				<view class="fs_26 fw_500 c_1a flex__align" style="font-family:'中黑体' ;">
					<view>{{orderDataile.pay_way_name}}</view>
					<!-- <picker @change="bindPickerChange" :value="i" :range="nav_list" range-key="name">
						<view>{{nav_list[i].name}}</view>
					</picker> -->
					<!-- <image src="../../../static/images/bh@2x.png"></image> -->
				</view>
			</view>
			<view class="title">
				<text class="fs_26 ff_cg fw_400 c_80">备注</text>
				<text class="fw_400 fs_26 ff_cg c_1a">{{orderDataile.remark}}</text>
			</view>
		</view>
		<view class="payment flex__between__center">
			<view class="paymentLeft">
				<view class="flex__between__center paymentLeft-top" >
					<view>
						<text class="fs_26 c_1a ff_cg fw_400">应付款</text>
						<text class="fs_32 c_1a ff_zc fw_600">￥{{orderDataile.pay_money}}</text>
					</view>
					<view>
						<text class="fs_26 c_1a ff_cg fw_400">已支付</text>
						<text class="fs_32 c_1a ff_zc fw_600">￥{{orderDataile.paid_money}}</text>
					</view>
				</view>
				<view class="paymentLeft-bottom" v-if="orderDataile.status==5">
					<text>剩余尾款</text>
					<text>￥{{payment}}</text>
				</view>
			</view>
			
			<view class="iconfont icon-bianji fs_36" @tap="jump('/pages/app/account/modifyPay?id='+orderDataile.id)" v-if="orderDataile.status==1||orderDataile.status==2||orderDataile.status==3||orderDataile.status==4" v-show="isShow"></view>
		</view>
		<view class="flex footer-2" v-if="orderDataile.status==1">
			<view class="fs_30 ff_cg fw_400 c_1a" @tap="cancelOrder(orderDataile.id)">取消订单</view>
			<view class="fs_30 ff_cg fw_400 c_ff" @tap="orderPayALL(item.id)">已支付</view>
		</view>
		<view class="flex footer-1" v-if="orderDataile.status==5||orderDataile.status==8" @tap="deleteOrder(orderDataile.id)">
			<view class="fs_30 ff_cg fw_400 c_1a">删除订单</view>
		</view>
		<view class="flex footer-1" v-if="orderDataile.status==3" @tap="confirmGoods(orderDataile.id)" style="background: #000;">
			<view class="fs_30 ff_cg fw_400 c_ff">已收货</view>
		</view>
		<view class="flex footer-1" v-if="orderDataile.status==4" @tap="orderPayALL(orderDataile.id)" style="background: #000;">
			<view class="fs_30 ff_cg fw_400 c_ff">已收尾款</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default{
		data(){
			return{
				// nav_list:[
				// 	{name:'微信'},{name:'支付宝'},{name:'线下支付'}
				// ],
				i:0,
				id:'',//商品id
				orderDataile:[],//数据
				payment:'',
				isShow:true,
			}
		},
		onLoad(options) {
			this.id = options.id
		},
		onShow() {
			this.getResult()
		},
		methods:{
			//
			jump(url){
				uni.navigateTo({
					url:url
				})
			},
			// bindPickerChange(e){
			// 	// console.log(e)
			// 	let index = e.detail.value
			// 	this.i = e.target.value
			// },
			//数据
			getResult(){
				app.$vm.getData({
					url:'Mall/getOrderDetailData',
					that:this,
					data:{
						order_id:this.id
					},
					loading:1
				}).then(res=>{
					if(res.code == 1){
						this.orderDataile = res.data.order
						this.payment = this.orderDataile.pay_money-this.orderDataile.paid_money
						if(this.orderDataile.paid_money == this.orderDataile.pay_money){
							this.isShow = false
						}
					}
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
								uni.showModal({
									content: res.message,
									showCancel: false,
									success(modal_res){
										if(modal_res.confirm){
											uni.navigateBack({})
										}
									}
								});
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
								uni.showModal({
									content: res.message,
									showCancel: false,
									success(modal_res){
										if(modal_res.confirm){
											uni.navigateBack({})
										}
									}
								});
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
								uni.showModal({
									content: res.message,
									showCancel: false,
									success(modal_res){
										if(modal_res.confirm){
											uni.navigateBack({})
										}
									}
								});
							}) 
						}
					}
				})
			},
			//商城-已全款支付/已收尾款
			orderPayALL(id){
				const that_ = this
				uni.showModal({
					content: '确认已收货？',
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
								uni.showModal({
									content: res.message,
									showCancel: false,
									success(modal_res){
										if(modal_res.confirm){
											uni.navigateBack({})
										}
									}
								});
							}) 
						}
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	#orderDataile{
		width: 100%;
		height: 100%;
		.content{
			width: 100%;
			height: 100%;
			&>view{
				margin: 0 27upx 0 33upx ;
				height: 100%;
				border-bottom:1upx solid #CBCBCB;
				&>view:nth-child(1){
					line-height: 1;
					&>view:nth-child(1){
						height: 56upx;
						line-height: 56upx;
						margin: 10upx 0;
					}
					&>view:nth-child(2){
						height: 34upx;
						line-height: 34upx;
						margin-bottom: 31upx;
					}
				}
				.information{
					// height: 150upx;
					width: 100%;
					margin-bottom: 21upx;
					&>image{
						width:200upx;
						height: 240upx;
						margin-right: 29upx;
					}
					&>view{
						line-height: 1;
						&>view{
							letter-spacing: 2upx;
							height: 40upx;
							line-height: 40upx;
							margin-bottom: 5upx;
						}
					}
				}
				.numberOf{
					margin-bottom: 18upx;
					&>text:nth-child(2){
						margin-left: 60upx;
						color: #FFA365;
						letter-spacing: 1upx;
					}
				}
			}
			
		}
		.address{
			margin: 0 27upx 0 33upx ;
			height: 100%;
			border-bottom:1upx solid #CBCBCB;
			&>view:nth-child(1){
				font-family: "Avenir Book";
				height: 46upx;
				line-height: 46upx;
				margin: 29upx 0 4upx 0;
			}
			&>view:nth-child(2){
				height: 37upx;
				line-height: 37upx;
				margin-bottom:33upx;
			}
		}
		.goodsInformation{
			margin: 0 27upx 30upx 33upx ;
			height: 100%;
			&>view{
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			&>view:nth-child(1){
				height: 48upx;
				margin:38upx 0 36upx 0;
			}
			&>view:nth-child(2){
				height: 40upx;
				margin-bottom: 42upx;
			}
			.title{
				height: 37upx;
				margin-bottom: 45upx;
				&>view:nth-child(2){
					&>image{
						width: 22upx;
						height: 22upx;
						margin-left: 5upx;
						margin-top: 4upx;
					}
				}
			}
		}
		.payment{
			width: 100%;
			// height: 200upx;
			background: #F5F5F5;
			letter-spacing: 1upx;
			margin-bottom: 98upx;
			.paymentLeft{
				margin-left: 41upx;
				line-height: 1;
				.paymentLeft-top{
					height: 46upx;
					line-height: 46upx;
					margin: 25upx 0;
					&>view:nth-child(1){
						margin-right: 76upx;
					}
				}
				.paymentLeft-bottom{
					height: 46upx;
					line-height: 46upx;
					// margin-bottom: 98upx;
				}
			}
			&>view:nth-child(2){
				margin-right: 41upx;
			}
		}
		.footer-2{
			width:100%;
			height: 98upx;
			position: fixed;
			bottom: 0;
			left: 0;
			background: #fff;
			&>view{
				border:2upx solid #1A1A1A;
				width:50%;
				height: 100%;
				text-align: center;
				line-height: 98upx;
			}
			&>view:nth-child(2){
				background: #000;
			}
		}
		.footer-1{
			width:100%;
			height: 98upx;
			position: fixed;
			bottom: 0;
			left: 0;
			background: #fff;
			&>view{
				border:2upx solid #1A1A1A;
				width:100%;
				height: 100%;
				text-align: center;
				line-height: 98upx;
				letter-spacing: 1upx;
			}
		}
						
	}
</style>
