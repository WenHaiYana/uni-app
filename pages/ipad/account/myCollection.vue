<template>
	<view id="myCollection">
		<view class="content">
			<view>
				<view class="fs_28x c_1a ff_cg fw_400 flex__center__center">
					<view :class="loads.index == index?'active1':''" v-for="(item,index) in nav_list" :key="index" @click="setIndex(item.status)">
						<text :class="loads.index == index?'active':''">{{item.text}}</text>
					</view>
				</view>
				<view v-if="loads.index==0" class="flex__center"><image :src="personalData.wechat_code"></image></view>
				<view v-if="loads.index==1"  class="flex__center"><image :src="personalData.alipay_code"></image></view>
			</view>
			<view class="flex">
				<text class="fs_28x c_80 ff_cg fw_400" @click="sourceTypeChange">更换</text>
				<text class="fs_28x c_1a fw_500 ff_zh" @tap="confirm">保存</text>
			</view>
			<view class="back iconfont iconcuohao" style="font-size: 23px;" @tap="back"></view>
		</view>
	</view>
</template>

<script>
	// const app = getApp()
	export default{
		data(){
			return{
				loads:{
					index:0,
				},
				wechat_code:'',
				alipay_code:'',
				personalData:{
					wechat_code:'',
					alipay_code:'',
				},
				nav_list:[
					{text:'微信',status: 0},
					{text:'支付宝',status: 1},
				] 
			}
		},
		onLoad(options) {
			this.loads.index = options.index
		},
		onShow() {
			this.getRedult()
		},
		methods:{
			back(){
				uni.navigateTo({
					url:'/pages/ipad/account/verifyPassword'
				})
			},
			//数据切换
			setIndex(index){
				this.loads.index=index;
			},
			//数据
			getRedult(){
				const that = this
				that.getData({
					url:'Vip/getUserInfo',
					data:{}
				}).then(res=>{
					if(res.code == 1){
						this.personalData= res.data
					}
				})
			},
			//保存
			confirm(){
				const that = this
				if(this.loads.index==1){
					that.getData({
						url:'Vip/editalipaycode',
						data:{
							alipay_code:this.alipay_code
						}
					}).then(res=>{
						if(res.code == 1){
							uni.showToast({
								title:"上传成功",
								icon:"none"
							})
							this.getRedult()
						}
					})
				}else{
					that.getData({
						url:'Vip/editwechatcode',
						data:{
							wechat_code:this.wechat_code
						}
					}).then(res=>{
						if(res.code == 1){
							uni.showToast({
								title:"上传成功",
								icon:"none"
							})
							this.getRedult()
						}
					})
				}
				
			},
			//上传方式选择
			sourceTypeChange: function(e) {
				var that = this,obj = {}
				uni.chooseImage({
					count: 1,
					sourceType: ['album','camera'],
					success: function(res){
						that.pictureUpload(res.tempFilePaths[0])
					}
				})
			},
			//头像上传
			pictureUpload:function(image){
				var that = this
				uni.showLoading({
					title: '头像上传中，请稍后'
				})
				// console.log(image)
				uni.uploadFile({
					url: "https://sxclapp.jucheng01.net/applet.php/Basic/saveFile",
					filePath: image,
					name: 'file',
					header:{
						'content-type': 'application/x-www-form-urlencoded',
					},
					success: (response) => {
						if(response.statusCode == 200){
							uni.showToast({
								title:'上传成功',
								icon:"none"
							})
							setTimeout(function(){
								var res = JSON.parse(response.data)
								that.alipay_code = res.data.url;
								that.wechat_code = res.data.url;
								uni.hideLoading()
								that.getRedult()
							},500)
						}else{
							uni.showToast({
								title:'上传失败',
								icon:"none"
							})
						}
					}
				})
			},
					
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
	#myCollection{
		.back{
			position: absolute;
			top:10px;
			right:15px;
		}
		.content{
			width:80%;
			height: 358px;
			background: #fff;
			box-shadow:0px 2px 32px 0px rgba(0,0,0,0.06);
			position: absolute;
			z-index: 1;
			top:50%;left:50%;
			transform: translate(-50%, -50%);
			&>view:nth-child(1){
				width: 100%;
				border-bottom:1px solid #CBCBCB;
				line-height: 1;
				&>view:nth-child(1){
					text-align: center;
					margin: 30px 0 35px 0;
					height: 30px;
					line-height: 30px;
					color: #999;
					line-height: 1;
					&>view:nth-child(1){
						margin-right: 26px;
						font-size:16px;
						
					}
					.active{
						color: #1A1A1A;
						font-size: 17px;
						font-family: "中黑体";
						font-weight:Medium;
					}
					.active1{
						height: 100%;
						border-radius: 1px;
						border-bottom:2px solid #1A1A1A;
					}
				}
				&>view:nth-child(2){
					width:100%;
					&>image{
						width:183px;
						height: 184px;
					}
				}
			}
			&>view:nth-child(2){
				height:90px;
				width: 100%;
				overflow: hidden;
				&>text{
					width:50%;
					height: 100%;
					display: block;
					line-height: 90px;
					text-align: center;
				}
				&>text:nth-child(1){
					border-right: 1px solid #CBCBCB;
				}
			}
		}
	}
</style>

