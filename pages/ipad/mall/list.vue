<template>
	<view id="sort">
		<view class="header flex__between__center">
			<view class="headerLeft flex__align" @tap="goBack()">
				<image src="../../../static/images/fh.png"></image>
				<text class="fw_400 ff_cg c_03 fs_34x">商品列表</text>
			</view>
			<view class="headerCorter flex__center__center">
				<!-- 筛选的tab -->
				<div class="flex__align nav">
				    <div class="flex__between__center nav__left" style="padding-right: 60upx;">
				        <div class="flex__align">
							<picker @change="setSort" :value="sort_list" :range="sort_list" range-key="name">
								<view class="lh_40">
									<span class="fs_34x" :class="loads.order_id!=4?'active':'c_80'">{{sort_list[sort_index].name}}</span>
									<span class="fs_34x iconfont iconxiala1" :class="loads.order_id!=4?'active':'c_80'" style="padding-top: 3px;font-size: 20px;"></span>
								</view>
							</picker>
				            <span class="fs_34x ml_20" :class="loads.order_id==4?'active':'c_80'" @click="loads.order_id=4;loadList(1)">销量优先</span>
				        </div>
				      <!--  <span class="fs_40 c_80 jcicon" :class="style?'jcicon-leimupinleifenleileibie':'jcicon-copy'" @click="style=!style"></span> -->
				    </div>
				    <div class="flex__center__center screen-box" @click="sidebar=!sidebar">
				        <span class="fs_34x c_80">筛选</span>
				        <span class="c_80x iconfont iconshaixuan" style="font-size:20px ;"></span>
				    </div>
				</div>
			</view>
			<view class="headerRight flex__end__center">
				<view class="flex__between__center">
					<view class="uni-icon uni-icon-search" style="padding: 0 2px; font-size:20px"></view>
					<input type="search" placeholder="请输入关键词搜" placeholder-style="color:#B3B3B3" v-model="loads.keyword" @confirm="loadList(1)"/>
				</view>
				<view class="flex__align">
					<!-- <view class="uni-icon uni-icon-scan" style="font-size: 30px;margin-top: 3px;"></view> -->
				</view>
			</view>
		</view>
		<view class="content">
			<!-- 图片排列 -->
			<view class="column-box flex wrap">
				<navigator class="navigator" :url="'./detaile?id='+item.id" v-for="(item,index) in list" :key="index">
					<image :src="item.cover_img"></image>
					<view class="fs_30x ff_cg fw_400 c_1a ellipsis_two">{{item.name}}</view>
					<view>
						<text class="fs_32x c_1a">¥</text>
						<text class="fs_32x c_1a">{{item.price}}</text>
						<text class="c_1a fs_26x" style="margin-right: 40upx;">/米</text>
						<text class="fs_24x c_80 ml_13">已售{{item.sales}}</text>
					</view>
				</navigator>
			</view>
			 <!-- 侧边栏 -->
			    <div class="sidebar-box" v-show="sidebar">
			        <div class="layer iconfont iconcuohao flex__end__center" style="font-size: 20px;"  @click="sidebar=!sidebar"></div>
			        <scroll-view class="scrollView" scroll-y="true">
						<div class="conter">
						    <div class="sidebar__item" v-for="(item,index) in category" :key="index">
						        <div class="flex__between" @click="setClickNumber(index)">
						            <span class="fs_28x c_66">{{item.name}}</span>
						            <span class="jcicon fs_34x c_98" :class="!item.click_number?'jcicon-icon-shang':'jcicon-huaban'"></span>
						        </div>
						        <div class="flex wrap category__list" v-show="!item.click_number">
						            <div class="flex__around__center category__item ellipsis_one" :class="item1.is_choose?'active':''" v-for="(item1,index1) in item.lower_category" :key="index1" @click="setChose(index,index1)">
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
	export default{
		data(){
			return{
				sort_index: 0,
				style: true, //展示类型 ture：1行2;false:1行1
				sidebar: false,
				list:[],
				loads:{
					index:1,
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
				],
			}
		},
		onShow() {
			console.log(this.list)
		},
		onLoad(options){
			 if(app.globalData.keyword){
		        this.loads.keyword=app.globalData.keyword;
		    }
			this.loads.second_category_id = options.id
			this.getData({
				url:'Mall/mark',
				that: this,
				data:  {},
				loading: 1
			}).then(res=>{
			    this.category=res.data;
				// console.log(this.category)
				let category_arr=[];
				for(let i=0;i<this.category.length;i++){
					for(let j=0;j<this.category[i].list.length;j++){
						if(this.category[i].list[j].is_choose==1){
							category_arr.push(this.category[i].list[j].second_category_id);
						}
					}
				}
				this.loads.mark_id=category_arr.join();
				this.loadList(1);
			})
		},
		methods:{
			goBack(){
				uni.navigateBack({});
			},
			//筛选
			// mark(){
			// 	this.getData({
			// 		url:'Mall/mark',
			// 		data:{}
			// 	}).then(res=>{
			// 		if(res.code == 1){
			// 			// console.log(res.data)
			// 			this.category = res.data
			// 		}
			// 	})
			// },
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
				// console.log(1111)
				let index=e.detail.value;
			    this.sort_index=index;
			    this.loads.order_id=this.sort_list[index].id;
				this.loadList(1);
			},
			// 设置选中分类
			setChose(index,index1){
				this.category[index].lower_category[index1].is_choose=!this.category[index].lower_category[index1].is_choose;
			},
			// 分类展开关闭
			// setClickNumber(index){
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
	#sort{
		width:100%;
		height: 100%;
		width:100%;
		height: 100%;
		.header{
			width: 100%;
			height: 70px;
			position: fixed;
			z-index: 5;
			background: #fff;
			.headerLeft{
				width:20%;
				padding-top: 20px;
				margin-left: 20px;
				height: 100%;
				&>image{
					width:23px;
					height: 23px;
					margin-right: 10px;
				}
			}
			.headerCorter{
				padding-top: 20px;
				width:50%;
				height: 100%;
				.nav{
					height: 45px;
					background: #fff;
					.nav__left{
					    padding: 0 15px;
						&>div{
							height: 45px;
						}
					}
					.screen-box{
					    height: 15px;
						padding-left: 5px;
					    border-left: 1px solid #e6e6e6;
					}
				}
			}
			.headerRight{
				padding-top: 22px;
				width:30%;
				height: 100%;
				&>view:nth-child(1){
					border:1px solid #1A1A1A;
					width:170px;
					height: 30px;
					margin-right: 10px;
					&>input{
						width:100%;
						height: 100%;
						font-size: 11px;
						line-height: 22px;
					}
				}
				&>view:nth-child(2){
					margin-right: 20px;
				}
			}
		}
		.content{
			width: 100%;
			padding-top: 67px;
			.column-box{
			    padding: 0 0 0 12px;
				.navigator{
					margin-right: 12px;
					width:30%;
					&>image{
						width:100%;
						height: 200px;
						margin-bottom: 15px;
					}
					&>view:nth-of-type(1){
						width: 100%;
						line-height: 1.3;
						letter-spacing: 1px;
						margin-bottom: 9px;
					}
					&>view:nth-of-type(2){
						margin-bottom: 33px;
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
		padding-top: 40px;
		padding-right: 40px;
	}
	.scrollView{
		height: 350px;
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
	    padding: 15px 14px 0 14px;
	}
	.category__item{
	    width: 85px;
	    height: 32px;
	    margin: 7px 0 0 7px; 
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
	    box-shadow: 1px 0 3px 1px #e6e6e6;
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
