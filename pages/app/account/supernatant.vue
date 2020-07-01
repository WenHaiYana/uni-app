<template>
	<view id="supernatant">
		<view class="content">
			<view class="flex__center__center">
				<view class="fs_28 c_1a ff_cg fw_400">所选产品高低 >2.75m 是否需要增加加高产品</view>
			</view>
			<view class="flex">
				<text class="fs_28 c_80 ff_cg fw_400" @tap="no">否</text>
				<text class="fs_28 c_1a fw_500 ff_zh" @tap="jump()">是</text>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default{
		data(){
			return{
				type:'',
				cart_product:[],
				id:'',
				static:'',
			}
		},
		onLoad(options) {
			this.static = options.static
			this.id = options.id
			var a = decodeURIComponent(options.cart_product)
			this.cart_product = JSON.parse(a); // 字符串转对象
			// console.log(this.cart_product)
		},
		methods:{
			no(){
				uni.navigateTo({
					url:'/pages/app/account/shopCollection?static=1'+"&id="+this.id
				})
			},
			jump(){
				const that = this
				// console.log(that.cart_product[0])
				if(that.static==2){
					app.$vm.getData({
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
								uni.switchTab({
									url:'/pages/app/mall/index'
								})
							},500)
						}else{
							uni.showToast({
								title: res.message,
								icon: 'none'
							});
						}
					})
				}else{
					uni.switchTab({
						url:'/pages/app/mall/index'
					})
				}
				
			}
			
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
	#supernatant{
		.content{
			width:80%;
			height: 355upx;
			background: #fff;
			box-shadow:0px 2px 32px 0px rgba(0,0,0,0.06);
			position: absolute;
			z-index: 1;
			top:50%;left:50%;
			transform: translate(-50%, -50%);
			&>view:nth-child(1){
				height:264upx;
				width: 100%;
				border-bottom:1upx solid #CBCBCB;
				&>view{
					margin: 0 98upx 0 115upx;
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
