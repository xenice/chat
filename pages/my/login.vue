<template>
	<view>
		<!-- #ifndef H5 -->
		<u-navbar
			title="用户登录"
			:placeholder="true"
			:border="true"
			leftIcon="arrow-left"
			:autoBack="true"
		>
		</u-navbar>
		<!-- #endif -->
		<m-card :padding="'30px'">
			<view style="text-align: center;">
				<view style="font-size: 18px;">登录超级智能聊天</view>
			</view>
			<u-gap height="30" ></u-gap>
			<u--input placeholder="用户名/邮箱" v-model="params.username" prefixIcon="account" ></u--input>
			<u-gap height="20" ></u-gap>
			<u--input placeholder="密码" v-model="params.password" prefixIcon="lock" type="password"></u--input>
			<u-gap height="50" ></u-gap>
			<u-button text="登录" color="#1cbbb4" @click="login"></u-button>
			<u-gap height="20" ></u-gap>
			<view 
			style="text-align: center;color:#999"
			>没有账号？<text style="color:#1cbbb4" @click="goRegister">注册账号</text></view>
		</m-card>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import http from '@/utils/http.js';
	import {mapState,mapGetters,mapMutations} from 'vuex'
	export default {
		
		data() {
			return {
				params:{
					username:'',
					password:''
				},
				type:'standard', // standard, simple
				data:{}
			}
		},
		computed:{

		},
		onLoad(options){
			this.base = getApp().globalData.base;
			let settings = getApp().globalData.settings;
			
			http.get(this.base+'login', {}).then(res => {
				this.data = res.data;
			})
		},
		methods: {
			...mapMutations('user', ['setUser']),
			login(e){
				if(this.params.username == ''){
					this.$refs.uToast.show({
						message:'用户名不能为空',
						type:'error',
						position:'top',
						duration: 2000
					})
					return;
				}
				
				if(this.params.password == ''){
					this.$refs.uToast.show({
						message:'密码不能为空',
						type:'error',
						position:'top',
						duration: 2000
					})
					return;
				}
				
				this.params.nonce = this.data.nonce;
				http.post(this.base+'login', this.params).then(res => {
					if(res.data && res.data.id){
						this.setUser(res.data);
						this.$refs.uToast.show({
							message:"登录成功",
							type:'success',
							position:'top',
							duration: 3000,
							complete(){
								
								uni.navigateTo({
									url: '/pages/index/index'
								})
							}
						})
					}
					else{
						this.$refs.uToast.show({
							message:'登录失败',
							type:'error',
							position:'top',
							duration: 3000
						})
					}
					//this.data = res.data;
				}).catch(error=>{
					let msg;
					if(error.data && error.data.message){
						msg = error.data.message;
					}
					else{
						msg = "登录失败";
					}
					this.$refs.uToast.show({
						message:msg,
						type:'error',
						position:'top',
						duration: 3000
					})
				});
			},
			goRegister(e){
				uni.navigateTo({
					url:'/pages/my/register'
				})
			}
		}
	}
	
</script>

<style>

</style>