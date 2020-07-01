<template>
	<view id="personality">
		<view class="header flex__align" @tap="toBack()">
			<image src="../../../static/images/fh.png"></image>
			<text class="fs_34x fw_400 ff_cg c_03">个性DIY</text>
		</view>
		<view class="conter">
			<view class="content flex__between">
				<view class="content-le">
					<view class="pic">
						<image :src="headerPic"></image>
						<image :src="listColorImg1"></image>
						<image :src="listColorImg2"></image>
						<image :src="listColorImg3"></image>
						<image :src="listColorImg4"></image>
						<image :src="listColorImg5"></image>
						<image :src="listColorImg6"></image>
					</view>
				</view>
				<view class="content-rg">
					<swiper vertical="true" circular="false">
						<swiper-item class="swiperItem" v-for="(item,index) in listColor" :key="index">
							<view v-for="(item2,$index) in item" :key="$index" @tap="chooseColor(item2)">
								<image :src="item2.cover_img"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="information">
				<view class="nav flex wrap">
					<view :class="loads.index == index?'active1':''" v-for="(item,index) in nav_list" :key="index" @tap="tabIndex(index,item)">
						<text :class="loads.index == index?'active':''">{{item.type_name}}</text>
					</view>
				</view>
				<view class="information-img">
					<swiper circular="true" class="swiper">
						<swiper-item class="swiperItem1" v-for="(item,index) in listImg" :key="index">
							<view v-for="(item1,$index) in item" :key="$index" @tap="chooseImg(item1)">
								<image :src="item1.cover_img"></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			<view class="content_">
				<canvas canvas-id="canvas" :style="{width:width+'px',height:height+'px'}"></canvas>
			</view>
			<view class="footer" @click="save_()">保存</view>
		
		</view>
	</view>
</template>

<script>
	const app=getApp();
	export default{
		data(){
			return{
				loads:{
					index:0
				},
				listImg:[],//图片
				listColor:[],//颜色
				// listColorImg:[],//图片与颜色
				listColorImg1:'',
				listColorImg2:'',
				listColorImg3:'',
				listColorImg4:'',
				listColorImg5:'',
				listColorImg6:'',
				headerPic:'',
				headerColor:'',
				
				nav_list:[],
				type_id:1,//切换id
				idImg:1,//图片id
				idColor:2,//颜色id
				
				width: '207',
				height: '227',
				imgurl:'',
				index:''
			}
		},
		onLoad(options){
			this.index = options.index
		},
		onShow() {
			this.getResult()
			this.getResultColor()
		},
		methods:{
			//切换
			tabIndex(index,item){
				const that = this
				that.type_id = item.type_id
				that.loads.index = index
			},
			toBack(){
				if(this.index==1){
					console.log(111)
					uni.navigateTo({
						url:'/pages/ipad/mall/index'
					})
				}else{
					console.log(22)
					uni.navigateTo({
						url:'/pages/ipad/mall/myCurtain'
					})
				}
			},
			//图片切换
			chooseImg(item1){
				const that = this
				this.idImg = item1.id
				that.headerPic = item1.cover_img
				app.$vm.getData({
					url:'Mall/getDiySourseType',
					data:{
						source_id:item1.id
					}
				}).then(res=>{
					if(res.code == 1){
						that.nav_list = res.data.data_list[0]
					}
				})
			},
			//颜色切换
			chooseColor(item2){
				this.idColor = item2.id
				this.headerColor = item2.cover_img
				this.getRestltColorImg()
				
			},
			//数据
			getResult(){
				app.$vm.getData({
					url:'Mall/getDiySourseList',
					that: this,
					data: {},
					loading: 1,
				}).then(res=>{
					if(res.code ==1){
						this.listImg = res.data.data_list
					}
				})
			},
			//颜色
			getResultColor(){
				app.$vm.getData({
					url:'Mall/getDiySourseCate',
					that: this,
					data: {},
					loading: 1,
				}).then(res=>{
					if(res.code ==1){
						this.listColor = res.data.data_list
					}
				})
			},
			//颜色与图片与头部
			getRestltColorImg(){
				const that = this
				app.$vm.getData({
					url:'Mall/getDiySoursePart',
					// that: this,
					data: {
						type_id:that.type_id,
						cate_id:that.idColor,
						source_id:that.idImg
					},
					loading: 1,
				}).then(res=>{
					if(res.code ==1){
						if(that.type_id==1){
							that.listColorImg1=res.data.cover_img;
						}else if(that.type_id==2){
							that.listColorImg2=res.data.cover_img
						}else if(that.type_id==3){
							that.listColorImg3=res.data.cover_img
						}else if(that.type_id==4){
							that.listColorImg4=res.data.cover_img
						}else if(that.type_id==5){
							that.listColorImg5=res.data.cover_img
						}else if(that.type_id==6){
							that.listColorImg6=res.data.cover_img;
						}
						
					}
				})
			},
			save_(){	
				const that= this
				var context = uni.createCanvasContext('canvas')
				// var path1 = '../../../static/images/a1.jpg';
				if(that.listColorImg1){
					var path1 = that.listColorImg1
					context.drawImage(path1,0, 0, 207, 227);
				}
				if(that.listColorImg2){
					var path1 = that.listColorImg2;
					context.drawImage(path2,0, 0, 207, 227);
				}
				if(that.listColorImg3){
					var path1 = that.listColorImg3
					context.drawImage(path1,0, 0, 207, 227);
				}
				if(that.listColorImg4){
					var path1 = that.listColorImg4
					context.drawImage(path1,0, 0, 207, 227);
				}
				if(that.listColorImg5){
					var path1 = that.listColorImg5
					context.drawImage(path1,0, 0, 207, 227);
				}
				if(that.listColorImg6){
					var path1 = that.listColorImg6
					context.drawImage(path1,0, 0, 207, 227);
				}
				context.stroke()
				context.draw(true,()=> {
				// 开始保存图片 
				uni.canvasToTempFilePath({
					canvasId: 'canvas',
					success: function(uni_res) {
						that.imgurl = uni_res.tempFilePath;
						uni.uploadFile({
							url: 'https://ycscapp.jucheng01.net/applet.php/Basic/saveFile',
							filePath: that.imgurl,
							name: 'file',
							header: {
								'content-type': 'multipart/form-data'
							},
							complete: function(res) {
								if (res.statusCode == 200) { //微信上传图片状态完成
									var res = JSON.parse(res.data);
									console.log(res.data.url)
									if (res.code == 1) { //控制器上传是否成功
										app.$vm.getData({
											url:'Mall/saveMyDiy',
											this:this,
											data:{
												diy_img:res.data.url
											}
										}).then(res=>{
											if(res.code == 1){
												uni.showToast({
													title:res.message,
													icon:'none'
												})
											}
										})
									} else {
										uni.showToast({
											title:'上传图片失败',
											icon: 'none'
										})
									}
								} else {
									uni.showToast({
										title:'上传图片失败',
										icon: 'none'
									})
								}
								
							}
						})
					}
				})
				})
			}
		}
	}
</script>
<style>
	page{
		background: #fff;
	}
</style>
<style lang="less" scoped>
	#personality{
		width:100%;
		height: 100%;
		//头部
		.header{
			width: 100%;
			height: 70px;
			position: fixed;
			z-index: 1;
			background: #fff;
			&>image{
				width:23px;
				height: 23px;
				margin: 0 10px 0 23px;
			}
		}
		.conter{
			padding-top: 70px;
			.content{
				margin: 24px 35px 62px 25px;
				height: 246upx;
				.content-le{
					width: 66%;
					height: 222px;
					.pic{
						position: relative;
						width: 100%;
						height: 310px;
						overflow: hidden;
						&>image:nth-child(1){
							width:100%;
							height: 100%;
							display: block;
						}
						&>image:nth-child(2){
							width:100%;
							height: 100%;
							position: absolute;
							z-index: 11;
							top:0;
						}
						&>image:nth-child(3){
							width:100%;
							height: 100%;
							position: absolute;
							z-index: 13;
							top:0;
						}
						&>image:nth-child(4){
							width:100%;
							height: 100%;
							position: absolute;
							z-index: 15;
							top:0;
						}
						&>image:nth-child(5){
							width:100%;
							height: 100%;
							position: absolute;
							z-index: 17;
							top:0;
						}
						&>image:nth-child(6){
							width:100%;
							height: 100%;
							position: absolute;
							z-index: 19;
							top:0;
						}
						&>image:nth-child(7){
							width:100%;
							height: 100%;
							position: absolute;
							z-index: 20;
							top:0;
						}
						
					}
					
					
				}
				.content-rg{
					width:30px;
					height: 250px;
					&>swiper{
						width:30px;
						height: 250px;
						.swiperItem{
							width:100%;
							height: 100%;
							&>view{
								width: 30px;
								height: 30px;
								border-radius: 5px;
								margin-bottom: 10px;
								&>image{
									width:100%;
									height: 100%;
									border-radius: 5px;
								}
							}
						}
					}
					
				}
			}
			.information{
				 height: 100%;
				 .nav{
					height: 100%;
					 margin:0 15px;
					 &>view{
						 margin-right: 30px;
						 margin-bottom: 15px;
						 text{
							font-size: 16px;
							 color:#666;
							 font-family: "常规体";
						 }
					 }
					 .active1{
						 height: 100%;
						 border-radius: 4px;
						 border-bottom:3px solid #1A1A1A;
					 }
					 .active{
						 font-weight: 500;
						 font-size: 17px;
						 color: #030303;
						 font-family: "中黑体";
					 }
				 }
				.information-img{
					margin:17px 7px 0 15px;
					height: 305px;
					.swiper{
						width:100%;
						height: 100%;
						.swiperItem1{
							width:100%;
							height: 305px;
							&>view{
								width: 31%;
								height: 150px;
								margin-bottom: 8px;
								float: left;
								margin-right: 8px;
								&>image{
									width:100%;
									height: 150px;
								}
							}
						}
					}
				}
			}
			.footer{
				position: fixed;
				bottom:0;
				width: 100%;
				height:98px;
				background:rgba(255,255,255,1);
				border:2px solid rgba(26,26,26,1);
				font-size:30px;
				font-family:PingFangSC-Regular;
				color:rgba(26,26,26,1);
				line-height: 98px;
				text-align: center;
			}
			.content_{
				position: fixed;
				bottom:-1000px;
			}	
		}
		
	}
</style>
