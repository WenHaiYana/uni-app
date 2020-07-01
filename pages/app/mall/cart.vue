<template>
	<view id="cart">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="haceData" v-if="effective_cart.length">
			<view class="header flex__between__center">
				<view class="flex__align">
					<text class="c_03 fw_400 fs_30 ff_cg">购物车</text>
				</view>
				<view class="flex__align" v-if="!edit_switch" @tap="edit_switch = !edit_switch">
					<text class="iconfont icon-bianji fs_36"></text>
					<text class="c_03 fw_400 fs_30 ff_cg">编辑</text>
				</view>
				<view class="flex__align" v-if="edit_switch" @tap="edit_switch = !edit_switch">
					<text class="iconfont icon-wancheng fs_36"></text>
					<text class="c_03 fw_400 fs_30 ff_cg">完成</text>
				</view>
			</view>
			<view class="content">
				<view class="flex__between__center" v-for="(item,index) in effective_cart" :key="index">
					<view class="content-left">
						<text class="iconfont icon-dui fs_36" v-if="item.is_select" @click="setSingle(item.id,index)"></text>
						<text class="iconfont icon-wancheng fs_36"  v-else @click="setSingle(item.id,index)"></text>
					</view>
					<view class="content-right" @tap="jump('/pages/app/mall/detail?id='+item.product_id)">
						<view class="flex information">
							<image :src="item.cover_img"></image>
							<view>
								<view class=" ellipsis_two c_1a fs_24 ff_cg fw_400">{{item.name}}</view>
								<view class="ff_cg fs_22 c_80 fw_400" style="letter-spacing: 2upx;">已选规格：{{item.window_type}}</view>
								<view class="ff_cg fs_22 c_80 fw_400" style="letter-spacing: 2upx;">
									<text>高：{{item.height}}米 /</text>
									<text>宽：{{item.width}}米 /</text>
									<text>倍数：{{item.times}}倍</text>
								</view>
							</view>
						</view>
						<view class="numberOf">
							<text class="c_1a fs_32 fw_600">￥{{item.price}}<text class="fs24 fw_400 ff_cg">/米</text></text>
							<text class="fs_24 fw_400 ff_cg">数量：{{item.number}}米</text>
						</view>
					</view>
				</view>
				
			</view>
			<view class="footer flex__between__center">
				<view>
					<text class="iconfont icon-dui fs_36"  v-if="is_all" @click="setAll"></text>
					<text class="iconfont icon-wancheng fs_36"  v-else @click="setAll"></text>	
					<text class="fs_26 c_1a fw_400 ff_cg" style="letter-spacing:1upx ;">全选</text>
					<text class="fs_26 c_1a fw_400 ff_cg" style="letter-spacing:1upx ;">合计</text>
					<text class="fs_32 c_1a fw_600 ff_cg">￥{{total_money}}</text>
				</view>
				<view class="fs_28 c_ff fw_400 ff_cg flex__center__center" style="background: #000;" @click="balance('./placeOrder?settlement_type=1')" v-if="!edit_switch">结算（<text>{{total_number}}</text>）</view>
				<view class="fs_28 c_1a fw_400 ff_cg flex__center__center"  v-if="edit_switch" @click="del" style="background: #fff;">删除({{total_number}})</view>
			</view>
		</view>
		<view class="noData" v-else>
			<view class="header">购物车</view>
			<view class="no">
				<view class="flex__center__center"><image src="../../../static/images/nothing.png"></image></view>
				<view class="fs_32 c_4d mt_30 flex__center__center">你的购物车竟然是空的</view>
			</view>
		</view>
		
	</view>
</template>
<script>
const app=getApp();
export default {
    name:'Cart',
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
			// settlement_type:1,
        }
    },
    methods:{
		//跳转
		jump(url){
			uni.navigateTo({
				url:url
			})
		},
        // 获取数据
        load(){
			app.$vm.getData({
				url:'Mall/getCartData',
				that: this,
				data: {},
				loading: 1
			}).then(res=>{
				if(res.code==1){
					this.effective_cart = res.data.effective_cart;
					this.invalid_cart = res.data.invalid_cart;
					this.total_money = parseFloat(res.data.total_money).toFixed(2);
					// this.total_money = res.data.total_money;
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
			app.$vm.getData({
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
					this.total_money=res.data.total_money;
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
			app.$vm.getData({
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
					this.total_money=res.data.total_money;
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
			app.$vm.getData({
				url:'Mall/updateCartAll',
				data: {
					is_select: this.is_all
				},
				loading: 1
			}).then(res=>{
				if(res.code==1){
					this.total_money=res.data.total_money;
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
			app.$vm.getData({
				url:'Mall/updateCartSelect',
				data: {
					cart_id: id,
					is_select: this.effective_cart[index].is_select
				},
				loading: 0
			}).then(res=>{
				if(res.code==1){
					this.total_money=res.data.total_money;
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
				app.$vm.getData({
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
			app.$vm.getData({
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
				app.$vm.getData({
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
<style scoped lang="less">
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
		.haceData{
			.header{
				width:100%;
				height: 100upx;
				position: fixed;
				// top:50upx;
				background: #fff;
				z-index: 1;
				&>view:nth-child(1){
					height: 100%;
					margin-left: 30upx;
					&>image{
						width: 40upx;
						height: 40upx;
						margin-right: 21upx;
					}	
				}
				&>view:nth-child(2){
					margin-right: 30upx;
					&>text:nth-child(1){
						margin-right: 4upx;
					}
				}
			}
			.content{
				padding-top: 100upx;
				height: 100%;
				width: 100%;
				margin-bottom: 140upx;
				&>view{
					margin: 0 33upx 0 30upx;
					height: 269upx;
					.content-left{
						width:40upx;
						height: 40upx;
						margin-right: 40upx;
						&>text{
							display: block;
							width: 100%;
							height: 100%;
						}
					}
					.content-right{
						width: 100%;
						height: 100%;
						border-bottom:1upx solid #CBCBCB;
						.information{
							height: 150upx;
							width:100%;
							margin: 24upx 0 24upx 0; 
							&>image{
								width:200upx;
								height: 150upx;
								margin-right: 29upx;
							}
							&>view{
								line-height: 1;
								&>view:nth-child(1){
									width: 402upx;
									line-height: 1.5;
									margin-bottom: 8upx;
								}
								&>view:nth-child(2){
									height: 40upx;
									line-height: 40upx;
									margin-bottom: 8upx;
								}
								&>view:nth-child(3){
									height: 40upx;
									line-height: 40upx;
								}
							}
						}
						.numberOf{
							margin-top: 65upx;
							&>text:nth-child(2){
								margin-left: 60upx;
								color: #FFA365;
								letter-spacing: 1upx;
							}
						}
					}
					&>view:last-child{
						border-bottom:0;
					}
				}
			}
			//底部
			.footer{
				width:100%;
				height: 97upx;
				position: fixed;
				bottom:0upx;
				left:0;
				background: #F5F5F5;
				&>view:nth-child(1){
					margin-left: 31upx;
					&>text:nth-child(1){
						margin-right: 22upx;
					}
					&>text:nth-child(2){
						margin-right: 30upx;
					}
					&>text:nth-child(3){
						margin-right: 3upx;
					}
				}
				&>view:nth-child(2){
					width:250upx;
					height: 100%;
					border:1upx solid #1a1a1a
				}
			}
				
		}
		.noData{
			width:100%;
			height: 100upx;s
			position: fixed;
			top:50upx;
			background: #fff;
			text-align: center;
			line-height: 100upx;
			.no{
				position: fixed;
				top: 400upx;
				bottom: 0;
				width: 100%;
				&>view:nth-child(1){
					&>image{
						width: 200upx;
						height: 200upx;
						display: block;
					}
				}
			}
		}
	}
</style>


s