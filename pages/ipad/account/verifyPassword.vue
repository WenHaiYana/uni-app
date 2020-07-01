<template>
	<view id="personal">
		<view class="header flex__between__center">
			<view class="headerLeft flex__between__center">
				<view :class="loads.index==index?'c_03 ff_zh fw_400 fs_40x':''" v-for="(item,index) in nav_list" :key="index" @tap="jump(item.path)" @click="tabIndex(index)" class="fs_30x ff_zh fw_400 c_03">{{item.title}}</view>
			</view>
			<view class="headerCorter flex__center__center ff_cg c_1a fw_400 fs_40x">
				璟奕家纺
			</view>
			<view class="headerRight flex__end__center">
				<view class="flex__align" @click="sourceTypeChange">
					<text class="iconfont iconshangchuantupian" style="font-size: 15px;"></text>
					<text class="c_03 fw_400 fs_30x ff_cg">上传头像</text>
				</view>
				<view class="flex" @tap="jump('/pages/ipad/mine/login')">
					<view class="flex__align">
						<image src="../../../static/images/qh.png"></image>
					</view>
					<text class="c_03 fw_400 fs_30x ff_cg">切换账号</text>
				</view>
			</view>
		</view>
		
		<view class="content">
			<view class="information flex">
				<image :src="headerPic?headerPic:'/../../../static/images/txj@2x.png'"></image>
				<view class="flex__between">
					<view class="information_lf">
						<view class="ff_zh fw_500 c_1a fs_40x" style="letter-spacing: 3upx;">{{personalData.user_name}}</view>
						<view class="ff_zh fw_500 c_1a fs_40x">{{personalData.mobile_phone}}</view>
						<view class="ff_zc fw_800 fs_34x" @tap="jump('/pages/ipad/account/modifyDiscount?discount='+personalData.prefer_rate)">
							<text style="color: #FFAA84;">{{personalData.prefer_rate}}</text>
							<text class="c_1a">折优惠</text>
							<text class="iconfont icon-bianji" style="font-size: 16px;margin-left: 4px;"></text>
						</view>
						<view class="ff_cg fw_400 fs_24x c_1a" v-if="personalData.use_limit_time>0">账号剩余可用时长：{{personalData.use_limit_time}}小时</view>
					</view>
					<view class="information_rg flex__between" @tap="jump('/pages/ipad/account/myCollection?index=0')">
						<view>
							<view class="flex__center" style="padding-top: 80upx;"><image src="../../../static/images/sk.png"></image></view>
							<view class="ff_zh fs_24x c_1a fw_400">我的收款码</view>
						</view>
					</view>
				</view>
			</view>
			<view class="income flex__between__center">
				<view>
					<text class="fw_500 c_1a fs_40x" style="font-family: 'Avenir Medium';">{{personalData.today_income}}</text>
					<text class="fw_400 ff_zh fs_30x">今日收入(元)</text>
				</view>
				<view>
					<text class="fw_500 c_1a fs_40x" style="font-family: 'Avenir Medium';">{{personalData.mouth_income}}</text>
					<text class="fw_400 ff_zh fs_30x">本月收入（元）</text>
				</view>
				<view>
					<text class="fw_500 c_1a fs_40x" style="font-family: 'Avenir Medium';">{{personalData.all_income}}</text>
					<text class="fw_400 ff_zh fs_30x">累计总收入（元）</text>
				</view>
			</view>
			<view class="my flex__between__center c_ff">
				<view v-for="(item,index) in my_list" :key="index" @tap="jump(item.path)">
					<text class="fw_500 fs_30x" style="font-family: 'Avenir Book';">{{item.e}}</text>
					<text class="fw_400 ff_zh fs_30x">{{item.name}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default{
		data(){
			return{
				loads:{
					index: 3
				},
				headerPic:'',
				personalData:[],
				data:[],
				mobile_phone:'',
				nav_list:[
					{
						title:'首页',
						path:'/pages/ipad/mall/index'
					},
					{
						title:'产品',
						path:'/pages/ipad/mall/sort'
					},
					{
						title:'购物车',
						path:'/pages/ipad/mall/cart'
					},
					{
						title:'我的',
						path:'/pages/ipad/mine/personal'
					},
				],
				my_list:[
					{
						name:'我的订单',
						e:'Order',
						path:'/pages/ipad/mall/myOrder'
					},
					{
						name:'DIY窗帘',
						e:'Window curtains',
						path:'/pages/ipad/mall/myCurtain'
					},
					{
						name:'我的收藏',
						e:'Collection',
						path:'/pages/ipad/mall/myCollect'
					}
				]
			}
		},
		onLoad() {
			const that = this
			// if(that.personalData.is_reg==0){
			// 	uni.showToast({
			// 		title:"你还没有注册，请先注册",
			// 		icon:'none'
			// 	})
			// 	setTimeout(function(){
			// 		// uni.reLaunch({
			// 		// 	url:'/pages/app/mine/login'
			// 		// })
			// 	},1000)
			// }
			// this.getRedult()
			
		},
		onShow() {
			this.getRedult1()
		},
		methods:{
			//
			jump(url){
				uni.redirectTo({
					url:url
				})
			},
			//
			tabIndex(index){
				this.loads.index = index
			},
			//数据
			getRedult(){
				const that = this
				this.getData({
					url:'Vip/getUserInfo',
					data:{}
				}).then(res=>{
					if(res.code == 1){
						that.personalData = res.data
						that.headerPic = res.data.headimgurl
						that.mobile_phone = res.data.mobile_phone
					}
					uni.navigateTo({
						url:'/pages/app/account/verifyPassword?mobile_phone='+that.mobile_phone
					})
				})
			},
			getRedult1(){
				const that = this
				this.getData({
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
				this.getData({
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
			height: 70px;
			position: fixed;
			z-index: 5;
			background: #fff;
			// background: red;
			.headerLeft{
				margin-left: 10px;
				width:33%;
				height: 100%;
			}
			.headerCorter{
				width:33%;
				height: 100%;
			}
			.headerRight{
				width:33%;
				height: 100%;
				margin-right: 10px;
				&>view:nth-child(1){
					margin-right: 22px;
				}
				&>view:nth-child(2){
					margin-left: 10px;
					line-height: 1;
					&>view{
						&>image{
							width:18px;
							height: 18px;
						}
					}
				}
			}
		}	
		
		.content{
			width: 100%;
			height: 100%;
			padding-top: 70px;
			.information{
				width:100%;
				background: #FCFCFC;
				&>image{
					width:110px;
					height: 110px;
					border-radius: 15px;
					margin: 52px 26px 58px 108px;
				}
				&>view{
					margin-right: 108px;
					margin-top: 56px;
					width:50%;
					.information_lf{
						line-height: 1;
						&>view{
							padding:3px 0;
							margin-bottom: 9px;
							letter-spacing: 1px;
						}
						&>view:nth-child(4){
							border:1px solid #1a1a1a;
							padding: 3px 8px;
							margin-top: 14px;
						}
					}
					.information_rg{
						height: 100%;
						&>view{
							line-height: 1;
							letter-spacing: 1px;
							&>view{
								&>image{
									width:21px;
									height: 21px;
									margin-bottom: 6px
								}
							}
						}
					}
				}
			}
			.income{
				margin: 27px 108px 48px 108px;
				height: 100%;
				&>view{
					width: 32%;
					height: 90px;
					background:rgba(255,255,255,1);
					border:1px solid rgba(26,26,26,1);
					text-align: center;
					&>text{
						display: block;
					}
					&>text:nth-child(1){
						margin-bottom: 3px;
						margin-top: 21px;
					}
				}
			}
			.my{
				margin: 0 108px;
				height: 100%;
				&>view{
					width: 32%;
					height: 90px;
					background:rgba(26,26,26,1);
					text-align: center;
					&>text{
						display: block;
						letter-spacing: 1px;
					}
					&>text:nth-child(1){
						margin-bottom: 3px;
						margin-top: 21px;
					}
				}
			}
		}
	}
</style>
