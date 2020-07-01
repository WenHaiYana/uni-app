<template>
	<view id="shopCollection">
		<view class="content">
			<view>
				<view class="fs_28 c_1a ff_cg fw_400">宜家（恒隆店）</view>
				<view v-if="wechat_code"><image :src="wechat_code"></image></view>
				<view v-if="alipay_code"><image :src="alipay_code"></image></view>
			</view>
			<view class="flex">
				<text class="fs_28 c_80 ff_cg fw_400" @tap="jump_()">取消</text>
				<text class="fs_28 c_1a fw_500 ff_zh" @tap="jump()">已支付</text>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default{
		data(){
			return{
				wechat_code:'',//微信收款码
				alipay_code:'',//支付宝收款码
				id:'',
				static:''
			}
		},
		onLoad(options) {
			this.id = options.id
			console.log(this.id)
			this.static = options.static
			this.wechat_code = uni.getStorageSync('wechat_code');
			this.alipay_code = uni.getStorageSync('alipay_code');
		},
		methods:{
			//
			back(){
				uni.navigateBack({})
			},
			jump_(){
				if(this.static==1){
					uni.navigateBack({
						delta:2
					})
				}else{
					uni.navigateBack({
						delta:1
					})
				}
				
			},
			jump(){
				uni.navigateTo({
					url:'/pages/app/account/modifyPay?id='+this.id + '&index=1'
				})
			},
			// confirm(){
			// 	uni.reLaunch({
			// 		url:'/pages/app/account/modifyPay?id='+this.id
			// 	})	
			// }
		}
	}
</script>

<style>
	page{
		background:rgba(216,216,216,1);
		border:1px solid rgba(151,151,151,1);
	}
</style>
<style lang="less" scoped>
	#shopCollection{
		.back{
			position: absolute;
			top:10upx;
			right:30upx;
		}
		.content{
			width:80%;
			height: 719upx;
			background: #fff;
			box-shadow:0px 2px 32px 0px rgba(0,0,0,0.06);
			position: absolute;
			z-index: 1;
			top:50%;left:50%;
			transform: translate(-50%, -50%);
			&>view:nth-child(1){
				height:629upx;
				width: 100%;
				border-bottom:1upx solid #CBCBCB;
				line-height: 1;
				&>view:nth-child(1){
					text-align: center;
					padding: 83upx 0 71upx 0;
				}
				&>view:nth-child(2){
					margin: 0 116px 59upx 116upx;
					&>image{
						width:367upx;
						height: 368upx;
					}
				}
			}
			&>view:nth-child(2){
				height:90upx;
				width: 100%;
				&>text{
					width:50%;
					height: 100%;
					display: block;
					line-height: 98upx;
					text-align: center;
				}
				&>text:nth-child(1){
					border-right: 1upx solid #CBCBCB;
				}
			}
		}
	}
</style>
