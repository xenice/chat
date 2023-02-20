<template>
	<view>
		<!-- #ifndef H5 -->
		<u-navbar
			title="超级智能聊天"
			:placeholder="true"
			:border="true"
			:autoBack="true"
		>
		</u-navbar>
		<!-- #endif -->
		<m-card padding="'30px 10px'">
			<view style="display: flex;align-items: center;">
				<template v-if="user.id">
					<u--image :src="user.avatar" shape="circle" width="65px" height="65px"></u--image>
					<view style="margin-left: 10px;" >
						<view>{{user.nickname}}(已登录)</view>
						<view 
						style="font-size: 13px;color:#999">
						剩余对话次数：<text v-if="loaded">{{count}}次</text>
						</view>
					</view>
				</template>
				<template v-else>
					<u--image :src="default_avatar" shape="circle" width="65px" height="65px"></u--image>
					<view style="margin-left: 10px;" >
						<view @click="goLogin">未登录</view>
						<view 
						style="font-size: 13px;color:#999">
						剩余对话次数：<text v-if="loaded">{{count}}次</text>
						</view>
					</view>
				</template>
			</view>
		</m-card>
		<u-gap height="8" bgColor="#fafafa"></u-gap>
		<u-cell
			@click="clickCell"
			name="server"
			title="联系客服"
			icon="kefu-ermai"
			isLink
		></u-cell>
		<!--<u-cell
			@click="clickCell"
			name="share"
			title="推荐分享"
			icon="share"
			isLink
		></u-cell>-->
		
		<u-cell
			v-if="user && user.id"
			@click="clickCell"
			name="exit"
			title="退出账号"
			icon="trash"
			isLink
		></u-cell>
		<u-cell
			v-else
			@click="clickCell"
			name="login"
			title="登录注册"
			icon="account"
			isLink
		></u-cell>
		<u-modal :show="showServer"  title="联系客服" @confirm="hideServer" confirmColor="#1cbbb4">
			<view style="display: flex;flex-direction: column;align-items: center;">
				<view>
					<u--image :height="200" :width="200" :src="server_qrcode"
					></u--image>
				</view>
				<!-- #ifdef H5 -->
				<view style="color:#999">扫一扫，添加微信</view>
				<!-- #endif -->

				<!-- #ifdef MP-WEIXIN -->
				<view style="color:#999">长按添加微信</view>
				<!-- #endif -->
			</view>
			
		</u-modal>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import http from '@/utils/http.js';
	import {mapState,mapGetters,mapMutations} from 'vuex'
	
	export default {
		
		data() {
			return {
				frontend_url:'',
				default_avatar:'',
				server_qrcode:'',
				showServer : false,
				count:0,
				loaded:false
			}
		},
		computed:{
			...mapState('user', ['user'])
		},
		
		onLoad(){
			this.base = getApp().globalData.base;
			let settings = getApp().globalData.settings;
			this.default_avatar = settings.default_avatar;
			this.server_qrcode = settings.server_qrcode;
			let user = uni.getStorageSync('xenice_user');
			http.get(this.base+'chat/count', {}).then(res => {
				this.count = res.data;
				this.loaded = true;
			})
			
			
		},
		methods: {
			...mapMutations('user', ['clearUser']),
			goLogin(){
				uni.navigateTo({
					url:'/pages/my/login'
				})
			},
			clickCell(e){
				if(e.name == 'exit'){
					uni.showModal({
					    title: '确认退出',
					    content: '是否退出账号',
						confirmColor:'#1cbbb4',
					    success: (res) =>{
					        if (res.confirm) {
					            this.clearUser();
								http.get(this.base+'chat/count', {}).then(res => {
									this.count = res.data;
								})
					        } else if (res.cancel) {
					        }
					    }
					});
					return;
				} // #exit
				
				if(e.name == 'server'){
					this.showServer = true;
					return;
				} // #server
				
				if(e.name == 'login'){
					this.goLogin();
					return;
				} // #login
				
				if(e.name == 'share'){
					// #ifdef H5
					if (document.queryCommandSupported('copy')) {
						let txt = this.frontend_url;
						let textarea = document.createElement("textarea")
						textarea.value = txt
						textarea.readOnly = "readOnly"
						document.body.appendChild(textarea)
						textarea.select() // 选中文本内容
						textarea.setSelectionRange(0, txt.length)
						let result = document.execCommand("copy")
						textarea.remove()
						this.$refs.uToast.show({
							message:'分享链接已复制至剪切板',
							type:'success',
							position:'top',
							duration: 2000
						})
					} else {
						this.$refs.uToast.show({
							message:'您的浏览器不支持复制',
							type:'error',
							position:'top',
							duration: 2000
						})
					}
					// #endif  
					return;
				} // #share
			},
			hideServer(e){
				this.showServer = false;
			}
		}
	}
	
</script>

<style>

</style>