<template>
	<view id="orderDateile">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="header flex__align">
			<image src="../../../static/images/fh.png" @tap="goBank()"></image>
			<text class="fs_34x fw_400 ff_cg c_03">订单详情</text>
		</view>
		<view class="conter">
			<view>
				<view>
					<text class="fs_40x c_1a fw_600 ff_zc">{{orderDataile.status_name}}</text>
					<view class="fs_24x c_1a">交易单号:{{orderDataile.order_number}}</view>
				</view>
				<view class="information flex__between" v-for="(item,index) in orderDataile.order_product" :key="index">
					<image :src="item.product_cover_img"></image>
					<view>
						<view class=" ellipsis_one c_1a fs_30x ff_cg fw_400">{{item.product_name}}</view>
						<view class="ff_cg fs_24x c_80 fw_400" style="letter-spacing: 2upx;">
							<text style="letter-spacing: 1px;">已选规格：{{item.window_type}}</text>
							<text>高：{{item.height}}米 /</text>
							<text>宽：{{item.width}}米 /</text>
							<text>倍数：{{item.times}}倍</text>
						</view>
						<view class="numberOf">
							<text class="c_1a fs_32x fw_600">￥{{item.product_price}}<text class="fs_24x fw_400 ff_cg">/米</text></text>
							<text class="fs_24x fw_400 ff_cg">数量：{{item.number}}米</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="address lh_1" @tap="jump('/pages/ipad/address/index')">
			<view class="fs_32x c_1a">
				<text style="padding-right: 10px;">{{orderDataile.linkman}}</text>
				<text>{{orderDataile.mobile_phone}}</text>
			</view>
			<view class="fs_26x c_4d ff_cg fw_400">{{orderDataile.address}}</view>
		</view>
		<view class="goodsInformation">
			<view class="flex__align preferentialGoods">
				<view>
					<text>商品合计</text>
					<text class="fw_600 c_1a fs_34x">￥{{orderDataile.total_price}}</text>
				</view>
				<view class="title">
					<text>享受优惠</text>
					<text class="fw_600 ff_zc fs_28x" style="color: #FF866E;">{{orderDataile.prefer_rate}}折优惠</text>
				</view>
				<view class="title">
					<view class="flex__between title">
						<view>
							<text class="ff_cg fw_400 fs_26x c_80">其他</text>
							<view class="fw_400 ff_cg c_1a fs_26x">{{orderDataile.other_money}}元</view>
						</view>
						<!-- <view class="flex__between__center" style="margin-right: 20upx;">
							<image src="../../../static/images/bh@2x.png"></image>
						</view> -->
					</view>
				</view>
				<view>
					<view class="flex__between title">
						<view>
							<text class="ff_cg fw_400 fs_26x c_80">支付方式</text>
							<view class="fw_400 ff_cg c_1a fs_26x">{{orderDataile.pay_way_name}}</view>
						</view>
						
					</view>
					<!-- <picker @change="bindPickerChange" :value="i" :range="nav_list" range-key="name">
						<view class="flex__between title">
							<view>
								<text class="ff_cg fw_400 fs_26 c_80">支付方式</text>
								<view class="fw_400 ff_cg c_1a fs_26">{{nav_list[i].name}}</view>
							</view>
							<view class="flex__between__center">
								<image src="../../../static/images/bh@2x.png"></image>
							</view>
						</view>
					</picker> -->
				</view>
			</view>
			<view class="note">
				<text class="fw_400 ff_cg c_80 fs_26x">备注</text>
				<text class="fw_400 ff_cg c_1a fs_26x">物流发顺丰哦 要不然我拒收!</text>
			</view>
		</view>
		<view class="goodsTime flex__align">
			<view class="ff_cg fw_400 fs_20x c_80" v-if="orderDataile.status==1||orderDataile.status==2||orderDataile.status==3||orderDataile.status==4||orderDataile.status==5||orderDataile.status==8">
				<view class="fs_20x">下单时间</view>
				<view class="fs_20x">{{orderDataile.order_time}}</view>
			</view>
			<view class="ff_cg fw_400 fs_20x c_80" v-if="orderDataile.status==3||orderDataile.status==4||orderDataile.status==5">
				<view class="fs_20x">支付时间</view>
				<view class="fs_20x">{{orderDataile.pay_time}}</view>
			</view>
			<view class="ff_cg fw_400 fs_20x c_80" v-if="orderDataile.status==2||orderDataile.status==4||orderDataile.status==5">
				<view class="fs_20x">发货时间</view>
				<view class="fs_20x">{{orderDataile.express_time}}</view>
			</view>
			<view class="ff_cg fw_400 fs_20x c_80" v-if="orderDataile.status==3||orderDataile.status==4||orderDataile.status==5">
				<view class="fs_20x">收货时间</view>
				<view class="fs_20x">{{orderDataile.confirm_time}}</view>
			</view>
			<view class="ff_cg fw_400 fs_20x c_80" v-if="orderDataile.status==5">
				<view class="fs_20x">支付款时间</view>
				<view class="fs_20x">{{orderDataile.paid_time}}</view>
			</view>
		</view>
		<view class="footer flex__between__center">
			<view class="footer-le flex__align">
				<view class="footer-le-left flex__align">
					<text class="fs_26x ff_cg fw_400 c_a1">应付款</text>
					<text class="fs_32x fw_600 c_a1" style="font-family: '中粗体';">￥{{orderDataile.pay_money}}</text>
				</view>
				<view class="footer-rg-center flex__align">
					<text class="fs_26x ff_cg fw_400 c_a1">已支付</text>
					<text class="fs_32x fw_600 c_a1" style="font-family: '中粗体';">￥{{orderDataile.paid_money}}</text>
					<text class="iconfont icon-bianji" style="font-size: 25px;" @tap="jump('/pages/ipad/account/modifyPay?id='+orderDataile.id)" v-if="orderDataile.status==1||orderDataile.status==2||orderDataile.status==3||orderDataile.status==4" v-show="isShow"></text>
				</view>
				<view class="footer-le-right flex__align" v-if="orderDataile.status==5">
					<text class="fs_26 ff_cg fw_400 c_a1">剩余尾款</text>
					<text class="fs_32 fw_600 c_a1" style="font-family: '中粗体';">￥{{payment}}</text>
				</view>
			</view>
			<view class="footer-rg flex__end__center fs_30x ff_cg fw_400" v-if="orderDataile.status==1">
				<view class="c_1a" style="background: #fff;border:1px solid rgba(26,26,26,1);" @tap="cancelOrder(orderDataile.id)">取消订单</view>
				<view class="c_ff" style="background: #1A1A1A;" @tap="orderPayALL(item.id)">已支付</view>
			</view>
			<view class="footer-rg flex__end__center fs_30x ff_cg fw_400" v-if="orderDataile.status==5||orderDataile.status==8" @tap="deleteOrder(orderDataile.id)">
				<view class="c_1a" style="background: #fff;border:2px solid rgba(26,26,26,1);">删除订单</view>
			</view>
			<view class="footer-rg flex__end__center fs_30x ff_cg fw_400" v-if="orderDataile.status==3" @tap="confirmGoods(orderDataile.id)">
				<view class="c_1a" style="background: #fff;border:2px solid rgba(26,26,26,1);">已收货</view>
			</view>
			<view class="footer-rg flex__end__center fs_30x ff_cg fw_400" v-if="orderDataile.status==4" @tap="orderPayALL(orderDataile.id)">
				<view class="c_1a" style="background: #fff;border:2px solid rgba(26,26,26,1);">已收尾款</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default{
		data(){
			return{
				i:0,
				id:'',//商品id
				orderDataile:[],//数据
				payment:'',
				isShow:true,
				//时间
				time_list:[
					{name:'下单时间',time:'2017.02.23 14:00'},{name:'支付时间',time:'2017.02.23 14:00'},{name:'发货时间'},{name:'收货时间'},{name:'支付款时间'}
				]
			}
		},
		onLoad(options) {
			this.id = options.id
		},
		onShow() {
			this.getResult()
		},
		methods:{
			bindPickerChange(e){
				let index = e.detail.value
				this.i = e.target.value
			},
			//
			jump(url){
				uni.navigateTo({
					url:url
				})
			},
			//
			goBank(){
				uni.navigateBack({})
			},
			//数据
			getResult(){
				this.getData({
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
							that_.getData({
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
							that_.getData({
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
							that_.getData({
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
					content: '确认收货？',
					success(modal_res){
						if(modal_res.confirm){
							that_.getData({
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
	#orderDateile{
		width:100%;
		height: 100%;
		//头部
		.header{
			width: 100%;
			height: 70px;
			position: fixed;
			z-index: 1;
			background: #fff;
			// background: red;
			&>image{
				width:23px;
				height: 23px;
				margin: 0 10px 0 23px;
			}
		}
		//内容
		.conter{
			width:100%;
			height: 100%;
			padding-top: 70px;
			&>view{
				margin: 15px 50px 0 50px;
				height: 100%;
				border-bottom:1px solid #333333;
				&>view:nth-child(1){
					&>text{
						display: block
					}
				}
				.information{
					height: 117px;
					width:100%;
					margin: 12px 0 12px 0; 
					&>image{
						width:150px;
						height: 117px;
						margin-right: 15px;
					}
					&>view{
						width: 76%;
						line-height: 1;
						&>view:nth-child(1){
							height: 25px;
							line-height: 25px;
							margin-bottom: 24px;
						}
						&>view:nth-child(2){
							height: 25px;
							line-height: 25px;
							&>text:nth-child(1){
								margin-right: 22px;
							}
						}
						.numberOf{
							margin-top: 22px;
							&>text:nth-child(2){
								margin-left: 30px;
								color: #FFA365;
								letter-spacing: 1px;
							}
						}
					}
				}				
			}
		}
		//地址
		.address{
			margin: 0 50px;
			// height: 173upx;
			border-bottom:1px solid #333333;
			letter-spacing: 2px;
			&>view:nth-child(1){
				font-family: "Avenir Book";
				height: 23px;
				line-height: 23px;
				margin: 20px 0 2px 0;
				
			}
			&>view:nth-child(2){
				margin-bottom:22px;
			}
		}
		//
		.goodsInformation{
			margin: 0 50px 0 50px;
			height: 100%;
			border-bottom:1px solid #1A1A1A;
			.preferentialGoods{
				margin: 36px 0 31px 0;
				height: 100%;
				&>view{
					width:25%;
					height: 46px;
					border-right:1px solid #CBCBCB;
					&>text{
						display: block;
					}
					&>text:nth-child(1){
						height: 18px;
						line-height: 18px;
						font-size: 13px;
						color: #808080;
						font-weight: 400;
						font-family: "常规体";
					}
					&>text:nth-child(2){
						height: 24px;
						line-height: 24px;
						margin-top:5px;
					}
					
				}
				.title{
					&>text{
						padding-left: 20px;
					}
					&>view:nth-child(1){
						padding-left: 20px;
						&>text{
							display: block;
							margin-bottom: 5px;
						}	
					}
					&>view:nth-child(2){
						height: 46px;
						&>image{
							width:20px;
							height: 20px;
						}
					}
				}
				&>view:last-child{
					border-right: none;
				}
			}
			.note{
				&>text{
					display: block;
					height: 18px;
					line-height: 18px;
				}
				&>text:nth-child(1){
					margin-bottom: 12px;
				}
				&>text:nth-child(2){
					margin-bottom:6px;
				}
			}
		}
		.goodsTime{
			margin: 26px 50px 0 50px;
			height: 100%;
			&>view{
				width:20%;
				&>view:nth-child(1){
					margin-bottom: 10px;
				}
			}
		}
		.footer{
			position: fixed;
			bottom:0;
			left:0;
			width:100%;
			height: 75px;
			letter-spacing: 1px;
			background: #F5F5F5;
			.footer-le{
				width: 70%;
				height: 100%;
				letter-spacing: 1px;
				.footer-le-left{
					height: 100%;
					margin-left: 20px;
					margin-right: 18px;
				}
				.footer-rg-center{
					height: 100%;
					&>text:nth-child(3){
						margin-left: 9px;
					}
				}
				.footer-le-right{
					height: 100%;
					margin-left: 33px;
				}
			}
			.footer-rg{
				width: 30%;
				padding-right: 10px;
				&>view{
					width: 190px;
					height: 30px;
					text-align: center;
					line-height: 30px;
				}
				&>view:nth-child(1){
					margin-right: 9px;
				}
			}
		}
		
	}
</style>
