<template>
	<view>
		<u-scroll-list class="products" :indicator="indicator">
			<view class="products__item" v-for="(item, index) in list" :key="index" @click="click(item.id)">
				<image class="products__item__image" :src="item.thumbnail"></image>
				<view class="products__item__text">{{item.title.rendered}}</view>
			</view>
		</u-scroll-list>
	</view>
</template>

<script>
	import http from '@/utils/http.js';
	export default {
		props:{
			url:String,
			params:Object
		},
		data() {
			return {
				indicator: true,
				list: {}
			}
		},
		mounted() {
			http.get(this.url, this.params).then(res => {
				this.list = res.data;
				if(this.list.length<3){
					this.indicator = false;
				}
			});
		},

		methods:{
			click(id){
				uni.navigateTo({
					url:'/pages/index/post?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
.products{
	@include flex(column);
	margin-top:5px;
	&__item {
		margin-right: 20px;
		text-align: center;
		
		&__image {
			width: 180px;
			height: 150px;
			border-radius: 4px;
		}
	
		&__text {
			text-align: center;
			font-size: 12px;
		}
	}
	
}
</style>

