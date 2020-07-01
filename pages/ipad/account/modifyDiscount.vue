<template>
	<view id="modifyDiscount">
		<view class="header flex__align" @tap="goBack">
			<image src="../../../static/images/fh.png" @tap="goBank()"></image>
			<text class="fs_34x fw_400 ff_cg c_03">全场折扣</text>
		</view>
		<view class="conter">
			<view class="content flex__between__center">
				<text class="fs_28x ff_cg fw_400 c_03">全场折扣</text>
				<view class="fs_26x fw_500 c_1a flex__align ">
					<picker @change="bindPickerChange" :value="i" :range="dropDown" range-key="num">
						<view>{{dropDown[i].num}}
							<text class="iconfont iconxiala1 fs_28x" style="margin-left: 36upx;"></text>
						</view>
					</picker>
				</view>
			</view>
			<view class="forget fs_30x c_1a ff_cg fw_400" @tap="jump('/pages/ipad/mine/personal')">取消</view>
			<view class="confirm fs_30x c_ff ff_cg fw_400" @tap="confirm">保存</view>
		</view>
	</view>
</template>


<script>
	const app = getApp()
	export default {
		data(){
			return{
				dropDown:[
					{num:'10'},
					{num:'9'},
					{num:'8'},
					{num:'7'},
					{num:'6'},
					{num:'5'},
					{num:'4'},
					{num:'3'},
					{num:'2'},
					{num:'1'},
				],
				discount:'',
				i:0,
			}
		},
		onLoad(options) {
			this.discount = options.discount
			console.log(this.discount)
		},
		methods:{
			goBack(){
				uni.navigateBack({})
			},
			bindPickerChange(e){
				let index = e.detail.value
				this.i = e.target.value
			},
			confirm(e){
				const that = this
				that.getData({
					url:'Vip/editpreferrate',
					data:{
						prefer_rate:that.dropDown[that.i].num
					}
				}).then(res=>{
					if(res.code == 1){
						uni.navigateBack({})
					}
				})
			},
		}
		
	}
</script>

<style lang="less" scoped>
	#modifyDiscount{
		width:100%;
		height: 100%;
		//头部
		.header{
			width: 100%;
			height: 70px;
			position: fixed;
			z-index: 1;
			// background: #fff;
			background: red;
			&>image{
				width:23px;
				height: 23px;
				margin: 0 10px 0 23px;
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
				width:100%;
				height:60px;
				background: #fff;
				border-bottom: 1px solid #E6E6E6;
				margin-bottom: 66px;
				&>text{
					margin-left: 9px;
				}
				&>view{
					margin-right: 15px;
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
