<template>
	<view>
		<web-view :src="orderPaymentId" @message="handleMessage"></web-view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderPaymentId: '',
				user_id:"",
				id:''
				
			}
		},
		onLoad(option) {
			this.user_id = uni.getStorageSync('user_id')
			this.id = 0;
			if(option.id !== undefined){
				this.id= option.id;
			}
			this.orderPaymentId = "/hybrid/html/canvas.html?user_id="+this.user_id+"&product_id="+this.id
			
			
			
			// this.orderPaymentId = 'www.baidu.com'
			// console.log(this.orderPaymentId)
			// this.orderPaymentId = option.url
			// console.log(this.orderPaymentId)
		},
		methods: {
			handleMessage: function(evt) {
				console.log(1222);
				console.log('接收到的消息：' + JSON.stringify(evt));
				// uni.downloadFile({
				// 	url: 'https://juchenghb1.oss-cn-qingdao.aliyuncs.com/ycscapp/uid2/applet/20190721/5d34266f33288.png', //仅为示例，并非真实的资源
				// 	success: (res) => {
				// 		console.log(res);
				// 		if (res.statusCode === 200) {
				// 			console.log('下载成功');
				// 		}
				// 	}
				// });
			}
		}
	}
</script>

<style>
</style>
