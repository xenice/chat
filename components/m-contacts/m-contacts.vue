<template>
	<view class="m-contacts">
		<template v-for="(item, index) in list" >
			<u-row customStyle="margin-bottom: 10px">
				<u-col span="1">
					<u-icon :name="item.icon" size="18"></u-icon>
				</u-col>
				<u-col span="11">
					<view>{{item.value}}</view>
				</u-col>
			</u-row>
		</template>
		
	</view>
</template>

<script>
	export default {
		props:{
			list:Array
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
.m-contacts{
	margin-top:5px;
	color:#666;
}
</style>

