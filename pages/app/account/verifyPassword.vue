<template>
	<view id="personal">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="header flex__between__center">
			<view class="flex__align" @tap="goBack()">
				<image src="../../../static/images/fh.png"></image>
				<text>我的</text>
			</view>
			<view class="flex__align" @click="sourceTypeChange">
				<text class="iconfont iconshangchuantupian fs_34"></text>
				<text class="fw_400 fs_26 ff_cg c_1a">更换头像</text>
			</view>
		</view>
		<view class="content">
			<view class="information flex">
				<image :src="headerPic?headerPic:'/../../../static/images/txj@2x.png'"></image>
				<view class="content-conter">
					<text class="fw_500 ff_zh fs_40 c_1a">{{personalData.user_name}}</text>
					<text class="fw_400 ff_cg fs_32 c_1a">{{personalData.mobile_phone}}</text>
					<text class="fs_34" @tap="jump('/pages/app/account/modifyDiscount?discount='+personalData.prefer_rate)">
						<text style="color: #FFAA84;">{{personalData.prefer_rate}}</text>
						<text style="margin-right: 16upx;">折优惠</text>
						<text class="iconfont icon-bianji fs_34"></text>
					</text>
					<text class="fs_24 fw_400 ff_cg c_1a" v-if="personalData.use_limit_time>0">可用时长：{{personalData.use_limit_time}}时</text>
				</view>
				<view class="content-rigth text-align" @tap="jump('/pages/app/account/myCollection?index=0')">
					<view>
						<image src="../../../static/images/sk.png"></image>
					</view>
					<text class="ff_zh fs_24 c_1a fw_500">我的收款码</text>
				</view>
			</view>
			<view class="income flex__between__center">
				<view>
					<text class="fw_500 c_1a fs_22" style="font-family: 'Avenir Medium';">{{personalData.today_income}}</text>
					<text class="fw_400 ff_cg c_98 fs_22">今日收入(元)</text>
				</view>
				<view>
					<text class="fw_500 c_1a fs_22" style="font-family: 'Avenir Medium';">{{personalData.mouth_income}}</text>
					<text class="fw_400 ff_cg c_98 fs_22">本月收入（元）</text>
				</view>
				<view>
					<text class="fw_500 c_1a fs_22" style="font-family: 'Avenir Medium';">{{personalData.all_income}}</text>
					<text class="fw_400 ff_cg c_98 fs_22">累计总收入（元）</text>
				</view>
			</view>
			<view class="my flex__between__center c_ff">
				<view v-for="(item,index) in my_list" :key="index" @tap="jump(item.path)">
					<text class="fw_500 fs_22" style="font-family: 'Avenir Book';">{{item.e}}</text>
					<text class="fw_400 ff_zh fs_22">{{item.name}}</text>
				</view>
			</view>
			<view class="switchAccount flex__center__center" @tap="jump('/pages/app/mine/login')">
				<view class="flex__align">
					<image src="../../../static/images/qh.png"></image>
				</view>
				<text class="fw_400 ff_cg c_1a fs_28" style="letter-spacing: 2upx;">切换账号</text>
			</view>
		</view>
	
	</view>
</template>

<script>
	const app = getApp()
	export default{
		data(){
			return{
				headerPic:'',
				personalData:[],
				data:[],
				mobile_phone:'',
				my_list:[
					{
						name:'我的订单',
						e:'Order',
						path:'/pages/app/mall/myOrder'
					},
					{
						name:'DIY窗帘',
						e:'Window curtains',
						path:'/pages/app/mall/myCurtain'
					},
					{
						name:'我的收藏',
						e:'Collection',
						path:'/pages/app/mall/myCollect'
					}
				]
			}
		},
		onShow() {
			this.getRedult()
			
		},
		methods:{
			//返回
			goBack(){
				uni.navigateBack({})
			},
			//跳转
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
	#personal{
		width:100%;
		height: 100%;
		.header{
			width: 100%;
			height: 100upx;
			position: fixed;
			z-index: 1;
			background: #fff;
			&>view:nth-child(1){
				margin-left: 30upx;
				margin-right: 69upx;
				height: 100%;
				&>image{
					margin-right:21upx; 
					width: 34upx;
					height: 32upx;
				}
			}
			&>view:nth-child(2){
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
</style>