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
					<view class="information c_ff ff_cg fs_28x fw_400">
						<view class="phone flex__between__center">
							<text>手机号</text>
							<input type="number" v-model="phone">
						</view>
						<view class="code flex__between__center">
							<text>短信验证码</text>
							<input type="number" v-model="code" class="input">
							<text@tap="goCode()">{{codetext}}</text>
						</view>
						<view class="setUp flex__between__center">
							<text>设置密码</text>
							<input type="password" v-model="password" placeholder="可输入6位以上数字,字母,符号" placeholder-style="color:#cbcbcb;font-size:16px;">
						</view>
						<view class="confirmPassword flex__between__center">
							<text>确认密码</text>
							<input type="password" v-model="confirmPassword" placeholder="可输入6位以上数字,字母,符号" placeholder-style="color:#cbcbcb;font-size:16px;">
						</view>
					</view>
					<view class="confirm ff_zh  c_ff fw_400" @tap="login">登录</view>
				</view>
			</view>
		</view>
		<view class="logoImg">
			<image src="../../../static/images/homeLogo.png"></image>
		</view>
	</view>
</template>

<script>
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
			}
		},
		onLoad() {
			this.getResult()
		},
		methods:{
			//登录背景图
			getResult(){
				this.getData({
					url:"Vip/loginImg",
					data:{},
				}).then(res=>{
					uni.clearStorageSync()
					if(res.code == 1){
						this.loginImg= res.data.backgroud_img
					}
				})
			},
			//验证吗验证
			goCode(){
				const that = this
				if(that.time!=60){
					return false;
				}
				that.getData({
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
					return
				}else if(that.password != that.confirmPassword){
					uni.showToast({
						title:'两次密码不一致，请重新输入',
						icon:"none"
					})
					return
				}else{
					that.getData({
						url:'Vip/mobileLogin',
						data:{
							mobile_phone:that.phone,
							code:that.code,
							password:that.password,
							re_password:that.confirmPassword,
						},
					}).then(res=>{
						if(res.code == 1){
							uni.setStorageSync('user_id', res.data.user_id);
							uni.setStorageSync('app_code', res.data.app_code);
							uni.showToast({
								title:res.message,
								icon:"none"
							})
							setTimeout(function(){
								uni.navigateTo({
									url:'/pages/ipad/mall/index'
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
			width:100%;
			&>image{
				position: fixed;
				top:0;
				bottom:0;
				left:0;	
				width:100%;
				height: 100%;	
			}
			.content{
				position: fixed;
				z-index: 1;
				top:50%;left:50%;
				transform: translate(-50%, -50%);
				&>view{
					width: 560px;
					height: 100%;
					.logo{
						line-height: 1;
						margin-bottom: 30px;
						&>view:nth-child(1){
							font-size:46px;
							&>text:nth-child(2){
								color: #FFA672;
							}
						}
						&>view:nth-child(2){
							color: #000;
							font-weight: 200;
							font-family: "极细体";
							font-size: 46px;
						}
					}
					.information{
						width: 560px;
						// height: 400px;
						background:rgba(0,0,0,0.3);
						border-radius:4px;
						&>view{
							border-bottom:1px solid #E6E6E6;
							height: 99px;
							width:100%;
							&>text:nth-of-type(1){
								margin-left: 13px;
								width: 30%;
								display: block;
							}
							&>text:nth-of-type(2){
								margin-right: 5px;
							}
							.input{
								width:150px;
								height: 40px;
								line-height: 40px;
							}
							&>input{
								margin-right: 5px;
								width:70%;
								height: 40px;
								line-height: 40px;
							}
						}
						&>view:last-child{
							border-bottom: 0;
						}
					}
					.confirm{
						margin-top: 28px;
						width:560px;
						height: 99px;
						border-radius: 8px;
						background: #1a1a1a;
						text-align: center;
						line-height: 99px;
						letter-spacing: 3px;
					}
				}
			}
		}
		.logoImg{
			position: fixed;
			bottom:10px;
			right: 12px;
			z-index: 10;
			&>image{
				width: 60px;
				height: 20px;
			}
		}
	}
</style>
