<template>
	<view id="myCollection">
		<view class="content">
			<view class="ff_zh fs_34x c_1a fw_500">分享到</view>
			<view class="flex__between box-img">
				<view>
					<view class="flex__center"><image src="../../../static/images/vx.png"></image></view>
					<text class="ff_zh fs_26x c_4d fw_400">微信好友</text>
				</view>
				<view>
					<view class="flex__center">
						<image src="../../../static/images/py.png"></image>
					</view>
					<text class="ff_zh fs_26x c_4d fw_400">微信朋友圈</text>
				</view>
				<view>
					<view class="flex__center"><image src="../../../static/images/qq.png"></image></view>
					<text class="ff_zh fs_26x c_4d fw_400">QQ好友</text>
				</view>
			</view>
			<view class="ff_zh fs_34x c_1a fw_500" @tap="toBack()">取消</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default{
		data(){
			return{
				loads:{
					index:0
				},
				product:[],
			}
		},
		onLoad(options) {
			var a = decodeURIComponent(options.product)
            this.product = JSON.parse(a); // 字符串转对象
        },
		methods:{
			//跳转
			jump(url){
				url:url
			},
			//
			toBack(){
				uni.navigateBack({})
			},
			// 分享
			share(provider,type){
				console.log(provider,type)
				const that = this
				uni.share({
					'provider': provider,
					'scene': type,
					'type': 0,
					'href': 'www.baidu.com',
					'title': that.product.name,
					'imageUrl': that.product.img_path[0],
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
						setTimeout(function(){
							uni.navigateBack({})
						},500)
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				})
			},
			shareQQ(){
				const that = this
				uni.getProvider({
					service: 'share',
					success: function (res) {
						console.log(res.provider)
						if (~res.provider.indexOf('qq')) {
							uni.share({
								'provider': 'qq',
								'type': 0,
								desc : '分享的描述',
								'href': 'www.baidu.com',
								'title': that.product.name,
								'imageUrl': that.product.img_path[0],
								success: function (res) {
									console.log("success:" + JSON.stringify(res));
								},
								fail: function (err) {
									console.log("fail:" + JSON.stringify(err));
								}
							})
						}
					}
				});
			// 	const that = this
			
			}
		
		}
	}
</script>

<style lang="less" scoped>
	#myCollection{
		position: absolute;
		top:0;
		bottom: 0;
		height: 100%;
		width: 100%;
		background:#cccccc;
		.content{
			// height: 700upx;
			width:80%;
			background: #fff;
			box-shadow:0px 2px 32px 0px rgba(0,0,0,0.06);
			position: absolute;
			z-index: 1;
			top:50%;left:50%;
			transform: translate(-50%, -50%);
			&>view:nth-child(1){
				width: 100%;
				text-align: center;
				padding: 36px 0 45px 0;
				letter-spacing: 3px;
			}
			.box-img{
				height: 100%;
				margin: 0 10px 45px 10px;
				&>view{
					line-height: 1;
					margin-bottom: 15px;
					width: 25%;
					&>view{
						width: 100%;
						height: 56px;
						&>image{
							width:56px;
							height: 59px;
						}
					}
					&>text{
						display: block;
						margin-top: 20px;
						line-height: 18px;
						height: 18px;
						text-align: center;
					}
				}
			}
			&>view:nth-child(3){
				width: 100%;
				text-align: center;
				letter-spacing: 2px;
				margin-bottom: 15px;
			}
		}
	}
</style>


