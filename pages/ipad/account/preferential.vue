<template>
	<view id="modifyPay">
		<view class="header flex__align">
			<image src="../../../static/images/fh.png" @tap="jump_()"></image>
			<text class="fs_34x fw_400 ff_cg c_03">优惠</text>
		</view>
		<view class="conter">
			<view class="content flex__between__center">
				<text class="fs_28x ff_cg fw_400 c_03">已优惠</text>
				<view class="fs_26x fw_500 c_1a flex__between__center">
					<input type="digit" style="padding-top: 13px;" v-model="num" @input="input">
					<text style="margin-top: 10px;">元</text>
				</view>
			</view>
			<view class="forget fs_30x c_1a ff_cg fw_400" @tap="jump_()">取消</view>
			<view class="confirm fs_30x c_ff ff_cg fw_400" @tap="jump_()">保存</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				num:''
			}
		},
		methods:{
			jump_(){
				uni.navigateBack({})
			},
			input(e){
				var that = this;
				this.num = e.detail.value
				uni.setStorage({
					key: 'num1',//属性名
					data: e.detail.value,
					
				});
		
			}
		}
	}
</script>

<style lang="less" scoped>
	#modifyPay{
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
				height:23px;
				margin: 0 10px 0 22px;
			}
		}
		.conter{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width:60%;
			background: #fff;
			.content{
				width: 100%;
				height: 60px;
				background: #fff;
				border-bottom: 1px solid #E6E6E6;
				margin-bottom: 66px;
				&>text{
					margin: 0 9px;
					display: block;
					width: 22%;
				}
				&>view{
					width: 70%;
					height: 100%;
					margin-right: 21px;
					line-height: 60px;
					&>input{
						width: 100%;
						height: 100%;
						text-align: right;
					}
					&>text{
						margin-left: 10px;
					}
				}
			}
			.forget{
				margin: 0 15px 25px 15px;
				line-height: 45px;
				height: 45px;
				text-align: center;
				letter-spacing: 1px;
				background:#FFFFFF;
				border:1px solid #1A1A1A;
			}
			.confirm{
				margin: 0 15px;
				line-height: 45px;
				height: 45px;
				text-align: center;
				letter-spacing: 1px;
				background:#000;
				border:1px solid #1A1A1A;
			}
		}
		
	
	}
</style>
