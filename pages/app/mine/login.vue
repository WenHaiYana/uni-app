<template>
	<view id="login">
		<view class="login">
			<image :src="loginImg"></image>
			<view class="content">
				<view>
					<view class="logo">
						<view class="fw_500">
							<text class="ff_zh c_4d">您的</text>
							<text class="ff_zh">美好生活</text>
						</view>
						<view>即刻开启</view>
					</view>
					<view class="information c_ff ff_cg fs_28 fw_400">
						<view class="phone flex__between__center">
							<text>手机号</text>
							<input type="number" v-model="phone">
						</view>
						<view class="code flex__between__center">
							<text>短信验证码</text>
							<input type="number" v-model="code" class="input">
							<text @tap="goCode()">{{codetext}}</text>
						</view>
						<view class="setUp flex__between__center">
							<text>设置密码</text>
							<input type="password" v-model="password" placeholder="可输入6位以上数字,字母,符号" placeholder-style="color:#cbcbcb">
						</view>
						<view class="confirmPassword flex__between__center">
							<text>确认密码</text>
							<input type="password" v-model="confirmPassword" placeholder="可输入6位以上数字,字母,符号" placeholder-style="color:#cbcbcb;font-size:20upx;">
						</view>
					</view>
					<view class="confirm ff_zh fs_32 c_ff fw_400" @tap="login">登录</view>
					<view class="confirm_ ff_zh fs_32 c_ff fw_400" @tap="apply">申请账号</view>
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
				loginImg:'',//背景图
				phone:'',
				codetext: '获取验证码',
				code:'',
				time : 60,
				password:'',//设置密码
				confirmPassword:'',//确认密码
				login_url:''
			}
		},
		onLoad() {
			this.getResult()
		},
		methods:{
			//登录背景图
			getResult(){
				app.$vm.getData({
					url:"Vip/loginImg",
					data:{},
				}).then(res=>{
					uni.clearStorageSync()
					if(res.code == 1){
						this.loginImg= res.data.backgroud_img
						this.login_url = res.data.login_url
					}
				})
			},
			//验证吗验证
			goCode(){
				const that = this
				if(that.time!=60){
					return false;
				}
				app.$vm.getData({
					url:'Vip/sendCode',
					data:{
						mobile_phone:that.phone
					}
				}).then(res=>{
					if(res.code == 1){
						//让获取验证吗变成倒计时
						var codeInterval = setInterval(function(){
							if(that.time<=0){
								that.codetext = '获取验证码'
								that.time = 60;
								clearInterval(codeInterval)
							}else{
								that.codetext = that.time + "秒后可发送"
								that.time = that.time - 1;
							}
						},1000)
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}else{
						uni.showToast({
							title:res.message,
							icon:"none"
						})
					}
				})
			},
			//登录
			login(){
				const that = this
				var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)]|[])+$)([^(0-9a-zA-Z)]|[]|[a-zA-Z]|[0-9]){6,}$/
				if(that.password == "" && that.confirmPassword == ""){
					uni.showToast({
						title:'密码不能为空',
						icon:"none"
					})
					return false
				}else if(that.password != that.confirmPassword){
					uni.showToast({
						title:'两次密码不一致，请重新输入',
						icon:"none"
					})
					return false
				}else if(that.password.length<=6){
					uni.showToast({
						title:'你的密码长度不够，最低在六为以上，才可以哦！',
						icon:"none"
					})
					return false
				}
				
				else{
					app.$vm.getData({
						url:'Vip/mobileLogin',
						data:{
							mobile_phone:that.phone,
							code:that.code,
							password:that.password,
							re_password:that.confirmPassword,
						},
					}).then(res=>{
						if(res.code == 1){
							console.log(111)
							uni.setStorageSync('user_id', res.data.user_id);
							uni.setStorageSync('app_code', res.data.app_code);
							uni.showToast({
								title:res.message,
								icon:"none"
							})
							setTimeout(function(){
								uni.switchTab({
									url:'/pages/app/mall/index'
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
				
			},
			//外链接
			apply(){
				uni.navigateTo({
					'url': '/pages/app/webView?url=' + this.login_url
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	#login{
		width:100%;
		height: 100%;
		.login{
			position: fixed;
			top:0;
			bottom:0;
			left:0;	
			width: 100%;
			&>image{
				position: fixed;
				top:0;
				bottom:0;
				left:0;	
				width:100%;
				height: 100%;
				z-index: -999;
			}
			.content{
				margin-top:80upx;
				// position: absolute;
				z-index: 20;
				// top:50%;left:40%;
				// transform: translate(-40%, -40%);
				&>view{
					margin: 0 30px;
					height: 100%;
					.logo{
						line-height: 1;
						margin-bottom: 60upx;
						&>view:nth-child(1){
							font-size: 93upx;
							&>text:nth-child(2){
								color: #FFA672;
							}
						}
						&>view:nth-child(2){
							color: #000;
							font-weight: 200;
							font-family: "极细体";
							font-size: 93upx;
						}
					}
					.information{
						// width: 74%;
						// height: 400upx;
						background:rgba(0,0,0,0.5);
						border-radius:8upx;
					
						&>view{
							border-bottom:1upx solid #E6E6E6;
							height: 99upx;
							width:100%;
							&>text:nth-of-type(1){
								margin-left: 26upx;
								width: 30%;
								display: block;
							}
							&>text:nth-of-type(2){
								width:200upx;
							}
							.input{
								width:40%;
								height: 40upx;
								line-height: 40upx;
							}
							&>input{
								margin-right: 11upx;
								width:70%;
								height: 40upx;
								line-height: 40upx;
							}
						}
						&>view:last-child{
							border-bottom: 0;
						}
					}
					.confirm{
						margin-top: 20upx;
						// width: 74%;
						height: 98upx;
						border-radius: 8upx;
						background: #1a1a1a;
						text-align: center;
						line-height: 98upx;
					}
					.confirm_{
						margin-top: 20upx;
						// width: 74%;
						height: 98upx;
						border-radius: 8upx;
						background: rgba(0,0,0,0.5);
						text-align: center;
						line-height: 98upx;
					}
				}
			}
		}
	}
</style>
