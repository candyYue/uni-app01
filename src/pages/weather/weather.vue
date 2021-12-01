<template>
	<view>weather</view>
</template>

<script>
	export default{
		methods:{
			getWeather(){
				console.log('get')
				uni.request({
					url:'/juheweather/simpleWeather/query',
					data:{
						key:'7f2e66a7ae64c23103847f0415a09571',
						city:'南京'
					},
					header: {
					    'content-type': 'application/x-www-form-urlencoded'
					},
					success(res) {
						console.log(res)
					},
					fail(err) {
						// reject(err)
					},
				})
			}
		},
		// setup(props){
		// },
		onLoad(){
			this.getWeather()
		}
	}
</script>

<style>
</style>
