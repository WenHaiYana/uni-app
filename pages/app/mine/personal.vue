<template>
	<view id="verifyPassword">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="password">
			<view class="phone">
				<view class="fs_28 c_03 ff_cg fw_400">登录手机号</view>
				<view class="fs_40 c_03 ff_cg fw_400">{{mobile_phone_}}</view>
				<!-- <input type="number" v-model="phone"> -->
			</view>
			<view class="password">
				<view class="fs_28 c_03 ff_cg fw_400">密码</view>
				<view class="fs_30 c_03 ff_cg fw_400">
					<input type="password" placeholder="请输入密码" placeholder-style="color:#B3B3B3" v-model="password">
				</view>
			</view>
			<view class="forget fs_30 c_1a ff_cg fw_400" @tap="jump('/pages/app/mine/forgotPassword')">忘记密码</view>
			<view class="confirm fs_30 c_ff ff_cg fw_400" @tap="confirm">确定</view>
		</view>
	</view>

</template>

<script>
	const app = getApp()
	export default{
		data(){
			return{
				isShow:true,
				password:'',
				tel:'',
				user_id:'',
				app_code:'',
				headerPic:'',
				personalData:[],
				data:[],
				mobile_phone:'',
				mobile_phone_:'',
			}
		},
		onShow(options) {
			// this.isShow = true
			this.password =""
			this.getRedult()
		},
		methods:{
			//跳转-忘记密码
			jump(url){
				uni.navigateTo({
					url:url
				})
			},
			//数据
			getRedult(){
				const that = this
				app.$vm.getData({
					url:'Vip/getUserInfo',
					data:{}
				}).then(res=>{
					if(res.code == 1){
						that.personalData = res.data
						that.headerPic = res.data.headimgurl
						that.mobile_phone = res.data.mobile_phone
						this.tel = res.data.mobile_phone;
						this.tel = "" + this.tel;
						this.mobile_phone_ = this.tel.substr(0,3) + "****" + this.tel.substr(7)
						this.user_id = uni.getStorageSync('user_id')
						this.app_code = uni.getStorageSync('app_code')
					}
					
				})
			},
			//上传头像数据
			getRedult_phone(){
				const that = this
				app.$vm.getData({
					url:'Vip/editheadimgurl',
					data:{
						headimgurl:this.headerPic
					}
				}).then(res=>{
					if(res.code == 1){
						uni.showToast({
							title:"上传成功",
							icon:"none"
						})
					}
				})
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
				console.log(image)
				uni.uploadFile({
					url: "https://sxclapp.jucheng01.net/applet.php/Basic/saveFile",
					filePath: image,
					name: 'file',
					header:{
						'content-type': 'application/x-www-form-urlencoded',
					},
					success: (response) => {
						var res = JSON.parse(response.data)
						that.headerPic = res.data.url;
						uni.hideLoading()
						that.getRedult_phone()
					}
				})
			},		
			confirm(){
				const that= this
				app.$vm.getData({
					url:'Vip/checkPassword',
					data:{
						mobile_phone:that.tel,
						user_id:that.user_id,
						app_code:that.app_code,
						password:that.password
					}
				}).then(res=>{
					if(res.code == 1){
						uni.showToast({
							title:res.message,
							icon:"none"
						})
						setTimeout(function(){
							uni.navigateTo({
								url:'/pages/app/account/verifyPassword'
							})
						},300)
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #fff;
	}
	
	.top_view {
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		background-color: #fff;
		top: 0;
		z-index: 999;
	}
	#verifyPassword{
		width:100%;
		height: 100%;
		.password{
			width:100%;
			height: 100%;
			padding-top: 50upx;
			.phone{
				width:100%;
				height:138upx;
				border-bottom:1upx solid #E6E6E6;
				letter-spacing: 4upx;
				&>view:nth-child(1){
					margin: 21upx 0 10upx 15upx;
					height: 40upx;
					line-height: 40upx;
					
				}
				&>view:nth-child(2){
					margin: 0 0 10upx 15upx;
					height: 56upx;
					line-height: 56upx;
					
				}
			}
			.password{
				width:100%;
				height:230upx;
				border-bottom:1upx solid #E6E6E6;
				letter-spacing: 4upx;
				margin-bottom: 140upx;
				&>view:nth-child(1){
					margin: 21upx 0 10upx 15upx;
					height: 40upx;
					line-height: 40upx;
					
				}
				&>view:nth-child(2){
					margin: 35upx 0 10upx 15upx;
					height: 56upx;
					line-height: 56upx;
					&>input{
						width:100%;
						height: 100%;
					}
				}
			}
			.forget{
				margin: 0 30upx 50upx 30upx;
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
		.personal{
			width:100%;
			height: 100%;
			.header{
				width: 100%;
				height: 100upx;
				position: fixed;
				z-index: 1;
				background: #fff;
				&>view{
					margin-right: 30upx;
					height: 100%;
					&>text{
						margin-right: 20upx;
					}
				}
				
			}
			.content{
				width:100%;
				height: 100%;
				padding-top: 100upx;
				.information{
					width: 100%;
					height: 300upx;
					background: #FAFAFA;
					&>image{
						width:150upx;
						height: 150upx;
						border-radius:30upx;
						margin:21upx 30upx 0;
					}
					.content-conter{
						margin:21upx 61upx 0 0;
						line-height: 1;
						&>text{
							display: block;
						}
						&>text:nth-child(1){
							height: 56upx;
							line-height: 56upx;
							margin-bottom: 18upx;
							letter-spacing: 3upx;
						}
						&>text:nth-child(2){
							height: 44upx;
							line-height: 44upx;
							margin-bottom: 12upx;
							letter-spacing: 2upx;
						}
						&>text:nth-child(3){
							height: 46upx;
							line-height: 46upx;
							margin-bottom: 21upx;
						}
						&>text:nth-child(4){
							padding: 3upx 13upx;
							height: 46upx;
							line-height: 46upx;
							border:1upx solid #333;
							letter-spacing: 2upx;
						}
					
					}
					.content-rigth{
						height: 100%;
						&>text{
							display: block;
						}
						&>view{
							margin-top: 107upx;
							&>image{
								width:40upx;
								height: 36upx;
							}
						}
					}
				}
				.income{
					margin: 0 30upx 43upx 30upx;
					&>view{
						width: 30%;
						height: 140upx;
						border:1upx solid #1a1a1a;
						text-align: center;
						line-height: 70upx;
						background: #fff;
						&>text{
							display: block;
						}
						&>text:nth-child(1){
							height: 44upx;
							line-height: 44upx;
							margin: 30upx 0 9upx 0;
						}
						&>text:nth-child(2){
							height: 30upx;
							line-height: 30upx;
						}
					}
				}
				.my{
					margin: 0 30upx 43upx 30upx;
					&>view{
						width: 30%;
						height: 140upx;
						border:1upx solid #1a1a1a;
						text-align: center;
						line-height: 70upx;
						background: #000;
						&>text{
							display: block;
						}
						&>text:nth-child(1){
							height: 44upx;
							line-height: 44upx;
							margin: 30upx 0 9upx 0;
						}
						&>text:nth-child(2){
							height: 30upx;
							line-height: 30upx;
						}
					}
				}
				.switchAccount{
					margin: 30upx;
					height: 90upx;
					border:1upx solid #1a1a1a;
					&>view{
						margin-right: 20upx;
						line-height: 1;
						&>image{
							width:36upx;
							height: 36upx;
						}
					}
				}
			}
		}
	}
</style>
