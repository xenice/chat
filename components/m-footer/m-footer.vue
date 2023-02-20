<template>
	<view v-if="data.text" class="m-footer">
		<view>{{data.text}}</view>
		<view>{{data.url}}</view>
	</view>
</template>

<script>
	export default {
		props:{
			data:Object
		},
		data() {
			return {
			}
		},
		mounted() {

		},

		methods:{
			
		}
	}
</script>

<style lang="scss">
.m-footer{
	background-color: #fafafa;
	padding:15px;
	text-align: center;
	font-size: 10px;
	color:#bbb;
}
</style>

