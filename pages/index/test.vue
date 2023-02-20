<template>
</template>

<script>
	import http from '@/utils/http.js';
	export default {
		data() {
			return {
			}
		},

		onLoad(options) {
			this.base = getApp().globalData.base;
			http.get(this.base+'settings', {}).then(res => {
				
			}, err => {
				console.log(err)
			});
		},
	};
	
</script>

<style>
</style>