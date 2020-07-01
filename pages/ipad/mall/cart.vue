<template>
	<view id="cart">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="header flex__between__center">
			<view class="headerLeft flex__between__center">
				<view :class="loads.index==index?'c_03 ff_zh fw_400 fs_40x':''" v-for="(item,index) in nav_list" :key="index" @tap="jump(item.path)" @click="tabIndex(index)" class="fs_30x ff_zh fw_400 c_03">{{item.title}}</view>
			</view>
			<view class="headerCorter flex__center__center ff_cg c_1a fw_400 fs_40x">
				璟奕家纺
			</view>
			<view class="headerRight flex__end__center" v-if="!edit_switch" @tap="edit_switch = !edit_switch">
				<text class="iconfont icon-bianji" style="font-size: 20px;"></text>
				<text class="c_03 fw_400 fs_30x ff_cg">编辑</text>
			</view>
			<view class="headerRight flex__end__center" v-if="edit_switch" @tap="edit_switch = !edit_switch">
				<text class="iconfont icon-wancheng" style="font-size: 20px;"></text>
				<text class="c_03 fw_400 fs_30x ff_cg">完成</text>
			</view>
		</view>
		<view class="content">
			<view class="flex__between__center" v-for="(item,index) in effective_cart" :key="index">
				<view class="content-left">
					<text class="iconfont icon-dui" style="font-size: 25px;" v-if="item.is_select" @click="setSingle(item.id,index)"></text>
					<text class="iconfont icon-wancheng fs_36" style="font-size: 25px;" v-else @click="setSingle(item.id,index)"></text>
				</view>
				<view class="content-right" @tap="jump('/pages/ipad/mall/detail?id='+item.product_id)">
					<view class="flex information">
						<image :src="item.cover_img"></image>
						<view>
							<view class=" ellipsis_one c_1a fs_30x ff_cg fw_400">{{item.name}}</view>
							<view class="ff_cg fs_22x c_80 fw_400" style="letter-spacing: 2upx;">
								<text class="ff_cg fs_22x c_80 fw_400" style="letter-spacing: 1px;">已选规格：{{item.window_type}}</text>
								<text>高：{{item.height}}米 /</text>
								<text>宽：{{item.width}}米 /</text>
								<text>倍数：{{item.times}}倍</text>
							</view>
							<view class="numberOf">
								<text class="c_1a fs_32x fw_600">￥{{item.price}}<text class="fs24x fw_400 ff_cg">/米</text></text>
								<text class="fs_24x fw_400 ff_cg">数量：{{item.number}}米</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="footer flex__between__center">
			<view>
				<text class="iconfont icon-dui" style="font-size: 25px;"  v-if="is_all" @click="setAll"></text>
				<text class="iconfont icon-wancheng " style="font-size: 25px;" v-else @click="setAll"></text>
				<text class="fs_26x c_1a fw_400 ff_cg" style="letter-spacing:1px ;">全选</text>
				<text class="fs_26x c_1a fw_400 ff_cg" style="letter-spacing:1px ;">合计</text>
				<text class="fs_32x c_1a fw_600 ff_cg">￥{{total_money}}</text>
			</view>
			<view class="fs_28x c_ff fw_400 ff_cg flex__center__center" style="background: #000;letter-spacing: 1px;" @click="balance('./placeOrder?settlement_type=1'+'&back=1')" v-if="!edit_switch">结算（<text>{{total_number}}</text>)</view>
			<view class="fs_28x c_1a fw_400 ff_cg flex__center__center" style="background: #fff;letter-spacing: 1px;" v-if="edit_switch" @click="del">删除({{total_number}})</view>
		</view>
	</view>
</template>

<script>
	// const app = getApp()
	export default{
		data(){
			return{
				cart_show: true, //购物车缺省
				edit_switch: false, //是否全选
				is_all: 0, //是否全选
				cart_id: '', //购物车操作id
				effective_cart: [],//有效商品集合
				// invalid_cart: [],//无效商品集合
				total_number: 0,//获取购物车中选中商品种类
				total_money: '',//获取购物车中选中商品总价格
				loads:{
					index: 2
				},
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
		methods:{
			//切换与跳转
			jump(url){
				uni.redirectTo({
					url:url
				})
			},
			//
			tabIndex(index){
				this.loads.index = index
			},
			// 获取数据
			load(){
				this.getData({
					url:'Mall/getCartData',
					that: this,
					data: {},
					loading: 1
				}).then(res=>{
					if(res.code==1){
						this.effective_cart = res.data.effective_cart;
						this.invalid_cart = res.data.invalid_cart;
						this.total_money = parseFloat(res.data.total_money).toFixed(2);
						this.total_number = res.data.total_number;
					}
				})
			},
			// 减
			reduce(index){
				if(this.effective_cart[index].number==1){
					uni.showToast({
						title: '最少购买1件哦!',
						icon: 'none'
					})
					return;
				}
				this.effective_cart[index].number=this.effective_cart[index].number-1;
				let goods=this.effective_cart[index];
				this.getData({
					url:'Mall/updateCart',
					that: this,
					data: {
						product_id: goods.product_id,
						number: goods.number,
						sku: goods.product_sku
					},
					loading: 0
				}).then(res=>{
					if(res.code==1){
						if(!goods.number){
							this.load();
							uni.showToast({
								title: res.message,
								icon: "none"
							})
						}
						this.total_money=parseFloat(res.data.total_money).toFixed(2);
						this.total_number=res.data.total_number;
					}else{
						uni.showToast({
							title: res.message,
							icon: "none"
						})
					}
				})
			},
			// 加
			add(index){
				this.effective_cart[index].number=this.effective_cart[index].number+1;
				let goods=this.effective_cart[index];
				this.getData({
					url:'Mall/updateCart',
					that: this,
					data: {
						product_id: goods.product_id,
						number: goods.number,
						sku: goods.product_sku
					},
					loading: 0
				}).then(res=>{
					if(res.code==1){
						this.total_money=parseFloat(res.data.total_money).toFixed(2);
						this.total_number=res.data.total_number;
					}else{
						this.effective_cart[index].number=goods.number-1;
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					}
					
				})
			},
		   // 全选
			setAll(){
				if(this.is_all){
					this.is_all=0;
				}else{
					this.is_all=1;
				}
				for(let i=0;i<this.effective_cart.length;i++){
					if(this.is_all){
						this.effective_cart[i].is_select=1;
					}else{
						this.effective_cart[i].is_select=0;
					}
				}
				this.getData({
					url:'Mall/updateCartAll',
					data: {
						is_select: this.is_all
					},
					loading: 1
				}).then(res=>{
					if(res.code==1){
						this.total_money=parseFloat(res.data.total_money).toFixed(2);
						this.total_number=res.data.total_number;
					}else{
						uni.showToast({
							title: res.message,
							icon: "none"
						})
					}
				})
			},
			// 单个复选框
			setSingle(id,index){
				if(this.effective_cart[index].is_select){
					this.effective_cart[index].is_select=0;
				}else{
					this.effective_cart[index].is_select=1;
				}
				this.getData({
					url:'Mall/updateCartSelect',
					data: {
						cart_id: id,
						is_select: this.effective_cart[index].is_select
					},
					loading: 0
				}).then(res=>{
					if(res.code==1){
						this.total_money=parseFloat(res.data.total_money).toFixed(2);
						this.total_number=res.data.total_number;
					}else{
						uni.showToast({
							title: res.message,
							icon: "none"
						})
					}
				})
			},
			// 删除
			del(){
				if(this.cart_id){
					this.getData({
						url:'Mall/deleteCart',
						data: {
							cart_id: this.cart_id
						},
						loading: 1
					}).then(res=>{
						if(res.code==1){
							this.load();
						}
						uni.showToast({
							title: res.message,
							icon: "none"
						})
					})
				}else{
					uni.showToast({
						title: '您未选中宝贝',
						icon: "none"
					})
				}
			},
			// 清楚无效商品
			clear(){
				this.getData({
					url:'Mall/deleteInvalid',
					data: {},
					loading: 1
				}).then(res=>{
					if(res.code==1){
						this.load();
					}
					uni.showToast({
						title: res.message,
						icon: "none"
					})
				})
			},
			// 结算
			balance(url){
				const _this=this;
				if (this.total_number) {
					this.getData({
						url:'Mall/verificationStock',
						that: this,
						data: {},
						loading: 1
					}).then(res=>{
						if(res.code==1){
							uni.navigateTo({
								url: url
							})
						}else{
							uni.showToast({
								title: res.message,
								icon: "none"
							})
						}
					}).catch(res=>{
						uni.showModal({
							content: res.message,
							showCancel: false,
							success(){
								_this.loadList(1);
							}
						});
					})
				}else{
					uni.showToast({
						title: "请选择商品",
						icon: "none"
					})
				}
			}
		},
		onShow(){
			this.load();
    },
	watch: {
		effective_cart:{
            handler(newVal, oldVal){
                let all_arr=[];
                if(newVal.length){
                    this.cart_show=true;
                    for(let i=0;i<newVal.length;i++){
                        if(newVal[i].is_select){
                            all_arr.push(newVal[i].id);
                        }
                    }
                    this.cart_id=all_arr.join(',');
                    if(all_arr.length==newVal.length){
                        this.is_all=1;
                    }else{
                        this.is_all=0;
                    }
                }else{
                    this.cart_show=false;
                    this.is_all=0;
                }
                
            },
            deep: true
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
	#cart{
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
				padding-left: 10px;
				width:33%;
				height: 100%;
			}
			.headerCorter{
				// padding-top: 50upx;
				width:33%;
				height: 100%;
			}
			.headerRight{
				// padding-top: 50upx;
				width:33%;
				height: 100%;
				padding-right: 10px;
				&>text:nth-child(1){
					margin-right: 5px;
				}
			}
		}
		.content{
			width: 100%;
			height: 100%;
			padding-top: 70px;
			&>view{
				margin: 20px 30px 0 54px;
				height: 100%;
				.content-left{
					margin-right:15px ;
				}
				.content-right{
					width: 100%;
					margin-right: 15px;
					height: 100%;
					border-bottom:1px solid #CBCBCB;
					.information{
						// height: 225upx;
						width:100%;
						margin-bottom:20px; 
						&>image{
							width:150px;
							height: 107px;
							margin-right: 15px;
						}
						&>view{
							line-height: 1;
							&>view:nth-child(1){
								width: 462px;
								height: 25px;
								line-height: 25px;
								margin-bottom: 14px;
							}
							&>view:nth-child(2){
								height: 25px;
								line-height: 25px;
								margin-bottom: 22px;
								&>text:nth-child(1){
									margin-right: 22px;
								}
							}
							.numberOf{
								margin-top: 32px;
								&>text:nth-child(2){
									margin-left: 30px;
									color: #FFA365;
									letter-spacing: 1px;
								}
							}
						}
						
					}
				}
			}
		}
						
		//底部
		.footer{
			width:100%;
			height: 75px;
			position: fixed;
			bottom:0px;
			left:0;
			background: #F5F5F5;
			&>view:nth-child(1){
				margin-left: 54px;
				&>text:nth-child(1){
					margin-right: 11px;
				}
				&>text:nth-child(2){
					margin-right: 15px;
				}
				&>text:nth-child(3){
					margin-right: 2px;
				}
			}
			&>view:nth-child(2){
				margin-right: 36px;
				width:125px;
				height: 40px;
				border:1px solid #1a1a1a
			}
		}
	}
</style>

