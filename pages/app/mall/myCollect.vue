<template>
	<view id="myCollect">
		<!-- #ifdef APP-PLUS -->
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<!-- #endif -->
		<view class="header flex__between__center">
			<view class="flex__align" @tap="goback()">
				<image src="../../../static/images/fh.png"></image>
				<text class="c_03 fw_400 fs_30 ff_cg">我的收藏</text>
			</view>
			<view class="flex__align" v-if="!edit_switch" @click="edit_switch=!edit_switch">
				<text class="iconfont icon-bianji" style="font-size: 36upx;"></text>
				<text class="c_03 fw_400 fs_30 ff_cg">编辑</text>
			</view>
			<view class="flex__align" v-if="edit_switch" @click="edit_switch=!edit_switch">
				<text class="iconfont icon-wancheng " style="font-size: 36upx;"></text>
				<text class="c_03 fw_400 fs_30 ff_cg">完成</text>
			</view>
		</view>
		<view class="content">
			<view class="flex__between__center" :class="edit_switch?'left_60':''" v-for="(item,index) in list" :key="index">
				<view class="content-left" v-show="edit_switch">
					{{item.is_chose}}
					<text class="iconfont icon-dui " style="font-size: 36upx;" v-if="item.is_chose" @click="setChose(item.id,index)"></text>
					<text class="iconfont icon-wancheng " style="font-size: 36upx;" v-else @click="setChose(item.id,index)"></text>
				</view>
				<view class="information flex__between__center" @tap="jump('/pages/app/mall/detail?id='+item.product_id)">
					<image :src="item.cover_img"></image>
					<view class="content-right">
						<text class="ellipsis_two ff_cg fw_400 fs_26 c_1a">{{item.name}}</text>
						<text class="ff_cg fw_400 fs_24 c_80">已售{{item.sales_number}}</text>
						<text>
							<text class="ff_zc fw_600 fs_32 c_1a">￥{{item.price}}</text>
							<text class="ff_cg fw_400 fs_24 c_1a">/米</text>
						</text>
					</view>
				</view>
			</view>
		</view>
		<view class="footer flex" v-if="edit_switch">
			<view class="footer-right flex__align">
				<text class="iconfont icon-dui" v-if="is_all" @click="setAll" style="font-size: 36upx;"></text>
				<text class="iconfont icon-wancheng" v-else @click="setAll" style="font-size: 36upx;"></text>
				<text class="fs_26 c_1a fw_400 ff_cg" style="letter-spacing:1upx ;">全选</text>
			</view>
			<view class="fs_28 c_ff fw_400 ff_cg footer-left" @click="cancel">取消收藏</view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default{
		data(){
			return{
				edit_switch: false,
				is_all: 0,
				list: [],
				loads: {
					keyword:''
				}
			}
		},
		onLoad() {
			this.getResult(1)
		},
		onReachBottom(){
			this.getResult(2);
		},
		methods:{
			//返回
			goback(){
				uni.navigateBack({})
			},
		
			//跳转
			jump(url){
				uni.navigateTo({
					url:url
				})
			},
			//数据
			getResult(page){
				app.$vm.getList({
					url:'Mall/getMyCollectList',
					that:this,
					data:this.loads,
					loading: 1,
					page
				})
			},
			//单选
			setChose(id,index){
				if(this.list[index].is_chose){
					this.list[index].is_chose=0
				}else{
					this.list[index].is_chose=1;
				}
				let all_arr=[];
				for(let i=0;i<this.list.length;i++){
					if(this.list[i].is_chose){
						all_arr.push(this.list[i].id);
					}
				}
				if(all_arr&&all_arr.length==this.list.length){
					this.is_all=1;
				}else{
					this.is_all=0;
				}
				// this.all_id=all_arr.join(',')
			},
			 // 全选
			setAll(){
				if(this.is_all){
					this.is_all=0;
				}else{
					this.is_all=1;
				}
				for(let i=0;i<this.list.length;i++){
					if(this.is_all){
						this.list[i].is_chose=1;
					}else{
						this.list[i].is_chose=0;
					}
				}
			},
			// 取消收藏
			cancel(){
				const _this=this;
				var list = _this.list
				var selectedList = []
				for(var i=0;i<list.length;i++){
					if(list[i].is_chose==1){
						selectedList.push(list[i].id)
					}
					if (selectedList.length == 0) {
						uni.showToast({
							title:"请选择要取消收藏的商品",
							icon:"none"
						})
					  return false
					}
				}
				app.$vm.getData({
					url:'Mall/deleteMyCollect',
					that: this,
					data: {my_collect_id: selectedList},
					loading: 1
				}).then(res=>{
					if(res.code==1){
						uni.showModal({
							content: res.message,
							showCancel: false,
							success(content_res){
								if(content_res.confirm){
									_this.getResult(1);
								}
								_this.is_all = 0;
								// _this.edit_switch =true
							}
						});
					}
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
	#myCollect{
		width:100%;
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
					height: 28upx;
					margin-right: 21upx;
				}	
			}
			&>view:nth-child(2){
				margin-right: 30upx;
				&>text:nth-child(1){
					margin-right: 4upx;
				}
			}
			&>view:nth-child(3){
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
			margin-bottom: 98upx;
			&>view{
				background: #fff;
				height:249upx;
				margin: 0 30upx;
				border-bottom:1upx solid #CBCBCB;
				.content-left{
					margin-right: 43upx;
					&>text{
						display: block;
						width:60upx;
						height: 100%;
					}
				}
				.information{
					&>image{
						width:250upx;
						height: 188upx;
						margin-right: 29upx;
					}
					.content-right{
						line-height: 1;
						&>text{
							display: block;
						}
						&>text:nth-child(1){
							padding-top: 30upx;
							line-height: 1.5;
							width: 415upx;
							letter-spacing: 1upx;
							margin-bottom: 23upx;
						}
						&>text:nth-child(2){
							line-height: 35upx;
							height: 35upx;
							margin-bottom: 4upx;
							letter-spacing: 1upx;
						}
						&>text:nth-child(3){
							line-height: 46upx;
							height: 46upx;
							margin-bottom: 33upx;
						}
					}
							
				}
				&>view:last-child{
					border-bottom:0;
				}
			}
		}
		.footer{
			position: fixed;
			bottom:0;
			left:0;
			height: 98upx;
			width: 100%;
			.footer-right{
				width:66%;
				height: 100%;
				background: #F5F5F5;
				&>text:nth-child(1){
					margin: 0 31upx;
				}
			}
			.footer-left{
				width:34%;
				height: 100%;
				background:rgba(26,26,26,1);
				border:2upx solid rgba(26,26,26,1);
				text-align: center;
				line-height: 98upx;
				letter-spacing: 1upx;
			}
		}
	}
</style>
