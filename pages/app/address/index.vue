<template>
	<view id="address">
		<view class="contact lh_1" style="margin-bottom: 94upx;">
			<text class="ff_zh c_1a fs_36 fw_500">联系人</text>
			<text class="ff_cg c_1a fs_26 fw_400">姓名</text>
			<view class="flex__align">
				<input type="text" placeholder="请填写安装人姓名" placeholder-style="color:#B3B3B3" v-model="name" @input="input1">
			</view>
			<text class="ff_cg c_1a fs_26 fw_400">手机号</text>
			<view class="flex__align">
				<input type="text" placeholder="请填写安装人手机号" placeholder-style="color:#B3B3B3" v-model="phone" @input="input2">
			</view>
		</view>
		<view class="contact" style="margin-bottom: 125upx;">
			<text class="ff_zh c_1a fs_36 fw_500">安装地址</text>
			<text class="ff_cg c_1a fs_26 fw_400">地址</text>
			<view class="flex__align">
				<input type="text" placeholder="请填写详细安装地址" placeholder-style="color:#B3B3B3" v-model="address" @input="input3">
			</view>
		</view>
		<view class="save fw_400 ff_cg fs_28 c_ff text-align" @tap="confirm()">保存</view>
	</view>
</template>

<script>
	const app = getApp()
	export default{
		data(){
			return{
				name:'',
				phone:'',
				address:''
			}
		},
		methods:{
			input1(e){
				var that = this;
				uni.setStorage({
					key: 'name',//属性名
					data: e.detail.value,
					
				});	
			},
			
			input2(e){
				var that = this;
				uni.setStorage({
					key: 'phone',//属性名
					data: e.detail.value,
					
				});	
			},
			input3(e){
				var that = this;
				uni.setStorage({
					key: 'address',//属性名
					data: e.detail.value,
					
				});	
			},
			confirm(){
				const that = this
				if(that.name==''){
					uni.showToast({
						title:'收货人姓名不能为空',
						icon:'none'
					})
					return
				}
				if(that.phone==''){
					uni.showToast({
						title:'手机号不能为空',
						icon:'none'
					})
					return
				}
				if(that.address==''){
					uni.showToast({
						title:'详细地址不能为空',
						icon:'none'
					})
					return
				}else{
					uni.showToast({
						title:'保存成功',
						icon:'none'
					})
					setTimeout(function(){
						uni.navigateBack({})
					},500)
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	#address{
		width:100%;
		height: 100%;
		.contact{
			&>text{
				display: block;
			}
			&>text:nth-of-type(1){
				height: 50upx;
				line-height: 50upx;
				margin:58upx 0 45upx 41upx;
			}
			&>text:nth-of-type(2){
				margin: 0 0 15upx 38upx;
				height: 37upx;
				line-height: 37upx;
			}
			&>view{
				height: 63upx;
				margin: 0 26upx 0 34upx;
				border-bottom:1upx solid #1a1a1a;
				&>input{
					width:100%;
					height: 37upx;
					line-height: 37upx;
				}
			}
			&>text:nth-of-type(3){
				height: 37upx;
				line-height: 37upx;
				margin: 24upx 0 15upx 38upx;
			}
		}
		.save{
			margin:0 30upx;
			border-radius: 10upx;
			height: 80upx;
			line-height: 80upx;
			letter-spacing: 2upx;
			background: #000;
		}
	}
</style>
