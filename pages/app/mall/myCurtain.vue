<template>
	<view id="myCurtain">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="header flex__between__center">
			<view class="flex__align">
				<image src="../../../static/images/fh.png" @tap="toBack()"></image>
				<text class="c_03 fw_400 fs_30 ff_cg">我的DIY窗帘</text>
			</view>
			<view class="flex__align" v-if="!isShow" @tap="isShow =!isShow">
				<text class="iconfont iconshezhi fs_36"></text>
				<text class="c_03 fw_400 fs_30 ff_cg">管理</text>
			</view>
			<view class="flex__align" v-if="isShow" @tap="isShow =!isShow">
				<text class="iconfont icon-wancheng fs_36"></text>
				<text class="c_03 fw_400 fs_30 ff_cg">完成</text>
			</view>
		</view>
		<view class="content">
			<view class="flex__between wrap">
				<view v-for="(item,index) in list" :key="index" v-if="!isShow">
					<image :src="item.diy_img"></image>
				</view>
				<view v-for="(item,index) in list" :key="index" v-if="isShow">
					<image :src="item.diy_img" @tap="selected(item.id)"></image>
				</view>
			</view>
		</view>
		<view class="footer" v-if="!isShow" @tap="new_('/pages/app/mall/personality')">
			<view class="flex__center__center">
				<text class="iconfont iconjia1 fs_36"></text>
				<text class="ff_cg fs_30 fw_400 c_1a">新增</text>
			</view>
			<!-- <view class="flex__center__center" v-if="isShow" @tap="del()">
				<text class="iconfont iconiconfont-shanchu fs_36"></text>
				<text class="ff_cg fs_30 fw_400 c_1a">删除</text>
			</view> -->
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default{
		data(){
			return{
				isShow:false,
				list:[],
				source_id:'',
				// index:0,
				list_1:[]
			}
		},
		onShow() {
			this.getResult(1)
		},
		onReachBottom() {
			this.getResult(2)
		},
		methods:{
			//返回
			toBack(){
				uni.navigateBack({})
			},
			//数据
			getResult(page){
				const that = this
				app.$vm.getList({
					url:'Mall/getMyDIY',
					that:this,
					data:{},
					loading:1,
					page
				})
			},
			 // 删除
			selected(id){
				const that = this
				uni.showModal({
					title: '系统提醒',
					content: '确定要删除此图片吗？',
					success: function(res) {
						if (res.confirm) {
							app.$vm.getData({
								url:'Mall/deleteMyDiy',
								data: {
									source_id:id
								},
								loading: 1
							}).then(res=>{
								if(res.code==1){
									that.getResult(1);
								}
								uni.showToast({
									title: res.message,
									icon: "none"
								})
							})
						} else if (res.cancel) {
						  return false;
						}
					  }
				})
				
			},
			new_(url){
				console.log(111)
				uni.navigateTo({
					url:url
				})
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
	#myCurtain{
		width: 100%;
		height: 100%;
		.header{
			width:100%;
			height: 100upx;
			position: fixed;
			background: #fff;
			z-index: 1;
			&>view:nth-child(1){
				height: 100%;
				margin-left: 30upx;
				&>image{
					width: 34upx;
					height: 32upx;
					margin-right: 21upx;
				}	
			}
			&>view:nth-child(2){
				margin-right: 30upx;
				&>text:nth-child(1){
					margin-right: 11upx;
				}
			}
		}
		.content{
			width:100%;
			padding-top:100upx;
			margin-bottom: 94upx;
			&>view{
				margin:0 28upx 0 32upx;
				&>view{
					position: relative;
					width: 48.5%;
					height: 223upx;
					margin-bottom: 19upx;
					&>image{
						width:100%;
						height: 100%;
					}
					&>text{
						position: absolute;
						top:10upx;
						right:10upx;
						z-index: 2;
					}
				}
			}
		}
		.footer{
			position: fixed;
			bottom:0;
			left: 0;
			height: 94upx;
			width: 100%;
			&>view{
				background: #fff;
				border:2upx solid rgba(26,26,26,1);
				width: 100%;
				height: 100%;
				&>text:nth-child(1){
					margin-right: 16upx;
				}
			}
		}
	}
</style>
