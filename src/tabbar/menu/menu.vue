<template>
	<view class="view menu" @click="gotoPage">menu</view>
</template>

<script>
	export default{
		setup(props){
			const gotoPage = ()=>uni.navigateTo({
				url: '/src/pages/weather/weather'
			});
			return {
				gotoPage
			}
		}
		
	}
</script>

<style lang="scss">
// @import "@/uni.scss"; //自带的uni样式 不需要引入
	.view{
		padding: 20px;
		&.menu{
			text-align: center;
			color: $uni-color-primary
		}
	}
	
</style>
