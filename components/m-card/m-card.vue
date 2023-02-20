<template>
	<view>
		<view class="m-card" :style="style">
			<u-row>
				<u-col span="8">
					<view v-if="title" class="m-card__title">{{title}}</view>
				</u-col>
				<u-col span="4" >
					<view v-if="text" class="m-card__text" @click="click">{{text}}</view>
				</u-col>
			</u-row>
			<view v-if="content" class="m-card__content">{{content}}</view>
			<slot></slot>
		</view>
	</view>
</template>

<script>
	
	export default {
		props:{
			title:String,
			content:String,
			text:String,
			url:String,
			params:Object,
			extra:String,
			extra1:String,
			bgcolor:String,
			padding:String,
			margin:String
		},
		data() {
			return {
				style:''
			};
		},
		mounted(){
			if(this.bgcolor){
				this.style += "background-color:" + this.bgcolor + ";";
			}
			if(this.padding){
				this.style += "padding:" + this.padding + ";";
			}
			if(this.margin){
				this.style += "margin:" + this.margin + ";";
			}
		},
		methods:{
			click(){
				if(this.url){
					let url = this.url;
					let arr = [];
					 
					if(this.params != undefined){
						arr.push('params=' + JSON.stringify(this.params));
					}
					
					if(this.extra != undefined){
						arr.push('extra=' + this.extra);
					}
					
					if(this.extra1 != undefined){
						arr.push('extra1=' + this.extra1);
					}
					
					if(arr.length>0){
						let str = arr.join('&');
						url += '?' + str;
					}

					uni.navigateTo({
						url:url
					})
				}
			}
		}
	}
</script>

<style lang="scss">
.m-card {
	color: #333;
	font-size:15px;
	line-height:1.8;
	padding: 10px;
	&__title{
		font-weight: 600;
		height: 30px;
	}
	&__text{
		font-size: 14px;
		color:#999;
	}
	&__content{
	}
}

</style>

