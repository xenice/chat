<template>
	<view>
		<u-list
			:class="[hasMore?'m-list':'m-list m-list-nomore']"
			@scrolltolower="scrolltolower"
		>
			<u-list-item
				v-for="(item, index) in list"
				:key="index"
			>
			<u-row class="m-list-row" customStyle="margin-bottom:10px;">
				<u-col span="5">
					<u--image :showLoading="true" :src="item.thumbnail" width="140px" height="120px" radius="5px" ></u--image>
				</u-col>
				<u-col span="7">
					<view class="m-list-title" @click="click(item.id)">{{item.title.rendered}}</view>
					<view class="m-list-date">{{item.post_date}}</view>
				</u-col>
			</u-row>
				
			</u-list-item>
			<u-loadmore v-if="hasMore" :status="status" />
		</u-list>
	</view>
</template>

<script>
	import http from '@/utils/http.js';
	export default {
		props:{
			hasMore:{
				type:Boolean,
				default:false,
			},
			url:String,
			params:Object
		},
		data() {
			return {
				list: [],
				status: 'loadmore'
			};
		},
		mounted() {
			if(this.hasMore){
				this.class = "m-list-nomore"
			}
			this.loadMore()
		},
		methods:{
			scrolltolower(){
				if(this.status == 'nomore') return;
				if(this.hasMore && this.status == 'loadmore'){
					this.status = 'loading'
					this.loadMore();
				}
			},
			loadMore() {
				this.params.offset = this.list.length;
				http.get(this.url, this.params).then(res => {
					if(res.data.length < this.params.per_page){
						this.status = 'nomore';
					}
					else{
						this.status = 'loadmore'
					}
					this.list = this.list.concat(res.data);
				});
			},
			click(id){
				uni.navigateTo({
					url:'/pages/index/post?id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
.m-list {
	padding-top:5px;
	.m-list-row{
		position: relative;
		.m-list-title{
			position: absolute;
			top:0;
		}
		.m-list-date{
			color:#999;
			font-size:13px;
			position: absolute;
			bottom:0;
		}
	}
	
}
.m-list-nomore{
	height: 100% !important;
}
</style>

