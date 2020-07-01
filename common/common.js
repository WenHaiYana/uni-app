import Vue from 'vue'
// toast

Vue.prototype.$apiUrl = 'https://sxclapp.jucheng01.net/applet.php/'
Vue.prototype.toast=function(initial){
	uni.showToast({
		title: initial,
		icon: "none",
		mask: false
	})
}
// post 请求
Vue.prototype.fetchPost=function(url, data){
	var _that = this
	return new Promise((resolve, reject) => {
		uni.request({
		  method: 'POST',
		  url: _that.$apiUrl+url,
		  
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
}
// getData 
Vue.prototype.getData=function(initial){
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
		this.fetchPost(initial.url, initial.data).then(res=> {
			if (initial.loading) {
				uni.hideLoading();
			}
			if(res.code==777){
				uni.showModal({
					content: res.message,
					showCancel: false,
					success(modal_res){
						if(modal_res.confirm){
							uni.reLaunch({
								url: '/pages/ipad/mine/login'
							})
						}else{
							uni.navigateBack()
						}
					}
				});
			}
			resolve(res)
		}).catch(res=>{
			reject(res)
		});
	})
}
Vue.prototype.getData_=function(initial){
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
		this.fetchPost(initial.url, initial.data).then(res=> {
			if (initial.loading) {
				uni.hideLoading();
			}
			if(res.code==777){
				uni.showModal({
					content: res.message,
					showCancel: false,
					success(modal_res){
						if(modal_res.confirm){
							uni.reLaunch({
								url: '/pages/ipad/mine/login'
							})
						}else{
							uni.navigateBack()
						}
					}
				});
			}
			resolve(res)
		}).catch(res=>{
			reject(res)
		});
	})
}
// getList
//page=1时，自动清空列表加载第1页 page!=1时，加载下一页
Vue.prototype.getList=function(initial){
	return new Promise((resolve, reject) => {
		if (initial.loading) {
		  uni.showLoading({
			title: '加载中',
			mask: true
		  });
		}
		// var ajax_param = {
		//   type: 'loading',
		//   content: '加载中…'
		// };
		
		// that.setData({
		//   ajax_param: ajax_param
		// });
		
		initial.data.user_id = uni.getStorageSync('user_id');
		initial.data.app_code = uni.getStorageSync('app_code');
		//访问链接
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
		
		this.fetchPost(initial.url, initial.data).then(res => {
			if (initial.loading) {
				uni.hideLoading();
			}
			else if(res.code==777){
				uni.showModal({
					content: res.message,
					showCancel: false,
					success(modal_res){
						if(modal_res.confirm){
							uni.reLaunch({
								url: 'pages/ipad/mine/login'
							})
						}
					}
				});
			}else if (res.code == 1) {
				resolve(res);
				if(initial.page == 1){
					initial.that.list=[];
					initial.that.create_time=parseFloat(Date.parse(new Date()) / 1000);
				}
				let data_list = res.data.data_list; //返回数据里面的列表数据
				console.log(data_list)
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
					console.log(initial.that.list)
					list = list.concat(data_list.data);
					console.log(list)
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
}
// 支付
Vue.prototype.pay=function(initial){
	return new Promise((resolve, reject) => {
		uni.requestPayment({
			provider: initial.pay_way,
			orderInfo: initial.order_info, //微信、支付宝订单数据
			success: function (res) {
				resolve(res);
				console.log('success:' + JSON.stringify(res));
			},
			fail: function (err) {
				reject(err);
				console.log('fail:' + JSON.stringify(err));
			}
		});
	})
}