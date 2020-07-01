<template>
	<view id="modifyDiscount">
		<view class="content flex__between__center">
			<text class="fs_28 ff_cg fw_400 c_03">全场折扣</text>
			<view class="fs_26 fw_500 c_1a flex__align ">
				<picker @change="bindPickerChange" :value="i" :range="dropDown" range-key="num">
					<view>{{dropDown[i].num}}
						<text class="iconfont iconxiala1 fs_28" style="margin-left: 36upx;"></text>
					</view>
				</picker>
			</view>
		</view>
		<view class="forget fs_30 c_1a ff_cg fw_400" @tap="jump('/pages/app/mine/personal')">取消</view>
		<view class="confirm fs_30 c_ff ff_cg fw_400" @tap="confirm">保存</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data(){
			return{
				dropDown:[
					{num:'10'},
					{num:'1.5'},
					{num:'2'},
					{num:'2.5'},
					{num:'3'},
					{num:'3.5'},
					{num:'4'},
					{num:'4.5'},
					{num:'5'},
					{num:'5.5'},
					{num:'6'},
					{num:'6.5'},
					{num:'7'},
					{num:'7.5'},
					{num:'8'},
					{num:'8.5'},
					{num:'9'},
					{num:'9.5'},
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
			bindPickerChange(e){
				let index = e.detail.value
				console.log(index)
				this.i = e.target.value
				console.log(this.i)
			},
			confirm(e){
				const that = this
				app.$vm.getData({
					url:'Vip/editpreferrate',
					data:{
						prefer_rate:that.dropDown[that.i].num
					}
				}).then(res=>{
					if(res.code == 1){
						uni.navigateBack({
							
						})
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
		.content{
			width:100%;
			height: 95upx;
			background: #fff;
			border-bottom: 1upx solid #E6E6E6;
			margin-bottom: 248upx;
			&>text{
				margin-left: 18upx;
			}
			&>view{
				margin-right: 30upx;
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
