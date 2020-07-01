<template>
	
    <div class="search">
        <div class="flex__between__center header">
			<div class="search-left flex__between__center" @tap="goBack()">
				<image src="../../../static/images/fh.png"></image>
				<text class="fs_30x fw_400">搜索</text>
			</div>
            <div class="flex align-center search__item">
                <span class="c_b3 uni-icon uni-icon-search" style="margin-top: 2px;font-size: 20px;">&nbsp;</span>
                <form action="javascript:return true;">
					 <input class="fs_28x c_b3" focus="true" v-model="keyword" placeholder="请输入关键字搜索" @confirm="setKeyword(keyword)" placeholder-style="color:#B3B3B3" @input="clearInput">
                </form>
				<view class="uni-icon uni-icon-clear" v-if="showClearIcon" @click="clearIcon" style="color: #999;font-size: 20px;"></view>
            </div>
			<div class="search-right">
				
			</div>
        </div>
		<div class="conter">
			 <div class="box box_2" v-if="renders.search_history.length">
			    <div class="flex__between">
			        <span class="fs_28x c_80">历史搜索</span>
			        <span class="jcicon jcicon-shanchu1 fs_40x c_80" @click="del" style="font-size: 20px;"></span>
			    </div>
			    <div class="flex wrap content">
			        <div class="item" v-for="(item,index) in renders.search_history" :key="index" @click="setKeyword(item.content)">
			            <span class="fs_24x c_4d">{{item.content}}</span>
			        </div>
			    </div>
			</div>
			<div class="box box_1  ">
			    <div class="flex__between">
			        <span class="fs_28x c_80">热门搜索</span>
			       <!-- <span class="iconfont icon-shanchu fs_40" style="font-size: 50upx;"></span> -->
			    </div>
			    <div class="flex wrap content">
			        <div class="item" v-for="(item,index) in renders.search_hot" :key="index" @click="setKeyword(item.content)">
			            <span class="fs_24x c_4d">{{item.content}}</span>
			        </div>
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
        }
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
        clearAddress: function() {
        	this.keyword = '';
        	this.showClearIcon = false;
        },
		//返回
		goBack(){
			uni.navigateTo({
				url:'/pages/ipad/mall/index'
			})
		},
        searchShow(){
            this.$refs.input1.blur();
            this.setKeyword(this.keyword);
        },
        setKeyword (data) { 
			app.globalData.keyword=data;
			this.getData({
				url:'Mall/addSearchHistory',
				data:{
					content:this.keyword
				}
			}).then(res=>{
				if(res.code == 1){
					uni.navigateTo({
						url: './list'
					})
				}
			})
        },
        // 删除历史记录
        del(){
			this.getData({
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
			this.getData({
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
	.conter{
		padding-top: 70px;
	}
	.box{
		padding: 0 15px 0;
		background: #fff;
	}
	.content{
		padding-bottom: 15px;
	}
	.search__item{
		height: 25px;
		border:1px solid rgba(26,26,26,1);
		&>input{
			width:100%;
			height: 25px;
		}
	}
	.box_1{
		margin: 0 25px;
		border-bottom:1px solid #E6E6E6;
	}
	.box_2{
		margin: 0 25px;
		border-bottom:1px solid #E6E6E6;
	}
	.item{
		margin: 10px 10px 0 0;
		line-height: 30px;
		padding: 0 10px;
		background: #fff;
		border:1px solid rgba(51,51,51,1);
	}
	.header{
		position: fixed;
		left: 0;
		background: #fff;
		height: 70px;
		width: 100%;
		padding: 5px 15px 0 15px;
		.search-left{
			width:70px;
			&>image{
				width:20px;
				height: 20px;
				margin-right: 10px;
			}
			&>text{
				color: #030303;
				margin-right: 10px;
			}
		}
		&>div:nth-child(2){
			width: 60%;
			margin-right: 18px;
			background: #fff;
		}
		.search-right{
			margin-right: 20px;
		}
	}
	.search__item input{
		background: none;
	}
</style>


