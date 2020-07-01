<template>
	<view id="myCurtain">
		<view class="header flex__between__center">
			<view class="flex__align">
				<image src="../../../static/images/fh.png" @tap="goBack()"></image>
				<text class="c_03 fw_400 fs_30x ff_cg">我的DIY窗帘</text>
			</view>
			<view class="flex__align" v-if="!isShow" @tap="isShow =!isShow">
				<text class="iconfont iconshezhi" style="font-size: 25px;"></text>
				<text class="c_03 fw_400 fs_30x ff_cg">管理</text>
			</view>
			<view class="flex__align" v-if="isShow" @tap="isShow =!isShow">
				<text class="iconfont icon-wancheng" style="font-size: 25px;"></text>
				<text class="c_03 fw_400 fs_30x ff_cg">完成</text>
			</view>
		</view>
		<view class="content">
			<view class="flex wrap">
				<view v-for="(item,index) in list" :key="index" v-if="!isShow">
					<image :src="item.diy_img"></image>
				</view>
				<view v-for="(item,index) in list" :key="index" v-if="isShow">
					<image :src="item.diy_img" @tap="selected(item.id)"></image>
				</view>
			</view>
		</view>
		<view class="footer">
			<view class="flex__center__center" v-if="!isShow" @tap="jump('/pages/ipad/mall/personality?index=2')">
				<text class="iconfont iconjia1" style="font-size: 25px;"></text>
				<text class="ff_cg fs_30x fw_400 c_1a">新增</text>
			</view>
			<!-- <view class="flex__center__center" v-if="isShow">
				<text class="iconfont iconiconfont-shanchu" style="font-size: 50upx;"></text>
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
			goBack(){
				uni.navigateTo({
					url:'/pages/ipad/account/verifyPassword'
				})
			},
			jump(url){
				console.log(111)
				uni.navigateTo({
					url:url
				})
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
			height: 70px;
			position: fixed;
			background: #fff;
			z-index: 1;
			&>view:nth-child(1){
				height: 100%;
				margin-left: 10px;
				&>image{
					width: 20px;
					height: 20px;
					margin-right: 10px;
				}	
			}
			&>view:nth-child(2){
				margin-right: 10px;
				&>text:nth-child(1){
					margin-right: 5px;
					margin-top: 3px;
				}
			}
		}
		.content{
			width:100%;
			padding-top:70px;
			margin-bottom: 150px;
			&>view{
				margin:30px 20px 0 50px;
				&>view{
					position: relative;
					width: 31%;
					height: 200px;
					margin-right: 15px;
					margin-bottom: 9px;
					&>image{
						width:100%;
						height: 100%;
					}
					&>text{
						position: absolute;
						top:5px;
						right:5px;
						z-index: 2;
					}
				}
			}
		}
		.footer{
			position: fixed;
			bottom:-52px;
			// left: 0;
			left: 50%;
			width: 100%;
			transform: translate(-50%, -50%);
			height: 100px;
			background: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			&>view{
				background: #fff;
				border:1px solid rgba(26,26,26,1);
				width: 80%;
				height: 40px;
				&>text:nth-child(1){
					margin-right: 8px;
				}
			}
			
		}
	}
</style>
