<template>
	<view id="verifyPassword">
		<view class="header flex__between__center">
			<view class="headerLeft flex__between__center">
				<view :class="loads.index==index?'c_03 ff_zh fw_400 fs_40x':''" v-for="(item,index) in nav_list" :key="index" @tap="jump(item.path)" @click="tabIndex(index)" class="fs_30x ff_zh fw_400 c_03">{{item.title}}</view>
			</view>
			<view class="headerCorter flex__center__center ff_cg c_1a fw_400 fs_40x">
				璟奕家纺
			</view>
			<view class="headerRight flex__end__center">
				
			</view>
		</view>
		<!-- <view class="header_1 flex__align">
			<image src="../../../static/images/fh.png" @tap="goBank()"></image>
			<text class="fs_34x fw_400 ff_cg c_03">验证密码</text>
		</view> -->
		<view class="content">
			<view class="phone">
				<view class="fs_28x c_03 ff_cg fw_400">登录手机号</view>
				<view class="fs_40x c_03 ff_cg fw_400">{{mobile_phone_}}</view>
			</view>
			<view class="password">
				<view class="fs_28x c_03 ff_cg fw_400">密码</view>
				<view class="fs_30x c_03 ff_cg fw_400">
					<input type="password" placeholder="请输入密码" placeholder-style="color:#B3B3B3" v-model="password" class="fs_40x">
				</view>
			</view>
			<view class="forget fs_30x c_1a ff_cg fw_400" @tap="jump('/pages/ipad/mine/forgotPassword')">忘记密码</view>
			<view class="confirm fs_30x c_ff ff_cg fw_400" @tap="confirm">确定</view>
		</view>
		
	</view>
</template>


<script>
	// const app = getApp()
	export default{
		data(){
			return{
				loads:{
					index: 3
				},
				tel:'',
				password:'',
				tel:'',
				user_id:'',
				app_code:'',
				mobile_phone:'',
				mobile_phone_:'',
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
			}
		},
		onShow() {
			this.password =""
			this.getRedult()
		},
		methods:{
			//跳转
			jump(url){
				uni.navigateTo({
					url:url
				})
			},
			//数据
			getRedult(){
				const that = this
				that.getData({
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
			confirm(){
				// console.log(111)
				const that= this
				that.getData({
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
								url:'/pages/ipad/account/verifyPassword'
							})
						},500)
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
	#verifyPassword{
		width:100%;
		height: 100%;
		//头部
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
		
		.header_{
			width: 100%;
			height: 70px;
			position: fixed;
			z-index: 1;
			// background: #fff;
			background: red;
			&>image{
				width:23px;
				height: 23px;
				margin: 0 10px 0 22px;
			}
		}
		.content{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width:60%;
			background: #fff;
			.phone{
				width: 100%;
				height:74px;
				border-bottom:1upx solid #E6E6E6;
				letter-spacing: 2px;
				&>view:nth-child(1){
					margin: 10px 0 10px 8px;
					height: 20px;
					line-height: 20px;
					
				}
				&>view:nth-child(2){
					margin: 0 0 5px 8px;
					height: 28px;
					line-height: 28px;
					&>input{
						width:100%;
						height: 100%;
					}
				}
			}
			.password{
				width: 100%;
				height:74px;
				border-bottom:1px solid #E6E6E6;
				letter-spacing: 2px;
				margin-bottom: 39px;
				&>view:nth-child(1){
					margin: 10px 0 10px 7px;
					height: 20px;
					line-height: 20px;
					
				}
				&>view:nth-child(2){
					margin: 0 0 5px 8px;
					height: 28px;
					line-height: 28px;
					&>input{
						width:100%;
						height: 100%;
					}
				}
			}
			.forget{
				width: 100%;
				line-height: 45px;
				height: 45px;
				text-align: center;
				letter-spacing: 1px;
				background:#FFFFFF;
				border:1px solid #1A1A1A;
				margin-bottom: 25px;
			}
			.confirm{
				width: 100%;
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


