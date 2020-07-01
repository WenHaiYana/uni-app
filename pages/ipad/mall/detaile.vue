<template>
	<view id="dataile">
		<view class="header flex__between__center">
			<view class="header-l flex__align" @tap="goHome">
				<image src="../../../static/images/fh.png"></image>
				<text class="fs_34x fw_400">详情</text>
			</view>
			<view class="header-r flex__align">
				 <view class="flex__center__between" @click="collect">
				    <text class="iconfont iconxin lh_50" :class="is_collect?'c_main':'c_b3'" style="font-size: 25px;"></text>
				</view>
				<image src="../../../static/images/fx.png" @tap="share()"></image>
			</view>
		</view>
		<view class="content">
			<view class="information flex__between">
				<view>
					<swiper class="swiper" indicator-dots="true" indicator-active-color="#ffffff">
						<swiper-item class="swiperItem" v-for="(item,index) in product.img_path" :key="index">
							<image :src="item"></image>
						</swiper-item>
					</swiper>
				</view>
				<view class="content_right">
					<text class="ff_zh c_1a fw_600 fs_60x">￥&nbsp;{{product.price}}<text class="fw_400 ff_cg c_1a fs_28x">/米</text></text>
					<text class="fw_400 ff_cg c_1a fs_50x">{{product.name}}</text>
					<text class="fw_400 ff_cg c_1a fs_32x"><text style="margin-right: 10upx;">已售</text>{{product.sales}}</text>
					<view class="flex__between__center">
						<view class="fs_36x ff_zc fw_600">
							<text style="color:#FFAA84;padding-left: 13upx;">{{prefer_rate}}%</text>
							<text class="c_1a">优惠</text>
						</view>
						<view class="c_ff fs_30" @click="customization">定制效果</view>
					</view>
					<view class="flex__between__center" @click="ensure_modal=true" v-if="product.spec_open==2">
						<text class="c_1a fs_26x fw_400 ff_cg">选择规格</text>
						<image src="../../../static/images/bh@2x.png"></image>
					</view>
					<view class="ff_cg fs_28x fw_400 flex__between__center">
						<view class="c_1a" @tap="addCart">加入购物车</view>
						<view class="c_ff" @click="buyNow()">立即购买</view>
					</view>
				</view>
			</view>
			 <!-- 详情 -->
			<view class="detailText">
				<view class="ff_cg fs_36x c_1a fw_400">商品详情</view>
				<rich-text :nodes="product.description" v-if="product.description" class="fs_36x ff_cg c_66 richText"></rich-text>
			</view>
		</view>
		<!-- 回顶部 -->
		<view class="supernatant">
			<view class="flex__center__center" @tap="goTop(e)" :hidden="go_top_hidden">
				<image src="../../../static/images/top.png"></image>
			</view>
			<view class="flex__center__center" @tap="goHome()">
				<image src="../../../static/images/home.png"></image>
			</view>
		</view>
		<!-- 选择规格 -->
		<view class="layer" v-show="ensure_modal">
			<view class="ensure">
				<view class="iconfont iconcuohao" @click="ensure_modal=false" style="font-size: 25px;"></view>
				<scroll-view scroll-y="true" class="scrollView">
					<view class="information flex__align" v-if="item_list.spec_item_id == product_sku.item1559699647925.sku">
						<image :src="product_sku.item1559699647925.cover_img"></image>
						<!-- <image src="../../../static/images/home.png"></image> -->
						<view>
							<view>
								<text class="c_1a fs_40x fw_600" style="font-family: 'Avenir Heavy';">￥{{product_sku.item1559699647925.price}}</text>
								<text class="c_1a fs_28x ff_cg fw_400">/米</text>
							</view>
							<view class="ff_cg c_80 fs_28x fw_400">库存：{{product_sku.item1559699647925.stock}}件</view>
							<view class="ff_cg c_80 fs_28x fw_400">已选“{{item_list.spec_item_value}}”</view>
						</view>
					</view>
					<view class="information flex__align" v-else-if="item_list.spec_item_id == product_sku.item1559699670043.sku">
						<image :src="product_sku.item1559699670043.cover_img"></image>
						<view>
							<view>
								<text class="c_1a fs_40x fw_600" style="font-family: 'Avenir Heavy';">￥{{product_sku.item1559699670043.price}}</text>
								<text class="c_1a fs_28x ff_cg fw_400">/米</text>
							</view>
							<view class="ff_cg c_80 fs_28x fw_400">库存：{{product_sku.item1559699670043.stock}}件</view>
							<view class="ff_cg c_80 fs_28x fw_400">已选“{{item_list.spec_item_value}}”</view>
						</view>
					</view>
					<view class="information flex__align" v-else-if="item_list.spec_item_id == product_sku.item1559699670513.sku">
						<image :src="product_sku.item1559699670513.cover_img"></image>
						<view>
							<view>
								<text class="c_1a fs_40x fw_600" style="font-family: 'Avenir Heavy';">￥{{product_sku.item1559699670513.price}}</text>
								<text class="c_1a fs_28x ff_cg fw_400">/米</text>
							</view>
							<view class="ff_cg c_80 fs_28x fw_400">库存：{{product_sku.item1559699670513.stock}}件</view>
							<view class="ff_cg c_80 fs_28x fw_400">已选“{{item_list.spec_item_value}}”</view>
						</view>
					</view>
					<view class="information flex__align" v-if="item_list.spec_item_id == product_sku.item1559699671386.sku">
						<image :src="product_sku.item1559699671386.cover_img"></image>
						<view>
							<view>
								<text class="c_1a fs_40x fw_600" style="font-family: 'Avenir Heavy';">￥{{product_sku.item1559699671386.price}}</text>
								<text class="c_1a fs_28x ff_cg fw_400">/米</text>
							</view>
							<view class="ff_cg c_80 fs_28x fw_400">库存：{{product_sku.item1559699671386.stock}}件</view>
							<view class="ff_cg c_80 fs_28x fw_400">已选“{{item_list.spec_item_value}}”</view>
						</view>
					</view>
					<view class="selectModels">
						<view>
							<text class="ff_cg fs_28x fw_400 title">选择型号</text>
							<view class="choose_choose flex wrap">
								<view :class="loads.index_1==index?'active':''" class="ff_cg fs_24x fw_400 c_33" v-for="(item,index) in product_spec" :key="index" @tap="selected(item,index)">
									{{item.spec_item_value}}
								</view>
							</view>
						</view>
						<view>
							<text class="ff_cg fs_28x fw_400 title">窗户型号</text>
							<view class="window fs_24x ff_cg c_1a fw_400">
								<input type="text" placeholder="请输入窗号信息" placeholder-style="color:#CBCBCB" v-model="information" class="fs_24x">
								<view class="flex__between__center">
									<input type="text" placeholder="请输入窗户高度" placeholder-style="color:#CBCBCB" v-model="heights" class="fs_24x">
									<input type="text" placeholder="请输入窗户宽度" placeholder-style="color:#CBCBCB" v-model="widths" class="fs_24x">
									<text class="inputlift fs_24x ff_cg c_1a fw_400">米</text>
									<text class="inputRight fs_24x ff_cg c_1a fw_400">米</text>
								</view>
								<view>
									<input type="text" placeholder="请输入倍数" placeholder-style="color:#CBCBCB" v-model="multiple" class="fs_24x">
									<text class="fs_24x ff_cg c_1a fw_400">倍</text>
								</view>
							</view>
						</view>
						<view>
							<text class="ff_cg fs_28x fw_400 title">安装方式</text>
							<view class="choose_choose flex wrap">
								<view :class="loads.index_2==index?'active':''" class="ff_cg fs_24x fw_400 c_33" v-for="(item,index) in installation" :key="index" @tap="way(item,index)">
									{{item.name}}
								</view>
							</view>
						</view>
						<view>
							<text class="ff_cg fs_28x fw_400 title">安装结构</text>
							<view class="choose_choose flex wrap">
								<view :class="loads.index_3==index?'active':''" class="ff_cg fs_24x fw_400 c_33" v-for="(item,index) in structure" :key="index" @tap="struc(item,index)">
									{{item.name}}
								</view>
							</view>
						</view>
						<view>
							<text class="ff_cg fs_28x fw_400 title">帘头<text class="fs_24x ff_cg fw_400 c_98">(非必选)</text></text>
							<view class="choose_choose flex wrap">
								<view :class="loads.index_4==index?'active':''" class="ff_cg fs_24x fw_400 c_33" v-for="(item,index) in shadeHead" :key="index" @tap="shade(item,index)">
									{{item.name}}
								</view>
							</view>
						</view>
						<view>
							<text class="ff_cg fs_28x fw_400 title">备注<text class="fs_24x ff_cg fw_400 c_98">(非必选)</text></text>
							<view class="note">
								<textarea type="text" placeholder="请输入" placeholder-style="color:#cbcbcb" v-model="notices"  maxlength="100" @input="descInput" class="fs_24x"></textarea>
								<view>{{num}}/{{min}}</view>
							</view>
						</view>
					</view>			
				</scroll-view>
				<view class="footer flex__between__center">
					<view>
						购买数量：&nbsp;&nbsp;{{multiple * widths}}
					</view>
					<view class="flex__between__center">
						<view class="fw_400 ff_cg fs_30x c_1a" @tap="addCart">加入购物车</view>
						<view class="fw_400 ff_cg fs_30x c_ff" @click="buyNow()">立即购买</view>
					</view>
				</view>
			</view>
		    </view>
		</view>
	</view>
</template>

<script>
	// const app = getApp()
	export default{
		data(){
			return{
				item_list:{
					spec_item_id:''
				},
				notices:'',
				num:1,
				min:100,//最多100
				id:'',//商品id
				product:{
					img_path:[]//轮播图片
				},
				product_sku:[],//规格中选项
				product_spec:{},//规格中选项-型号
				prefer_rate:0,//优惠
				is_collect:0,//收藏
				spec_item_value:'布',
				loads:{
					index_1:-1,
					index_2:-1,
					index_3:-1,
					index_4:-1,
				},
				orders:{
					product_id:''
				},
				//绑定数据
				information:'',//窗号信息
				heights:'',   //窗户高度
				widths:'',   //窗户宽度
				multiple:'',  //倍数
				sku:'',
				settlement_type:2,
				isShow:true,
				go_top_hidden: true,
				// is_collect:0,
				ensure_modal: false,
				//安装方式
				installation:[{name:'罗马杆'},{name:'轨道'},{name:'其他'}],
				//安装结构
				structure:[{name:'顶装'},{name:'侧装'},{name:'其他'}],
				//窗头
				shadeHead:[{name:'正贴'},{name:'反贴'}],
				//  orders:{
				// 	number: 1,
				// 	settlement_type:1,
				// 	product_id: '',
				// 	sku: ''
				// },
			}
		},
		onLoad(options) {
			this.id = options.id
		},
		onShow() {
			this.getResule()
		},
		methods:{
			//分享
			share(){
				 let that = this;
			    var navData = JSON.stringify(that.product); // 这里转换成 字符串
				var a = encodeURIComponent(navData)
				uni.navigateTo({
					url:'/pages/ipad/account/share?product='+a
				})
			},
			goBack(){
				uni.navigateBack({})
			},
			descInput(e){
				if(this.notices.length==this.min){
					uni.showToast({
						title:"您好，留言不能超过100哦~~~~~",
						icon:"none"
					})
				}else{
					let txtVal = this.notices.length
					this.num = 1 + txtVal
				}
			},
				//选择型号
			selected(item,index){
				this.item_list = item
				this.spec_item_value = item.spec_item_value
				this.loads.index_1 = index
			},
			//安装方式
			way(item,index){
				this.installation_name = item.name
				this.loads.index_2 = index
			},
			//安装结构
			struc(item,index){
				this.structure_name = item.name
				this.loads.index_3 = index
			},
			//窗头
			shade(item,index){
				this.shadeHead_name = item.name
				this.loads.index_4 = index
			},
			//数据
			getResule(){
				this.getData({
					url:'Mall/getProductDetailData',
					that: this,
					data: {
						product_id:this.id
					},
					loading: 1
				}).then(res=>{
					if(res.code == 1){
						this.product_spec = res.data.product_spec[0].spec_item
						this.prefer_rate = res.data.prefer_rate
						this.product_sku = res.data.product_sku
						this.product=res.data.product;//
						this.orders.product_id = res.data.product.id
						this.product.description=res.data.product.description.replace(/\<img/gi, '<img style="max-width:100%;height:auto" ');
						this.is_collect=res.data.is_collect;
					}
				})
			},
			//加入购物车
			addCart(){
				if(this.widths=='') {
					uni.showToast({
						title: '请选择规格',
						icon: 'none'
					});
					return;
				}
				this.getData({
						url:'Mall/updateDetailCart',
						that:this,
						data:{
							product_id:this.id,
							number:this.multiple * this.widths,
							window_type:this.spec_item_value,
							height:this.heights,
							width:this.widths,
							times:this.multiple,
							install_type:this.installation_name,
							install_style:this.structure_name,
							plane:this.shadeHead_name,
							sku:this.item_list.spec_item_id,
						}
					}).then(res=>{
						if (res.code == 1) {
							this.show=false;
							uni.showToast({
								title: res.message,
								icon: 'none'
							});
						}else{
							uni.showToast({
								title: res.message,
								icon: 'none'
							});
						}
					})
				
			},
			//立即购买
			buyNow(){
				const that = this
				var number = this.multiple * this.widths
				if(that.widths=='') {
					uni.showToast({
						title: '请选择规格',
						icon: 'none'
					});
					return;
				}
				if(that.settlement_type==2){
					this.getData({
						url:'Mall/getOrderReady',
						that:this,
						data:{
							settlement_type:this.settlement_type,
							product_id:this.id,
							number:number,
							sku:this.item_list.spec_item_id,
							window_type:this.spec_item_value,
							height:this.heights,
							width:this.widths,
							times:this.multiple,
							install_type:this.installation_name,
							install_style:this.structure_name,
							plane:this.shadeHead_name,
							
						}
					}).then(res=>{
						if (res.code == 1) {
							that.show=false;
							uni.showToast({
								title: res.message,
								icon: 'none'
							});
							setTimeout(function(){
								uni.navigateTo({
									url:'/pages/ipad/mall/placeOrder?settlement_type=2'+ '&product_id='+that.orders.product_id + 
									'&window_type='+ that.spec_item_value + '&height='+that.heights + '&sku=' + that.item_list.spec_item_id +
									'&width=' + that.widths + '&times=' + that.multiple + '&install_type=' + that.installation_name +
									'&number=' + number + '&install_style=' + that.structure_name +
									'&plane=' + that.shadeHead_name +'&back=2'
								})
							},500)
						}else{
							uni.showToast({
								title: res.message,
								icon: 'none'
							});
						}
					})
				}
				
			},
			 // 收藏
			collect(){
				this.getData({
					url:'Mall/submitCollect',
					that: this,
					data: {
						product_id:this.product.id,
						source: 1
					},
					loading: 1
				}).then(res=>{
					uni.showToast({
						title: res.message,
						icon: 'none'
					});
					if(res.code==1&&res.message=='收藏成功'){
						this.is_collect= 1;
					}else if(res.code==1&&res.message=='取消收藏成功'){
						this.is_collect= 0;
					}
				})
			},
			//跳转
			jump(url){
				uni.navigateTo({
					url:url
				})
			},
			//返回首页
			goHome(){
				uni.navigateTo({
					url: '/pages/ipad/mall/index'
				});
			},
			 //置顶
			goTop(){
			 	uni.pageScrollTo({
			 		scrollTop: 0,
			 	})
			},	
			//滑动一定位置出现
			 onPageScroll: function(e) {
				var go_top_hidden = e.scrollTop > 200 ? false : true
				this.go_top_hidden = go_top_hidden
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
	#dataile{
		width:100%;
		height: 100%;
		.header{
			width:100%;
			height: 70px;
			position: fixed;
			left: 0;
			z-index: 1;
			// padding-top: 50upx;
			background:#fff;
			.header-l{
				width:70px;
				height: 100%;
				margin-left: 10px;
				&>image{
					width:20px;
					height: 20px;
					margin-right: 10px;
				}
			}
			.header-r{
				margin-right: 10px;
				&>image{
					width:25px;
					height: 25px;
					margin-left: 20px;
				}
			}
		}
		.content{
			height: 100%;
			margin: 0 20px;
			padding-top: 70px;
			.information{
				width:100%;
				&>view{
					width: 45%;
					height: 375px;
					.swiper{
						width:100%;
						height: 100%;
						.swiperItem{
							width:100%;
							height: 100%;
							&>image{
								width:100%;
								height: 100%;
							}
						}
					}
					
				}
				.content_right{
					width: 53%;
					height: 250px;
					&>text{
						display: block;
					}
					&>text:nth-of-type(1){
						padding:10px 0 12px 0;
						line-height: 1.3;
						letter-spacing: 2px;
					}
					&>text:nth-of-type(3){
						margin:12px 0 12px 0;
						letter-spacing: 1px;
					}
					&>view:nth-of-type(1){
						margin: 12px 0 25px 0;
						width: 100%;
						height: 50px;
						letter-spacing: 1px;
						line-height: 50px;
						&>view:nth-of-type(1){
							width:60%;
							height: 100%;
							background:linear-gradient(131deg,rgba(255,250,249,1) 0%,rgba(255,246,243,1) 100%);
						}
						&>view:nth-of-type(2){
							width:40%;
							height: 100%;
							text-align: center;
							background:linear-gradient(131deg,rgba(255,178,144,1) 0%,rgba(255,174,146,1) 100%);
						}
					}
					&>view:nth-of-type(2){
						width: 100%;
						height: 40px;
						border:1upx solid #1a1a1a;
						margin-top: 26upx;
						margin-bottom:55px;
						line-height: 40px;
						&>text{
							padding-left: 6px;
						}
						&>image{
							width:16px;
							height: 16px;
							margin-right: 6px;
							color: #000;
						}
					}
					&>view:nth-of-type(3){
						width: 100%;
						height: 40px;
						line-height: 40px;
						&>view{
							width:48%;
							height: 40px;
							line-height: 40px;
							text-align: center;
						}
						&>view:nth-child(1){
							background: #fff;
							border:1upx solid #1a1a1a;
						}
						&>view:nth-child(2){
							background: #1a1a1a;
						}
					}
				}
			}
			.detailText{
				height: 100%;
				margin: 39px 0 50px 0;
				&>view{
					height: 25px;
					line-height: 25px;
					margin-bottom: 8px;
				}
				.richText{
					width:100%;
					word-break: break-all;
				}
			}
		}
		//浮
		.supernatant{
			position: fixed;
			bottom: 62upx;
			right:10px;
			height: 90px;
			width: 40px;
			z-index: 10;
			&>view:nth-child(1){
				width:40px;
				height: 40px;
				background: #fff;
				margin-bottom: 10px;
				box-shadow:0px 2px 8px 0px rgba(0,0,0,0.15);
				&>image{
					width: 20px;
					height: 20px;
				}
			}
			&>view:nth-child(2){
				width:20px;
				height: 20px;
				background: #fff;
				box-shadow:0px 2px 8px 0px rgba(0,0,0,0.15);
				&>image{
					width: 20px;
					height: 20px;
				}
			}
		}
		//浮层选择
		.layer{
			position: fixed;
			top: 0;
			bottom: 0;
			width: 100%;
			height: 100%;
			background:rgba(0,0,0,0.4);
			z-index: 30;
			// height: auto;
			.ensure{
				margin: 0 120px;
				height: 100%;
				// top:50%;left:50%;
				// transform: translate(-50%, -50%);
				z-index: 35;
				background: #fff;
				&>view:nth-child(1){
					text-align: right;
					font-size: 16px;
					margin:0 15px 8px 0;
					padding-top: 11px;
				}
				.scrollView{
					height: 600px;
					.information{
						margin: 0 15px;
						height:97px; 
						margin-bottom: 37px;
						&>image{
							// display: block;
							width:150px;
							height: 150px;
							margin-right: 10px;
						}
						&>view{
							line-height: 1;
							&>view{
								// padding: 10upx 0;
								letter-spacing: 1px;
							}
							&>view:nth-child(1){
								margin-top: 15px;
								margin-bottom: 36px;
							}
							&>view:nth-child(2){
								margin-bottom: 13px;
							}
							&>view:nth-child(3){
								color:#FFAA84;
							}
						}
					}
					.selectModels{
						margin: 0 15px;
						&>view{
							display: flex;
							height: 100%;
							width: 100%;
							margin-bottom: 35px;
							.title{
								display: block;
								width: 17%;
								padding:3px 0; 
								color: #333;
								letter-spacing: 1px;
								margin-right: 12px;
							}
							.choose_choose{
								width:100%;
								height: 100%;
								&>view{
									padding:2px 24px; 
									margin-right: 10px;
									border:1px solid #333;
									background: #fff;
								}
								.active{
									color: #fff;
									background: #000
								}
							}
							.window{
								width:100%;
								height: 100%;
								&>input:nth-child(1){
									width:100%;
									height: 30px;
									// line-height: 30px;
									border:1px solid #333;
									background: #fff;
									min-height: 0rem;
									// font-size:12px; 
								}
								&>view:nth-child(2){
									height: 30px;
									margin: 20px 0 ;
									position: relative;
									&>input{
										width: 100%;
										height: 30px;
										// line-height: 30px;
										border:1px solid #333;
										background: #fff;
										min-height: 0rem;

									}
									&>input:nth-child(1){
										margin-right: 4px;
										min-height: 0rem;
									}
									.inputlift{
										position: absolute;
										top:9px;
										left:45%;
									}
									.inputRight{
										position: absolute;
										top:9px;
										right:2%;
									}
								}
								&>view:nth-child(3){
									position: relative;
									&>input{
										width:49%;
										height: 30px;
										line-height: 30px;
										border:1px solid #333;
										background: #fff;
										min-height: 0rem;
									}
									&>text{
										position: absolute;
										top:9px;
										left:45%;
									}
								}
								
							}
							.note{
								width:100%;
								height:66px;
								border:1px solid rgba(51,51,51,1);
								position: relative;
								&>textarea{
									width:100%;
									height:66px;
									overflow: auto;
									line-height: 1.3;
									padding-left: 15px;
								}
								&>view{
									position: absolute;
									bottom:5px;
									right:5px;
									color: #333333;
									font-size: 12px;
								}
							}
						}
					}
					
				}
				.footer{
					margin: 0 15px 20px 15px;
					height: 49px;
					// margin: 0 0 40upx 0;
					&>view{
						width: 50%;
						height: 100%;
						line-height: 49px;
						letter-spacing: 1px;
					}
					&>view:nth-child(2){
						text-align: center;
						height: 49px;
						&>view:nth-child(1){
							width:48%;
							height: 100%;
							background: #fff;
							border:1px solid rgba(26,26,26,1);
						}
						&>view:nth-child(2){
							width:48%;
							height: 100%;
							background: #000;
						}
					}
					
				}
			}
		}	
	}
</style>
