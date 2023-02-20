<template>
	<view v-if="data.nonce">
		<!-- #ifndef H5 -->
		<u-navbar
			title="注册"
			:placeholder="true"
			:border="true"
			leftIcon="arrow-left"
			:autoBack="true"
		>
		</u-navbar>
		<!-- #endif -->
		<m-card :padding="'30px'">
			<view style="text-align: center;">
				<view style="font-size: 18px;">注册超级智能</view>
			</view>
			<u-gap height="30" ></u-gap>
			<u--input 
				placeholder="用户名" 
				v-model="params.username" 
				prefixIcon="account" 
				@input="checkName"
				@blur="checkName"
			>
			</u--input>
			<view class="error" v-if="errors.username">{{errors.username}}</view>
			<u-gap height="20" ></u-gap>
			<u--input 
				placeholder="密码" 
				type="password"
				v-model="params.password" 
				prefixIcon="lock"
				@input="checkPassword"
				@blur="checkPassword"
			></u--input>
			<view class="error" v-if="errors.password">{{errors.password}}</view>
			<u-gap height="20" ></u-gap>
			<u--input 
				placeholder="确认密码" 
				v-model="params.repassword" 
				prefixIcon="lock"
				type="password"
				@input="checkRepassword"
				@blur="checkRepassword"
			></u--input>
			<view class="error" v-if="errors.repassword">{{errors.repassword}}</view>
			<u-gap height="20" ></u-gap>
			<u--input 
				placeholder="邮箱" 
				v-model="params.email" 
				prefixIcon="email"
				@input="checkEmail"
				@blur="checkEmail"
			></u--input>
			<view class="error" v-if="errors.email">{{errors.email}}</view>
			<u-gap height="20" ></u-gap>
			
			<view v-if="data.send_email_code_nonce" class="verify-code">
				<u--input
					placeholder="验证码" 
					v-model="params.email_code" 
					prefixIcon="share-square"
					@input="checkEmailCode"
					@blur="checkEmailCode"
					:customStyle="{'border-radius':'4px 0px 0px 4px'}"
				></u--input>
				<view>
					<u-code :seconds="seconds" @end="end" @start="start" ref="uCode"
					@change="codeChange"></u-code>
					<u-button
					:customStyle="{'border-radius':'0px 4px 4px 0px','border-left':'none','width':'120px'}"
					@tap="getCode"
					color="#1cbbb4"
					>{{tips}}</u-button>
				</view>
			</view>
			<view class="error" v-if="data.send_email_code_nonce && errors.email_code">{{errors.email_code}}</view>
			<u-gap height="50" ></u-gap>
			<u-button text="注册" color="#1cbbb4" :disabled="disabled" @click="register"></u-button>
			<u-gap height="20" ></u-gap>
			<view 
			style="text-align: center;color:#999"
			>已有账号了？<text :style="'color:#1cbbb4'" @click="goLogin">登录账号</text></view>
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
					password:'',
					repassword:'',
					email:'',
					email_code:''
				},
				errors:{
					username:'',
					password:'',
					repassword:'',
					email:'',
					email_code:''
				},
				data:{
					nonce:'',
					send_email_code_nonce:false,
				},
						
				// 验证码
				tips: '',
				seconds: 60,
			}
		},
		computed:{
			disabled(){
				if(this.params.username=='' || this.params.password=='' || this.params.repassword=='' || this.params.email==''){
					return true;
				}
				if(this.errors.username!='' || this.errors.password!='' || this.errors.repassword!='' || this.errors.email!=''){
					return true;
				}
				
				if(this.data.send_email_code_nonce){
					if(this.params.email_code=='' || this.errors.email_code!=''){
						return true;
					}
				}
				
				return false;
			}
		},
		onLoad(options){
			this.base = getApp().globalData.base;
			let settings = getApp().globalData.settings;
			http.get(this.base+'register', {}).then(res => {
				this.data = res.data;
			})
		},
		methods: {
			...mapMutations('user', ['setUser']),
			register(e){
				this.params.nonce = this.data.nonce;
				http.post(this.base+'register', this.params).then(res => {
					if(res.data && res.data.id){
						this.setUser(res.data);
						this.$refs.uToast.show({
							message:"注册成功",
							type:'success',
							position:'top',
							duration: 3000,
							complete() {
								uni.navigateTo({
									url: '/pages/index/index'
								})
							}
						})
					}
					else{
						this.$refs.uToast.show({
							message:'注册失败',
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
						msg = "注册失败";
					}
					this.$refs.uToast.show({
						message:msg,
						type:'error',
						position:'top',
						duration: 3000
					})
				});
			},
			goLogin(e){
				uni.navigateTo({
					url:'/pages/my/login'
				})
			},
			checkName(value){
				if(value == ''){
					this.errors.username = '用户名不能为空';
					return;
				}
				var reg =  /^[0-9a-zA-Z_.\-@]*$/;
				if(!reg.test(value)){
					this.errors.username = '用户名只能为字母、数字或 - _ @ . 组合';
					return;
				}
				this.errors.username = '';
			},
			checkPassword(value){
				if(value == ''){
					this.errors.password = '密码不能为空';
					return;
				}
				this.errors.password = '';
			},
			checkRepassword(value){
				if(value == ''){
					this.errors.repassword = '请输入确认密码';
					return;
				}
				if(value != this.params.password){
					this.errors.repassword = '两次输入密码不一致';
					return;
				}
				this.errors.repassword = '';
			},
			checkEmail(value){
				if(value == ''){
					this.errors.email = '邮箱地址不能为空';
					return;
				}
				var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
				if(!reg.test(value)){
					this.errors.email = '邮箱地址无效';
					return;
				}
				this.errors.email = '';
			},
			
			checkEmailCode(value){
				if(value == ''){
					this.errors.email_code = '请输入验证码';
					return;
				}
				this.errors.email_code = '';
			},
			
			// 验证码
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if(this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					
					this.checkEmail(this.params.email);
					if(this.errors.email != ''){
						uni.hideLoading();
						return;
					}
					
					let params = {
						nonce: this.data.send_email_code_nonce,
						email: this.params.email,
					}
					http.post(this.base+'send-email-code', params).then(res => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送到邮箱');
						// 通知验证码组件内部开始倒计时
						//this.$refs.uCode.start();
					}).catch(error=>{
						this.errors.email = error.data.message;
					});
					
					/*
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);*/
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
			end() {
				uni.$u.toast('倒计时结束');
			},
			start() {
				uni.$u.toast('倒计时开始');
			}
			// end 验证码
		}
	}
	
</script>

<style>
.error{
	color:#e45656;
}
.verify-code{
	display: flex;
}
</style>