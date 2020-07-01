<template>
	<view id="address">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="header flex__align">
			<image src="../../../static/images/fh.png" @tap="goBack()"></image>
			<text class="fs_34x fw_400 ff_cg c_03">编辑地址</text>
		</view>
		<view class="contact lh_1" style="margin-bottom: 94upx;padding-top: 100upx;">
			<text class="ff_zh c_1a fs_36x fw_500">联系人</text>
			<text class="ff_cg c_1a fs_26x fw_400">姓名</text>
			<view class="flex__align">
				<input type="text" placeholder="请填写收货人姓名" placeholder-style="color:#B3B3B3" v-model="name" @input="input1" class="fs_26x">
			</view>
			<text class="ff_cg c_1a fs_26x fw_400">手机号</text>
			<view class="flex__align">
				<input type="text" placeholder="请填写收货人手机号" placeholder-style="color:#B3B3B3" v-model="phone" @input="input2" class="fs_26x">
			</view>
		</view>
		<view class="contact" style="margin-bottom: 100upx;">
			<text class="ff_zh c_1a fs_36x fw_500">安装地址</text>
			<text class="ff_cg c_1a fs_26x fw_400">地址</text>
			<view class="flex__align">
				<input type="text" placeholder="请填写详细地址" placeholder-style="color:#B3B3B3" v-model="address" @input="input3" class="fs_26x">
			</view>
		</view>
		<view class="save fw_400 ff_cg fs_28x c_ff flex__end__center">
			<view @tap="confirm()">保存</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				name:'',
				phone:'',
				address:''
			}
		},
		methods:{
			goBack(){
				uni.navigateBack({})
			},
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
				margin: 0 10px 0 22px;
			}
		}
		.contact{
			&>text{
				display: block;
			}
			&>text:nth-of-type(1){
				height: 25px;
				line-height: 25px;
				margin:29px 0 22px 30px;
			}
			&>text:nth-of-type(2){
				margin: 0 0 8px 30px;
				height: 19px;
				line-height: 19px;
			}
			&>view{
				height: 32px;
				margin: 0 30px;
				border-bottom:1px solid #1a1a1a;
				&>input{
					width:100%;
					height: 19px;
					line-height: 19px;
				}
			}
			&>text:nth-of-type(3){
				height: 19px;
				line-height: 19px;
				margin: 12px 0 8px 30px;
			}
		}
		.save{
			width: 100%;
			height: 40px;
			&>view{
				width:193px;
				border-radius: 5px;
				height: 40px;
				line-height: 40px;
				letter-spacing: 1px;
				text-align: center;
				background: #000;
				margin-right: 30px;
			};
		}
	}
</style>
