<template>
    <div class="list">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
       <div class="flex__around search-box">
            <div class="flex align-center search__item">
                <span class="fs_28 c_b3 iconfont icon-sousuo">&nbsp;</span>
                <input class="fs_28" type="text" placeholder="请输入关键字搜索" v-model="loads.keyword" @confirm="loadList(1)"  placeholder-style="color:#B3B3B3">
            </div>
        </div>
        <div class="flex__align nav">
            <div class="flex__between__center nav__left">
                <div class="flex__align">
					<picker @change="setSort" :value="sort_list" :range="sort_list" range-key="name">
						<view class="lh_40">
							<span class="fs_30" :class="loads.order_id!=4?'active':'c_80'">{{sort_list[sort_index].name}}</span>
							<span class="fs_30 iconfont iconxiala1" :class="loads.order_id!=4?'active':'c_80'"></span>
						</view>
					</picker>
                    <span class="fs_30 ml_60" :class="loads.order_id==4?'active':'c_80'" @click="loads.order_id=4;loadList(1)">销量优先</span>
                </div>
              <!--  <span class="fs_40 c_80 jcicon" :class="style?'jcicon-leimupinleifenleileibie':'jcicon-copy'" @click="style=!style"></span> -->
            </div>
            <div class="flex__center__center screen-box" @click="sidebar=!sidebar">
                <span class="fs_30 c_80">筛选</span>
                <span class="fs_30 c_80 iconfont iconshaixuan" style="font-size:24upx ;margin-left: 10upx;"></span>
            </div>
        </div>
        <!-- 一行俩 -->
        <div class="column-box flex__between wrap" v-show="style">
			<navigator class="flex" :url="'./detail?id='+item.id" v-for="(item,index) in list" :key="index">
				<div class="column__item">
					<img :src="item.cover_img" alt="">
					<div class="column__info">
						<span class="fs_28 c_1a lh_40 ellipsis_one">{{item.name}}</span>
						<div class="mt_10 lh_40">
							<span class="fs_32 c_1a">¥</span>
							<span class="fs_32 c_1a">{{item.price}}</span>
							<span class="c_1a fs_26">/米</span>
							<span class="fs_24 c_80 ml_13">已售{{item.sales}}</span>
						</div>
					</div>
				</div>
			</navigator>
        </div>
        <!-- 一行一个 -->
       <!-- <div class="row-box" v-show="!style&&list.length">
			<navigator :url="'./detail?id='+item.id" v-for="(item,index) in list" :key="index">
				<div class="flex row__item">
					<img :src="item.cover_img" alt="">
					<div class="flex__null__around row__info">
						<span class="fs_30 c_1a lh_40 ellipsis_two">{{item.name}}</span>
						<div class="mt_10 lh_40">
							<span class="fs_26 c_main">¥</span>
							<span class="fs_36 c_main">{{item.price}}</span>
						</div>
						<span class="fs_24 c_80">&ensp;已售{{item.sales}}</span>
					</div>
				</div>
			</navigator>
        </div> -->
        <!-- 侧边栏 -->
        <div class="sidebar-box" v-show="sidebar">
            <div class="layer iconfont iconcuohao fs_32 flex__end__center"  @click="sidebar=!sidebar"></div>
            <scroll-view class="scrollView" scroll-y="true">
				<div class="content">
				    <div class="sidebar__item" v-for="(item,index) in category" :key="index">
				        <div class="flex__between">
				            <span class="fs_28 c_66">{{item.name}}</span>
				          <!--  <span class="jcicon fs_34 c_98" :class="!item.level?'jcicon-icon-shang':'jcicon-huaban'"></span> -->
				        </div>
				        <div class="flex wrap category__list">
				            <div class="flex__around__center category__item ellipsis_one" :class="item1.is_choose?'active':''" v-for="(item1,index1) in item.list" :key="index1" @click="setChose(index,index1)">
				                <span class="fs_24" :class="item1.is_choose?'c_ff':'c_80'">{{item1.name}}</span>
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
</template>
<script>
const app=getApp();
export default {
    // name:'List',
    data(){
        return{
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
	onLoad(options){
		 if(app.globalData.keyword){
	        this.loads.keyword=app.globalData.keyword;
	    }
		this.loads.second_category_id = options.id
		app.$vm.getData({
			url:'Mall/mark',
			that: this,
			data:  {},
			loading: 1
		}).then(res=>{
		    this.category=res.data;
			console.log(this.category)
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
		//筛选
		// mark(){
		// 	app.$vm.getData({
		// 		url:'Mall/mark',
		// 		data:{}
		// 	}).then(res=>{
		// 		if(res.code == 1){
		// 			// console.log(res.data)
		// 			this.category = res.data
		// 			consol.log(category)
		// 		}
		// 	})
		// },
		//跳转
		jump(url){
			uni.navigateTo({
				url: url
			})
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
<style>
	page{
		padding-bottom: 100upx;
		background: #fff;
	}
</style>
<style scoped>
    .nav{
        height: 90upx;
        background: #fff;
    }
    .nav__left{
        width: 58%;
        padding: 0 30upx;
    }
    .nav__left>div{
        width: 90%;
        height: 90upx;
    }
    .screen-box{
        width: 150upx;
        height: 40upx;
        border-left: 1upx solid #e6e6e6;
    }
    /* 商品 */
    .column-box{
        padding: 0 24upx;
    }
    .column__item{
        width: 340upx;
        margin-top: 20upx;
        background: #fff;
        border-radius: 10upx;
    }
    .column__item img{
        width: 340upx;
        height: 340upx;
        border-radius: 10upx 10upx 0 0;
    }
	.column__item>div>span{
		 width: 340upx;
		 display: block;
		
	}
    .column__info{
        padding: 20upx 10upx;
    }
    /* 一行一个 */
    .row-box{
        overflow: hidden;
        padding: 0 30upx 30upx;
        background: #fff;
    }
    .row__item{
        margin-top: 30upx;
    }
    .row__item img{
        width: 280upx;
        height: 280upx;
        border-radius: 10upx;
    }
    .row__info{
		width: 380upx;
        margin-left: 30upx;
    }
    /* 浮层 */
    .sidebar-box{
        position: fixed;
        top: 0;
        bottom: 0;
		z-index: 20;
		background: #fff;
    }
    .layer{
		width: 100%;
		padding-top: 20upx;
		padding-right: 40upx;
    }
	.scrollView{
		height: 800upx;
		width: 100%;
	}
    .content{
        /* position: absolute; */
        /* left: 150upx; */
        width: 750upx;
        padding: 8upx 30upx 130upx;
        background: #fff;
        overflow-y: scroll;
    }
    .sidebar__item{
        padding: 30upx 0;
    }
    .category__list{
        padding: 30upx 28upx 0 28upx;
    }
    .category__item{
        width: 170upx;
        height: 65upx;
        margin: 15upx 0 0 15upx; 
        border-radius: 6upx;
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
        width: 750upx;
        height: 130upx;
        padding: 0 30upx;
        background: #fff;
        box-shadow: 2upx 0 6upx 2upx #e6e6e6;
    }
    .footer button{
        width: 250upx;
        height: 70upx;
        line-height: 70upx;
    }
    .reset{
        border-radius: 35upx 0 0 35upx;
        background: #F93A42;
        font-size: 30upx;
        color: #fff;
    }
    .sure{
        border-radius: 0 35upx 35upx 0;
        background: #1a1a1a;
        font-size: 30upx;
        color: #fff;
    }
	.active{
		color: #1A1A1A;
		font-weight: 500;
	}
</style>
