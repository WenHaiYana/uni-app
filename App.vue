<script>
	export default {
		HOST:'https://sxclapp.jucheng01.net/applet.php/',
		globalData:{
			address_id: '',
			keyword: ''
		},
		onLaunch: function() {
			// uni.getSystemInfo({
			// 	success: function (res) {
			// 		var ipad = res.model
			// 		if(ipad){
			// 			console.log("111")
			// 			uni.navigateTo({
			// 				url:'/pages/ipad/mall/index',
			// 			})
			// 		}else{
			// 			console.log(322)
			// 			uni.navigateTo({
			// 				url:'/pages/app/mine/start',
			// 			})
			// 		}
			// 	}
			// });
		},
		
		onLoad: function() {
			
	 
		},
		onHide: function() {
			// console.log('App Hide')
		},
		methods:{
			// post请求
			fetchPost(url, data) {
				return new Promise((resolve, reject) => {
					uni.request({
					  method: 'POST',
					  url: url,
					  data: data,
					  header: {
						'content-type': 'application/x-www-form-urlencoded'
					  },
					  dataType: 'json',
					  success: function(res) {
						resolve(res.data)
					  },
					  fail: function(res) {
						reject(res)
					  }
					})
				})
			},
			//page=1时，自动清空列表加载第1页 page!=1时，加载下一页
			getList(initial) {
				return new Promise((resolve, reject) => {
					if (initial.loading) {
					  uni.showLoading({
						title: '加载中',
						mask: true
					  });
					}
					//组成异步请求数据
					initial.that.load_status="loading";
					initial.data.user_id = uni.getStorageSync('user_id');
					initial.data.app_code = uni.getStorageSync('app_code');
					//判断当前加载页数
					if (initial.page != 1) {
						initial.page = initial.that.page + 1;
					} else {
						initial.page = 1;
						initial.that.list=[];
						initial.that.create_time=parseFloat(Date.parse(new Date()) / 1000);
					}
					initial.data.page = initial.page;
					initial.data.create_time = initial.that.create_time;
					
					this.fetchPost(this.$options.HOST + initial.url, initial.data).then(res => {
						if (initial.loading) {
							uni.hideLoading();
						}if(res.code==777){
							uni.showModal({
								content: res.message,
								showCancel: false,
								success(modal_res){
									if(modal_res.confirm){
										uni.reLaunch({
											url: '/pages/app/mine/login'
										})
									}else{
										uni.navigateBack()
									}
								}
							});
						}
						else if (res.code == 1) {
							resolve(res)
							if(initial.page == 1){
								initial.that.list=[];
								initial.that.create_time=parseFloat(Date.parse(new Date()) / 1000);
							}
							let data_list = res.data.data_list; //返回数据里面的列表数据
							// console.log(data_list)
							// data_list = data_list.push(res.data.data_list);
							// console.log(data_list)
							// if (data_list.total == 0) {
							//   let ajax_type = 'no_data';
							//   let ajax_content = '暂无内容～'
							//   let load_finish = true;
							// } else if (data_list.current_page == data_list.last_page) {
							//   let ajax_type = 'load_finish';
							//   let ajax_content = '我们是有底线的～'
							//   let load_finish = true;
							// } else {
							//   let ajax_type = '';
							//   let load_finish = false;
							// }
							// let ajax_param = {
							//   type: ajax_type,
							//   content: ajax_content
							// };
							if (data_list.data.length) {
								let list = 	initial.that.list;
								// console.log(list)
								list = list.concat(data_list.data);
								initial.that.list=list;
								initial.that.page= initial.page;
								// this.ajax_param=ajax_param;
								// this.load_finish=load_finish;
							} else {
							 //  that.setData({
								// ajax_param: ajax_param,
								// load_finish: load_finish
							 //  });
							}
						}
					}).catch(res=>{
						reject(res)
					});
				})
			},
			
			//获取数据  
			getData(initial) {
				return new Promise((resolve, reject) => {
					if(initial.loading){
						uni.showLoading({
							title: '加载中',
							mask: true
						});
					}		
					//请求数据
					initial.data.user_id = uni.getStorageSync('user_id');
					initial.data.app_code = uni.getStorageSync('app_code');
					//访问 request
					this.fetchPost(this.$options.HOST + initial.url, initial.data).then(res=> {
					  if (initial.loading) {
						uni.hideLoading();
					  }if(res.code==777){
							uni.showModal({
								content: res.message,
								showCancel: false,
								success(modal_res){
									if(modal_res.confirm){
										uni.reLaunch({
											url: '/pages/app/mine/login'
										})
									}else{
										uni.navigateBack()
									}
								}
							});
						}else{
							resolve(res)
						}
					}).catch(res=>{
						reject(res)
					});
				})
			},
		}
	}
</script>

<style>
	
@import "./common/uni.css";
@import "./common/generality.css";
/* @import "./common/iconfont/iconfont.css"; */
	
	/*每个页面公共css */
	@font-face {
		font-family: 'iconfont';
		/* project id 1014267 */
		 
		src: url('//at.alicdn.com/t/font_1044412_5dj74f3euwr.ttf') format('truetype')
	}
	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	page{
		background: #FFFFFF;
	}
	/* /* 媒体查询进行手机与ipad适配 */
	/* For mobile phones: */
/* [class*="col-"] {
    width: 100%;
}
@media only screen and (min-width: 320px)  {
    .col-m-1 {width: 8.33%;}
    .col-m-2 {width: 16.66%;}
    .col-m-3 {width: 25%;}
    .col-m-4 {width: 33.33%;}
    .col-m-5 {width: 41.66%;}
    .col-m-6 {width: 50%;}
    .col-m-7 {width: 58.33%;}
    .col-m-8 {width: 66.66%;}
    .col-m-9 {width: 75%;}
    .col-m-10 {width: 83.33%;}
    .col-m-11 {width: 91.66%;}
    .col-m-12 {width: 100%;}
	
}
@media only screen and (min-width: 768px) {
    .col-1 {width: 8.33%;}
    .col-2 {width: 16.66%;}
    .col-3 {width: 25%;}
    .col-4 {width: 33.33%;}
    .col-5 {width: 41.66%;}
    .col-6 {width: 50%;}
    .col-7 {width: 58.33%;}
    .col-8 {width: 66.66%;}
    .col-9 {width: 75%;}
    .col-10 {width: 83.33%;}
    .col-11 {width: 91.66%;}
    .col-12 {width: 100%;}
	.fontSize{
		font-size: 60upx;
	}
} */ 
</style>

