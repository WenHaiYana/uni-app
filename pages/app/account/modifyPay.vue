<template>
	<view id="modifyPay">
		<view class="content flex__between__center">
			<text class="fs_28 ff_cg fw_400 c_03">已支付</text>
			<view class="fs_26 fw_500 c_1a flex__between__center">
				<input type="digit" v-model="paid_money"/>
				<text>元</text>
			</view>
		</view>
		<view class="forget fs_30 c_1a ff_cg fw_400" @tap="jump()">取消</view>
		<view class="confirm fs_30 c_ff ff_cg fw_400" @tap="confirm">保存</view>
	</view>
</template>


<script>
	const app = getApp()
	export default{
		data(){
			return{
				paid_money:'',
				id:'',//订单id
				index:''
			}
		},
		onLoad(options) {
			this.id = options.id
			console.log(this.id)
			this.index = options.index
		},
		methods:{
			jump(){
				if(this.index==1){
					uni.navigateBack({
						delta:2
					})
				}else{
					uni.navigateBack({
						delta:1
					})
				}
				
			},
			confirm(){
				const that = this
				app.$vm.getData({
					url:'Mall/orderPayPart',
					data:{
						paid_money:this.paid_money,
						order_id:this.id,
					}
				}).then(res=>{
					if(res.code == 1){
						if(this.index==1){
							uni.navigateBack({
								delta:2
							})
						}else{
							uni.navigateBack({
								delta:1
							})
						}
					}else{
						uni.showToast({
							title:res.message,
							icon:'none'
						})
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	#modifyPay{
		width:100%;
		height: 100%;
		.content{
			width: 100%;
			height: 95upx;
			background: #fff;
			border-bottom: 1upx solid #E6E6E6;
			margin-bottom: 248upx;
			&>text{
				margin: 0 18upx;
				display: block;
				width: 20%;
			}
			&>view{
				width: 100%;
				height: 100%;
				margin-right: 42upx;
				&>input{
					width: 100%;
					height: 100%;
					text-align: right;
				}
				&>text{
					margin-left: 20upx;
				}
			}
		}
		.forget{
			margin: 0 30upx 30upx;
			line-height: 90upx;
			height: 90upx;
			text-align: center;
			letter-spacing: 2upx;
			background:#FFFFFF;
			border:2upx solid #1A1A1A;
		}
		.confirm{
			margin: 0 30upx;
			line-height: 90upx;
			height: 90upx;
			text-align: center;
			letter-spacing: 2upx;
			background:#000;
			border:2upx solid #1A1A1A;
		}
	}
</style>
