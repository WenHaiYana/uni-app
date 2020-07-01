<template>
	<view id="placeOrder">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="header flex__align">
			<image src="../../../static/images/fh.png" @tap="goBank()"></image>
			<text class="fs_34x fw_400 ff_cg c_03">下单</text>
		</view>
		<view class="conter">
			<view>
				<view class="information flex__between" v-for="(item,index) in cart_product" :key="index" @tap="jump('/pages/ipad/mall/detail?id='+item.product_id)">
					<image :src="item.cover_img"></image>
					<view>
						<view class=" ellipsis_one c_1a fs_30x ff_cg fw_400">{{item.name}}</view>
						<view class="ff_cg fs_24x c_80 fw_400" style="letter-spacing: 1px;">
							<text style="letter-spacing: xpx;">已选规格：{{item.window_type}}</text>
							<text>高：{{item.height}}米 /</text>
							<text>宽：{{item.width}}米 /</text>
							<text>倍数：{{item.times}}倍</text>
						</view>
						<view class="numberOf">
							<text class="c_1a fs_32x fw_600">￥{{item.price}}<text class="fs_24x fw_400 ff_cg">/米</text></text>
							<text class="fs_24x fw_400 ff_cg">数量：{{item.number}}米</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style='font-size: 16px;margin-bottom: 5px;color: #1A1A1A;margin-left: 50px;'>请填写地址</view>
		<view class="address lh_1" @tap="addres">
			<view class="fs_32x c_1a">
				<text style="padding-right: 10px;">{{linkman}}</text>
				<text>{{mobile_phone}}</text>
			</view>
			<view class="fs_26x c_4d ff_cg fw_400">{{address}}</view>
		</view>
		<view class="goodsInformation">
			<view class="flex__align preferentialGoods">
				<view>
					<text>商品合计</text>
					<text class="fw_600 c_1a fs_34x">￥{{goods_amount}}</text>
				</view>
				<view class="title">
					<text>享受优惠</text>
					<text class="fw_600 ff_zc fs_28x" style="color: #FF866E;">{{prefer_rate}}折优惠</text>
				</view>
				<view class="title" @tap="type()">
					<text v-if="num==0">其他</text>
					<text v-else>修改已支付</text>
					<text class="fw_400 ff_cg c_1a fs_26x">{{num}}元</text>
				</view>
				<view>
					<picker @change="bindPickerChange" :value="i" :range="pay_way" range-key="name">
						<view class="flex__between title">
							<view>
								<text class="ff_cg fw_400 fs_26x c_80">支付方式</text>
								<view class="fw_400 ff_cg c_1a fs_26x">{{pay_way[i].name}}</view>
							</view>
							<view class="flex__between__center">
								<image src="../../../static/images/bh@2x.png"></image>
							</view>
						</view>
					</picker>
				</view>
			</view>
			<view class="note">
				<text class="fw_400 ff_cg c_80 fs_26x">备注</text>
				<text class="fw_400 ff_cg c_1a fs_26x">物流发顺丰哦 要不然我拒收!</text>
			</view>
		</view>
		<view class="footer flex__between__center">
			<view class="flex__align">
				<text class="fs_26x ff_cg fw_400 c_a1">实付</text>
				<text class="fs_32x fw_600 c_a1" style="font-family: '中粗体';" v-if="num==0">￥{{realPay}}</text>
				<text class="fs_32x fw_600 c_a1" style="font-family: '中粗体';" v-else>￥{{realPay_1}}</text>
			</view>
			<view class="flex__center__center fs_30x ff_cg fw_400 c_ff" @tap="payment(i)">去付款</view>
		</view>
		<!-- 浮层 -->
		<view class="layer" v-if="isShow">
			<view class="layerConter">
				<view class="flex__center__center">
					<view class="fs_28x c_1a ff_cg fw_400">所选产品高低 >275cm 是否需要增加加高产品</view>
				</view>
				<view class="flex">
					<text class="fs_28x c_80 ff_cg fw_400" @tap="cancel">否</text>
					<text class="fs_28x c_1a fw_500 ff_zh" @tap="goHome()">是</text>
				</view>
			</view>
		</view>
		<!-- 浮层-商家收款 -->
		<view class="layer" v-if="isShow_">
			<view class="collectionLayer">
				<view>
					<view class="fs_40x c_1a ff_cg fw_400">宜家（恒隆店）</view>
					<view v-if="wechat_code" class="flex__center__center"><image :src="wechat_code"></image></view>
					<view v-if="alipay_code" class="flex__center__center"><image :src="alipay_code"></image></view>
				</view>
				<view class="flex">
					<text class="fs_34x c_80 ff_cg fw_400" @tap="cancel_">取消</text>
					<text class="fs_34x c_1a fw_500 ff_zh" @tap="goModifyPay()">已支付</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	// const app = getApp()
	export default{
		data(){
			return{
				wechat_code:'',
				alipay_code:'',
				order_id:'',//订单id
				isShow:false,
				isShow_:false,
				i:0,
				cart_product:[],
				num:0,
				count:0,
				back:'',
				numHeight:'',
				dataCart:[],//提交数据
				realPay:'',//实际支付
				realPay_1:'',//实际支付
				pay_way:[],//支付方式
				goods_amount:'',//总价
				prefer_rate:'',//折扣
				settlement_type: '',
				linkman: '', //联系人（必填）
				mobile_phone: '', //联系电话（必填）
				address: '', //详细地址（必填）
				orders:{
					settlement_type: '', //结算方式（必填 1：购物车结算 2：立即购买）
					window_type:'',//窗号（当 settlement_type = 2必填）
					product_id:'',//立即购买商品ID（当 settlement_type = 2 时 必填）
					sku:'',//立即购买商品SKU编码（当 settlement_type = 2 且商品你开启规格时 必填）
					height:'',//高度（当 settlement_type = 2必填）
					width:'',//宽度（当 settlement_type = 2必填）
					times:'',//倍数（当 settlement_type = 2必填）
					install_type:'',//安装方式（当 settlement_type = 2必填）
					install_style:'',//安装结构（当 settlement_type = 2必填）
					number:'',//立即购买商品数量（当 settlement_type = 2 时 必填）
					plane:'',//窗头（选填）
					remark:'',//窗头（选填）
				}
			}
		},
		onLoad(options) {
			this.back = options.back
			this.orders.settlement_type = options.settlement_type;
			this.orders.window_type =  options.window_type
			this.orders.product_id =  options.product_id
			this.orders.sku =  options.sku
			this.orders.height =  options.height
			this.orders.width =  options.width
			this.orders.times =  options.times
			this.orders.install_type =  options.install_type
			this.orders.install_style =  options.install_style
			this.orders.number =  options.number
			this.orders.plane = options.plane
			this.orders.remark = options.remark
			this.num = options.num||this.num
		},
		onShow() {
			const that = this
			that.isShow = false
			that.isShow_ = false
			uni.getStorage({
				key: 'num1',
				success: function (e) {
					that.num = e.data
				}
			});
			uni.getStorage({
				key: 'name',
				success: function (e) {
					that.linkman = e.data
				}
			});
			uni.getStorage({
				key: 'phone',
				success: function (e) {
					that.mobile_phone = e.data
				}
			});
			uni.getStorage({
				key: 'address',
				success: function (e) {
					that.address = e.data
				}
			});
			this.getResult()
			this.order_id = uni.getStorageSync('order_id');
			this.wechat_code = uni.getStorageSync('wechat_code');
			this.alipay_code = uni.getStorageSync('alipay_code');
		},
		methods:{
			bindPickerChange(e){
				let index = e.detail.value
				this.i = e.target.value
			},
			//取消商家浮层
			cancel(){
				this.isShow = false
				this.isShow_ = true
			},
			//取消高度选择
			cancel_(){
				this.isShow_ = false
				
			},
			//其他
			type(){
				uni.navigateTo({
					url:'/pages/ipad/account/preferential'
				})
			},
			goModifyPay(){
				uni.navigateTo({
					url:'/pages/ipad/account/modifyPay?id='+ this.order_id
				})
			},
			//跳转
			jump(url){
				uni.navigateTo({
					url:url
				})
			},
			//地址
			addres(){
				uni.navigateTo({
					url:'/pages/ipad/address/index'
				})
			},
			//返回
			goBank(){
				if(this.back == 1){
					uni.navigateTo({
						url:'/pages/ipad/mall/cart'
					})
				}else if(this.back == 2){
					uni.navigateTo({
						url:'/pages/ipad/mall/detaile'
					})
				}
			},
			
			//数据
			getResult(){
				const that = this
				this.getData({
					url:'Mall/getOrderReady',
					that:this,
					data:this.orders,
					loading:1
				}).then(res=>{
					if(res.code == 1){
						this.realPay_1 = (res.data.prefer_rate/10)*res.data.goods_amount-Number(this.num) 
						this.realPay = (res.data.prefer_rate/10)*res.data.goods_amount
						this.prefer_rate = res.data.prefer_rate
						this.goods_amount = res.data.goods_amount
						this.cart_product = res.data.cart_product
						console.log(this.cart_product)
						this.pay_way = res.data.pay_way
					}
					var list=[]
					for(var i=0;i<res.data.cart_product.length;i++){
						var num = res.data.cart_product[i]
						that.numHeight = num.height
					}
				})
			},
			//去付款
			payment(i){
				const that = this
				that.count++
				if(that.orders.settlement_type==1){
					this.getData({
						url:'Mall/submitOrder',
						that:this,
						data:{
							pay_way:this.pay_way[i].id,
							linkman:this.linkman,
							mobile_phone:this.mobile_phone,
							address:this.address,
							settlement_type:this.orders.settlement_type,
							prefer_rate:this.prefer_rate,
							other_money:this.num,
						}
					}).then(res=>{
						if(res.code == 1){
							uni.setStorageSync('order_id', res.data.order_id);
							uni.setStorageSync('wechat_code', res.data.wechat_code);
							uni.setStorageSync('alipay_code', res.data.alipay_code);
							if(that.pay_way[i].id==3){
								uni.showModal({
									content: res.message,
									showCancel: false,
									success(modal_res){
										if(modal_res.confirm){
											uni.navigateBack({})
										}
									}
								});
							}else if(that.pay_way[i].id==1||that.pay_way[i].id==2){
								if(that.numHeight>2.75&&that.count==1){
									this.isShow=true
								}else{
									uni.showModal({
										content: res.message,
										showCancel: false,
										success(modal_res){
											if(modal_res.confirm){
												that.isShow_ = true
											}
										}
									});
								}
							}
						}else{
							uni.showToast({
								title:"这单已支付,请不要在重复",
								icon:'none'
							})
							setTimeout(function(){
								uni.navigateTo({
									url:'./cart'
								})
							},500)
						}
					})
				}
				if(that.orders.settlement_type==2){
					this.getData({
						url:'Mall/submitOrder',
						that:this,
						data:{
							product_id:that.orders.product_id,
							number:that.orders.number,
							sku:that.orders.sku,
							pay_way:that.pay_way[i].id,
							prefer_rate:that.prefer_rate,
							other_money:that.num,
							window_type:that.orders.window_type,
							height:that.orders.height,
							width:that.orders.width,
							times:that.orders.times,
							install_type:that.orders.install_type,
							install_style:that.orders.install_style,
							plane:that.orders.plane,
							remark:that.orders.remark,
							pay_way:that.pay_way[i].id,
							linkman:that.linkman,
							mobile_phone:that.mobile_phone,
							address:that.address,
							settlement_type:that.orders.settlement_type,
						}
					}).then(res=>{
						if(res.code == 1){
							uni.setStorageSync('order_id', res.data.order_id);
							uni.setStorageSync('wechat_code', res.data.wechat_code);
							uni.setStorageSync('alipay_code', res.data.alipay_code);
							if(that.pay_way[i].id==3){
								uni.showModal({
									content: res.message,
									showCancel: false,
									success(modal_res){
										if(modal_res.confirm){
											uni.navigateBack({})
										}
									}
								});
							}else if(that.pay_way[i].id==1||that.pay_way[i].id==2){
								if(that.numHeight>2.75&&that.count==1){
									this.isShow=true
								}else{
									uni.showModal({
										content: res.message,
										showCancel: false,
										success(modal_res){
											if(modal_res.confirm){
												that.isShow_ = true
											}
										}
									});
								}
								
							}
						}else{
							uni.showModal({
								content: res.message,
								showCancel: false,
							});
						}
					})
				}
			
			},
			goHome(){
				console.log(111)
				const that = this
				if(that.orders.settlement_type==2){
					this.getData({
						url:'Mall/updateDetailCart',
						that:this,
						data:{
							product_id:that.cart_product[0].product_id,
							number:that.cart_product[0].number,
							window_type:that.cart_product[0].window_type,
							height:that.cart_product[0].height,
							width:that.cart_product[0].width,
							times:that.cart_product[0].times,
							install_type:that.cart_product[0].install_style,
							install_style:that.cart_product[0].install_type,
							plane:that.cart_product[0].plane,
							sku:that.cart_product[0].product_sku,
							remark:that.cart_product[0].notices,
						}
					}).then(res=>{
						if (res.code == 1) {
							uni.showToast({
								title: res.message,
								icon: 'none'
							});
							setTimeout(function(){
								uni.navigateTo({
									url:'/pages/ipad/mall/index'
								})
							},500)
						}else{
							uni.showToast({
								title: res.message,
								icon: 'none'
							});
						}
					})
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	#placeOrder{
		width:100%;
		height: 100%;
		//头部
		.header{
			width: 100%;
			height: 70px;
			position: fixed;
			z-index: 1;
			background: #fff;
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
							margin-bottom: 14px;
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
				margin-bottom:23px;
			}
		}
		//
		.goodsInformation{
			margin: 0 50px 125px 50px;
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
							margin-bottom: 10px;
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
					margin-bottom: 6px;
				}
			}
		}
		.footer{
			position: fixed;
			bottom:0;
			left:0;
			width:100%;
			height: 70px;
			letter-spacing: 1px;
			background: #F5F5F5;
			&>view:nth-child(1){
				width:67%;
				height: 100%;
				&>text:nth-child(1){
					margin: 0 1px 0 35px ;
				}
			}
			&>view:nth-child(2){
				width:33%;
				height: 40px;
				background: #1A1A1A;
				border:1px solid #1A1A1A;
				margin-right: 30px;
			}
		}
		//浮层
		.layer{
			position: fixed;
			bottom:0;
			top:0;
			left: 0;
			right:0;
			background:rgba(0,0,0,0.8);
			z-index: 30;
			//浮层
			.layerConter{
				position: fixed;
				z-index: 40;
				top:50%;left:50%;
				transform: translate(-50%, -50%);
				width:60%;
				height: 200px;
				background: #fff;
				&>view:nth-child(1){
					height:150px;
					width: 100%;
					border-bottom:1px solid #CBCBCB;
					&>view{
						margin: 0 49px 0 107upx;
					}
				}
				&>view:nth-child(2){
					height:50px;
					width: 100%;
					&>text{
						width:50%;
						height: 100%;
						display: block;
						line-height: 49px;
						text-align: center;
					}
					&>text:nth-child(1){
						border-right: 1px solid #CBCBCB;
					}
				}
			}
			//商家收款浮层
			.collectionLayer{
				position: fixed;
				z-index: 40;
				top:50%;left:50%;
				transform: translate(-50%, -50%);
				width:50%;
				height: 353px;
				background: #fff;
				&>view:nth-child(1){
					width: 100%;
					line-height: 1;
					&>view:nth-child(1){
						text-align: center;
						padding: 41px 0 35px 0;
					}
					&>view:nth-child(2){
						&>image{
							width:184px;
							height: 184px;
						}
					}
				}
				&>view:nth-child(2){
					position: fixed;
					bottom:0;
					z-index: 40;
					height:46px;
					width: 100%;
					border-top:1px solid #CBCBCB;
					&>text{
						width:50%;
						height: 100%;
						display: block;
						line-height: 46px;
						text-align: center;
					}
					&>text:nth-child(1){
						border-right: 1px solid #CBCBCB;
					}
				}
						
			}
		}
		
	}
</style>
