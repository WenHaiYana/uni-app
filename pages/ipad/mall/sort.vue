<template>
	<view id="sort">
		<view class="header flex__between__center">
			<view class="headerLeft flex__between__center">
				<view :class="load.index==index?'c_03 ff_zh fw_400 fs_40x':''" v-for="(item,index) in nav_list" :key="index" @tap="jump(item.path)" @click="tabIndex(index)" class="fs_30x ff_zh fw_400 c_03">{{item.title}}</view>
			</view>
			<view class="headerCorter flex__center__center">
				<image src="../../../static/images/homeLogo.png"></image>
			</view>
			<view class="headerRight flex__end__center">
				<view class="flex__between__center">
					<view class="uni-icon uni-icon-search fs_22x" style="margin-top: 3px;padding: 0 2px;"></view>
					<input type="search" placeholder="请输入关键词搜" placeholder-style="color:#B3B3B3" v-model="loads.keyword" @confirm="loadList(1)"/>
				</view>
				<view>
					<!-- <view class="uni-icon uni-icon-scan" style="font-size: 20px;"></view> -->
				</view>
			</view>
		</view>
		<view class="content">
			<!-- 筛选的tab -->
			<div class="flex__align nav">
			    <div class="flex__between__center nav__left">
			        <div class="flex__align">
						<picker @change="setSort" :value="sort_list" :range="sort_list" range-key="name">
							<view class="lh_40">
								<span class="fs_30x" :class="loads.order_id!=4?'active':'c_80'">{{sort_list[sort_index].name}}</span>
								<span class="fs_30x iconfont iconxiala1" :class="loads.order_id!=4?'active':'c_80'"></span>
							</view>
						</picker>
			            <span class="fs_30x ml_60" :class="loads.order_id==4?'active':'c_80'" @click="loads.order_id=4;loadList(1)">销量优先</span>
			        </div>
			      <!--  <span class="fs_40 c_80 jcicon" :class="style?'jcicon-leimupinleifenleileibie':'jcicon-copy'" @click="style=!style"></span> -->
			    </div>
			    <div class="flex__center__center screen-box" @click="sidebar=!sidebar">
			        <span class="fs_30x c_80">筛选</span>
			        <span class="c_80 iconfont iconshaixuan" style="font-size: 15px;"></span>
			    </div>
			</div>
			<!-- 图片排列 -->
			<view class="column-box flex wrap">
				<navigator class="navigator"  :url="'./detail?id='+item.id" v-for="(item,index) in list" :key="index">
					<image :src="item.cover_img"></image>
					<!-- <image :src="item.cover_img"></image> -->
					<view class="fs_30x ff_cg fw_400 c_1a ellipsis_two">{{item.name}}</view>
					<view>
						<text class="fs_40x c_1a">¥</text>
						<text class="fs_40x c_1a">{{item.price}}</text>
						<text class="c_1a fs_28x" style="margin-right: 20px;">/米</text>
						<text class="fs_24x c_80 ml_13">已售{{item.sales}}</text>
					</view>
				</navigator>
			</view>
			 <!-- 侧边栏 -->
			    <div class="sidebar-box" v-show="sidebar">
			        <div class="layer iconfont iconcuohao flex__end__center" style="font-size: 30px;paddding-right: 20px;"  @click="sidebar=!sidebar"></div>
			        <scroll-view class="scrollView" scroll-y="true">
						<div class="conter">
						    <div class="sidebar__item" v-for="(item,index) in category" :key="index">
						        <div class="flex__between">
						            <span class="fs_32x c_66">{{item.name}}</span>
						        </div>
						        <div class="flex wrap category__list">
						            <div class="flex__around__center category__item ellipsis_one" :class="item1.is_choose?'active':''" v-for="(item1,index1) in item.list" :key="index1" @click="setChose(index,index1)">
						                <span class="fs_24x" :class="item1.is_choose?'c_ff':'c_80'">{{item1.name}}</span>
						            </div>
						        </div>
						    </div>
						</div>
					</scroll-view>
			        <div class="flex__center__center footer">
						<button class="reset" @click="reset">重置筛选条件</button>
						<button class="sure" @click="sure">确定</button>
			        </div>
			    </div>
			</div>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
	    // name:'List',
	    data(){
	        return{
				load:{
					index:1,
				},
	            sort_index: 0,
	            style: true, //展示类型 ture：1行2;false:1行1
	            sidebar: false,
	            list:[],
	            loads:{
	                order_id: 1,
	                second_category_id: '',
	                keyword: '',
	                page:1,
					mark_id:'',
	            },
	            category:[
					{
						list:[{}]
					}
				],
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
	            sort_list:[
	              {
	              	id:1,
	              	name:'默认排序'
	              },
	              {
	                  id:2,
	                  name:'价格降序'
	              },
	              {
	                  id:3,
	                  name:'价格升序'
	              }
	            ]
	        }
	    },
		onShow() {
			this.loadList(1);
		},
		onLoad(options){
			 if(app.globalData.keyword){
		        this.loads.keyword=app.globalData.keyword;
		    }
			this.getData({
				url:'Mall/mark',
				that: this,
				data:  {},
				loading: 1
			}).then(res=>{
			    this.category=res.data;
				let category_arr=[];
				for(let i=0;i<this.category.length;i++){
					for(let j=0;j<this.category[i].list.length;j++){
						if(this.category[i].list[j].is_choose==1){
							category_arr.push(this.category[i].list[j].second_category_id);
						}
					}
				}
				this.loads.mark_id=category_arr.join();
				
			})
		},
	    methods:{
			jump(url){
				uni.navigateTo({
					url: url
				})
			},
			tabIndex(index){
				this.load.index = index
			},
	        // 加载商品
	        loadList(page){
	        	app.$vm.getList({
	        		url:'Mall/getListList',
	        		that: this,
	        		data: this.loads,
	        		loading: 1,
	        		page
	        	});
	        },
	        // 排序方式
	        setSort(e){
				let index=e.detail.value;
	            this.sort_index=index;
	            this.loads.order_id=this.sort_list[index].id;
				this.loadList(1);
	        },
			// 设置选中分类
			setChose(index,index1){
				// this.loads.mark_id = index1;
				// console.log(index,index1)
				this.category[index].list[index1].is_choose=!this.category[index].list[index1].is_choose;
			},
			// // 分类展开关闭
			// setClickNumber(index){
			// 	console.log(index)
			// 	this.category[index].click_number=!this.category[index].click_number
			// },
	        // 确定分类
	        sure(){
	            this.sidebar=false;
	            this.loads.mark_id='';
	            let array=[];
	            for(let i=0;i<this.category.length;i++){
	                for(let j=0;j<this.category[i].list.length;j++){
	                    if(this.category[i].list[j].is_choose){
	                     array.push(this.category[i].list[j].second_category_id);
	                    }   
	                }
	            }
	            this.loads.mark_id=array.join(',');
				// console.log(this.loads.mark_id)
				this.loadList(1);
	        },
	        // 重置分类
	        reset(){
				const that = this
	            that.loads.mark_id='';
	            for(let i=0;i<that.category.length;i++){
	                for(let j=0;j<that.category[i].list.length;j++){
	                    if(that.category[i].list[j].is_choose){
	                        that.category[i].list[j].is_choose=0;
	                    }   
	                }
	            }
	        }
	    },
		onReachBottom(){
			this.loadList(2);
		},
	
	    onHide(){
	        app.globalData.keyword='';
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
	.li1{
		font-size:16px!important;
	}
	#sort{
		width:100%;
		height: 100%;
		.header{
			width: 100%;
			height: 70px;
			position: fixed;
			z-index: 5;
			background: #fff;
			.headerLeft{
				// padding-top: 50upx;
				margin-left: 10px;
				width:33%;
				height: 100%;
			}
			.headerCorter{
				// padding-top: 50upx;
				width:33%;
				height: 100%;
				&>image{
					width:103px;
					height: 19px;
				}
			}
			.headerRight{
				// padding-top: 50upx;
				width:33%;
				height: 100%;
				&>view:nth-child(1){
					border:1px solid #1A1A1A;
					width:250px;
					height: 20px;
					margin-right: 12px;
					&>input{
						width:100%;
						height: 100%;
						font-size: 11px;
					}
				}
				&>view:nth-child(2){
					margin-right: 10px;
				}
			}
		}
		.content{
			width: 100%;
			padding-top: 62px;
			.nav{
				height: 45px;
				background: #fff;
				.nav__left{
				    width: 58%;
				    padding: 0 15px;
					&>div{
						width: 90%;
						height: 45px;
					}
				}
				.screen-box{
				    width: 75px;
				    height: 20px;
				    border-left: 1px solid #e6e6e6;
				}
			}
			.column-box{
			   margin-left: 20px;
				.navigator{
					margin-right: 22px;
					width:30%;
					&>image{
						width:100%;
						height: 200px;
						margin-bottom: 30px;
					}
					&>view:nth-of-type(1){
						width: 100%;
						line-height: 1.3;
						letter-spacing: 1px;
						margin-bottom: 9px;
					}
					&>view:nth-of-type(2){
						margin-bottom: 32px;
					}
				}
				
			}
		}
	}
	 /* 浮层 */
	.sidebar-box{
	    position: fixed;
	    top: 0;
	    bottom: 0;
		z-index: 20;
		background: #fff;
		width:100%;
	}
	.layer{
		width: 100%;
		padding-top: 20px;
		padding-right: 40px;
	}
	.scrollView{
		// min-height: 600upx;
		// height: auto;
		height: 300px;
		width: 100%;
		margin-bottom: 25px;
	}
	.conter{
	    /* position: absolute; */
	    /* left: 150upx; */
	    width: 375px;
	    padding: 4px 15px 65px;
	    background: #fff;
	    overflow-y: scroll;
	}
	.sidebar__item{
	    padding: 15px 0;
	}
	.category__list{
	    padding: 15px 14px 0 24px;
	}
	.category__item{
	    width: 85px;
	    height: 33px;
	    margin: 8px 0 0 8px; 
	    border-radius: 3px;
	    background: #f5f5f5;
	}
	.category__item:nth-child(3n+1){
	    margin-left: 0;
	}
	.category__item.active{
	    background: #1a1a1a;
	}
	 .footer{
	    position: absolute;
	    bottom: 0;
	   /* left: 150upx; */
	   width: 100%;
	    height: 65px;
	    background: #fff;
	    box-shadow: 2px 0 3px 1px #e6e6e6;
	}
	.footer button{
	    width: 125px;
	    height: 35px;
	    line-height: 35px;
	}
	.reset{
	    border-radius: 17px 0 0 17px;
	    background: #F93A42;
	    font-size: 15px;
	    color: #fff;
	}
	.sure{
	    border-radius: 0 17px 17px 0;
	    background: #1a1a1a;
	    font-size: 15px;
	    color: #fff;
	}
</style>
