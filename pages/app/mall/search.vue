<template>
    <div class="search">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
        <div class="flex__between__center header">
			<div class="search-left flex__between__center" @tap="goBack()">
				<image src="../../../static/images/fh.png"></image>
				<text class="fs_40x fw_400">搜索</text>
			</div>
            <div class="flex align-center search__item">
                <span class="fs_28 c_b3 uni-icon uni-icon-search" style="margin-top: 6upx;font-size: 40upx;">&nbsp;</span>
                <form action="javascript:return true;" class="flex__between__center">
					<!-- <text class="uni-icon uni-icon-search" style="margin-top: 6upx;padding: 0 22upx;"></text> -->
					 <input class="fs_28 c_b3" focus="true" v-model="keyword" placeholder="请输入关键字搜索" @confirm="setKeyword(keyword)" placeholder-style="color:#B3B3B3" style="background: #fff;height: 100%;" @input="clearInput">
                </form>
				<view class="uni-icon uni-icon-clear" v-if="showClearIcon" @click="clearIcon" style="color: #999;font-size: 40rpx;"></view>
            </div>
        </div>
        <div class="box box_1" v-if="renders.search_history.length">
            <div class="flex__between">
                <span class="fs_28 c_80">历史搜索</span>
                <span class="iconfont icon-shanchu fs_32 c_80" @click="del()"></span>
            </div>
            <div class="flex wrap content bb_1">
                <div class="item" v-for="(item,index) in renders.search_history" :key="index" @click="setKeyword(item.content)">
                    <span class="fs_24 c_4d">{{item.content}}</span>
                </div>
            </div>
        </div>
        <div class="box box_2">
            <div class="flex__between">
                <span class="fs_28 c_80">热门搜索</span>
              <!-- <span class="iconfont icon-shanchu fs_32 c_80"></span> -->
            </div>
            <div class="flex wrap content">
                <div class="item" v-for="(item,index) in renders.search_hot" :key="index" @click="setKeyword(item.content)">
                    <span class="fs_24 c_4d">{{item.content}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const app=getApp();
export default {
    name:'Search',
    directives: {
    // 注册一个局部的自定义指令 v-focus
        focus: {
            // 指令的定义
            inserted: function (el) {
                // 聚焦元素
                el.querySelector('input').focus()
            }
        }
    },
    data(){
        return {
            renders:{
                search_hot:[],
                search_history:[]
            },
            keyword:'',
			showClearIcon: false,
			id:'',
        }
    },
	onLoad(options) {
		this.id = options.id
	},
    methods:{
		//搜索框出现插好
        clearInput: function(event) {
        	this.keyword = event.target.value;
        	if (event.target.value.length > 0) {
        		this.showClearIcon = true;
        	} else {
        		this.showClearIcon = false;
        	}
        },
        clearIcon: function() {
        	this.keyword = '';
        	this.showClearIcon = false;
        },
		
		//返回
		goBack(){
			uni.navigateBack({})
		},
        searchShow(){
            this.$refs.input1.blur();
            this.setKeyword(this.keyword);
        },
        setKeyword (data) { 
			app.globalData.keyword=data;
			app.$vm.getData({
				url:'Mall/addSearchHistory',
				data:{
					content:this.keyword
				}
			}).then(res=>{
				if(res.code == 1){
					uni.navigateTo({
						url: './list?id='+this.id+'&second_category_id=0'
					})
				}
			})
        },
        // 删除历史记录
        del(){
			app.$vm.getData({
				url:'Mall/deleteHistory',
				that: this,
				data: {type: 1},
				loading: 1
			}).then(res=>{
				if(res.code==1){
					this.renders.search_history=[];
				}else{
					uni.showToast({
						title: res.message,
						icon: 'none'
					})
				}
			})
        },
		//数据
		getReult(){
			app.$vm.getData({
				url:'Mall/getSearchData',
				that: this,
				data: {},
				loading: 1
			}).then(res=>{
				this.renders=res.data;
			})
		}
		
    },
    onShow(){
		this.getReult()
		this.keyword=''
		this.showClearIcon = false;
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
	.box_1{
		padding: 140upx 30upx 0 30upx;
		background: #fff;
	}
	.box_2{
		padding: 60upx 30upx 0 30upx;
		background: #fff;
	}
	.content{
		padding-bottom: 30upx;
	}
	.item{
		margin: 20upx 20upx 0 0;
		line-height: 60upx;
		padding: 0 20upx;
		background: #f5f5f5;
		border-radius: 4upx;
	}
	.header{
		position: fixed;
		left: 0;
		background: #fff;
		height: 90upx;
		width: 100%;
		padding: 0 30upx;
		.search-left{
			&>image{
				width: 40upx;
				height: 32upx;
				margin-right: 20upx;
			}
			&>text{
				display: block;
				width:80upx;
				color: #030303;
				margin-right: 69upx;
			}
		}
		&>div:nth-child(2){
			width: 100%;
			margin-right: 36upx;
			border:2px solid rgba(26,26,26,1);
			background: #fff;
			
		}
	}
</style>


