<template>
	<view class="wrap">
		<!-- #ifndef H5 -->
		<u-navbar
			title="超级智能聊天"
			:placeholder="true"
			:border="true"
			
			leftIconColor="#fff"
			:autoBack="false"
		></u-navbar>
		<!-- #endif -->
		
		<scroll-view scroll-with-animation scroll-y="true" :style="'width: 100%;height:'+this.height+'px;'" :scroll-top="scrollTop">
			<!-- 用来获取消息体高度 -->
			<view id="chat-list" scroll-with-animation>
				<!-- 消息 -->
				<view class="item" v-for="(x,i) in msgList" :key="i">
					<!-- 用户消息 头像可选加入-->
					<view v-if="x.my" class="chat-item human-item">
						<!-- 	<image v-if="!x.my" class="chat-img" src="../../static/..." mode="aspectFill" ></image> -->

						<view class="chat chat-human">
							<text style="word-break: break-all;">{{x.msg}}</text>
						</view>
						<!-- <image class="chat-img " src="../../static/..." mode="aspectFill" ></image> -->
					</view>
					<!-- 机器人消息 -->
					<view v-if="!x.my" class="chat-item ai-item">
						<!--  <view class="chat-img flex-row-center">
							<image style="height: 75rpx;width: 75rpx;" src="../../static/robt.png" mode="aspectFit"></image>
						</view> -->
						<view class="chat chat-ai">
							<text style="word-break: break-all;">{{x.msg}}</text>
						</view>
					</view>
				</view>
				<!-- loading是显示 -->
				<view v-show="msgLoad" class="">
					<!--  <view class="chat-img flex-row-center">
						<image style="height: 75rpx;width: 75rpx;" src="../../static/robt.png" mode="aspectFit">
						</image>
					</view> -->
					<view class="chat-item ai-item">
						<view class="chat chat-ai" >
							<u-loading-icon color="#1cbbb4" :size="18"></u-loading-icon>
						</view>
					</view>
				</view>
				<!-- 防止消息底部被遮 -->
				<view style="height: 130rpx;">

				</view>
			</view>

		</scroll-view>

		<!-- 底部导航栏 -->
		<view id="bottom" style="position: fixed;bottom:env(safe-area-inset-bottom);width: 100%;">
			<view style="font-size: 55rpx;display:flex;margin:6px;">
				
				<!-- vue无法使用软键盘"发送" -->
				<input v-model="msg" class="uni-input dh-input" type="text" style="background-color: #f0f0f0;" @confirm="check"
					confirm-type="send" placeholder-class="my-neirong-sm" placeholder="聊两句吧~"
					cursor-spacing="10"
					/>
				<u-button type="primary" @click="check" :disabled="msgLoad" 
				:customStyle="{'width':'80rpx','height':'80rpx','margin-left':'15rpx'}" shape="circle"
				color="#1cbbb4" icon="play-right"></u-button>

				<u-button type="info"  @click="goMy" :disabled="msgLoad" class="btn" shape="circle"
				:customStyle="{width:'80rpx',height:'80rpx',marginLeft:'15rpx'}"
				icon="more-dot-fill"></u-button>
				
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>
<script>
	import http from '@/utils/http.js';
	
	export default {
		
		data() {
			return {
				//default_height:0,
				height:0,
				scrollTop:0,
				msgLoad: false,
				anData: {},
				userId: "",
				animationData: {},
				showTow: false,
				msgList: [{
					my: false,
					msg: "你好，我是超级智能，请问有什么可以帮到你?"
				}],
				msg: "",
				limit:false
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({
			　　title:'超级智能聊天'
			})
			
			uni.getSystemInfo({
				success:res=>{
					let height = res.windowHeight;
					// #ifndef H5
						height -= 45;
					// #endif
					height = height - res.safeAreaInsets.bottom - 45;
					this.height = height;
					//this.default_height = height;
				}
			})
			this.base = getApp().globalData.base;
			http.get(this.base+'login', {}).then(res => {
				this.data = res.data;
			})
			
			
		},
		mounted() {
			/*
			const originalHeight=document.documentElement.clientHeight ||document.body.clientHeight;
			window.onresize = ()=>{
				return(()=>{
					//键盘弹起与隐藏都会引起窗口的高度发生变化
					const resizeHeight=document.documentElement.clientHeight || document.body.clientHeight;
					console.log("进入到判断页面高度=========");
					console.log("页面初始高度========="+originalHeight);
					console.log("软键盘弹起高度========="+resizeHeight);
					if(resizeHeight-0<originalHeight-0){
					//当软键盘弹起，在此处操作
					console.log("进入到软键盘弹起=========");
					
						document.querySelector('body').setAttribute('style', 'height:'+originalHeight+'px;');
						this.scrollerHeight=resizeHeight;
					}else{
					//当软键盘收起，在此处操作
					console.log("进入到软键盘收起=========");
					document.querySelector('body').setAttribute('style', 'height:100%;');
					this.scrollerHeight="100%";
					}
				})()

			}*/
		},
		methods: {
			check(){
				// 消息为空不做任何操作
				if (this.msg == "") {
					return;
				}
				
				if(!this.limit){
					this.sendMsg();
					return;
				}
				
				http.get(this.base+'chat', {notip:true}).then(res => {
					this.sendMsg();
				}).catch(error=>{
					let msg = '';
					if(error.data && error.data.message){
						msg = error.data.message;
					}
					else{
						msg = "服务器忙，请稍候再试！";
					}
					this.$refs.uToast.show({
						message:msg,
						type:'info',
						position:'top',
						duration: 3000
					})
				});

			},
			sendMsg() {
				// 消息为空不做任何操作
				if (this.msg == "") {
					return;
				}

				this.msgList.push({
					"msg": this.msg,
					"my": true
				})
				this.msgLoad = true

				
				let params = {
					msg:this.msg,
					notip:true
				}
				this.msg = ""
				this.scrollToButtom();
				http.post(this.base+'chat', params).then(res => {
					if(res.data && res.data.text){
						let text = res.data.text;
						this.msgList.push({
							"msg": text,
							"my": false
						})
						this.limit = res.data.limit;
						this.msgLoad = false
						this.scrollToButtom();
					}
					else{
						uni.showToast({
							title: '服务器出错，请重试',
							icon: 'none'
						})
						this.limit = true;
						this.msgLoad = false
						this.scrollToButtom();
					}
					
				}).catch(error=>{
					uni.showToast({
						title: '服务器出错，请重试',
						icon: 'none'
					})
					this.limit = true;
					this.msgLoad = false
					this.scrollToButtom();
				})
				
			},
			scrollToButtom() {
				const query = uni.createSelectorQuery().in(this);
				let nodesRef = query.select('#chat-list');
				nodesRef
					.boundingClientRect(res => {
						this.$nextTick(() => {
							//进入页面滚动到底部
							this.scrollTop = res.height;
						});
					})
					.exec();
			},
			goMy(e){
				/*
				uni.showToast({
					title: '暂未开放，敬请期待',
					icon: 'none'
				})
				return;*/
				uni.navigateTo({
					url:'/pages/my/my'
				})
			}
			/*
			hideKey() {
				uni.hideKeyboard()
			},*/
		}
	}
</script>

<style>

	
	.chat-item{
		display:flex;
	}
	
	.human-item{
		justify-content: flex-end;
	}
	
	.chat {
		padding: 8px 12px;
		margin:5px 10px 5px 10px;
		font-size:14px;
		max-width: 260px;
	}
	
	.item:first-child .chat{
		margin-top: 20px;
	}
	.chat-human{
		border-radius: 18px 0px 18px 18px;
		background-color: #1cbbb4;
		color:#fff;
	}

	.chat-ai{
		border-radius: 0px 18px 18px 18px;
		background-color: #f9f9f9;
	}
	
	
	
	.my-neirong-sm{
		font-size:14px;
	}
	.bottom-dh-char {
		background-color: #f9f9f9;
		width: 100%;
		height: 110rpx;
	}

	.center-box {
		width: 720rpx;
		padding-left: 25rpx;
	}

	.btn {
		height: 80rpx;
		width: 80rpx;
		margin-left: 15rpx;
		
	}
.flex-row-start {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
}
	.hui-box {
		width: 750rpx;
		height: 100%;

	}

	.dh-input {
		width: 70%;
		height: 80rpx;
		border-radius: 10rpx;
		padding-left: 25rpx;
		margin-left: 15rpx;
		
		background-color: #FFFFFF;
		font-size:14px;
		
	}

	.box-normal {
		width: 750rpx;
		height: 180px;
		background-color: #FFFFFF;
	}

	.tb-text view {
		font-size: 65rpx;
	}

	.tb-text text {
		font-size: 25rpx;
		color: #737373;
	}

	.chat-img {
		border-radius: 50%;
		width: 100rpx;
		height: 100rpx;
		background-color: #f7f7f7;
	}

	
	.tb-nv {
		width: 50rpx;
		height: 50rpx;
	}
</style>
