<template>
	<view>
		{{city}}
		{{realtime.info}}{{realtime.temperature}}
		{{realtime.direct}}{{realtime.power}}
	</view>
</template>

<script>
	export default{
		data(){
			return{
				city:'',
				realtime:{
					temperature:0,
					info:'晴',
					direct:'',
					power:''
				},
				future: []
			}
		},
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
						if(res.statusCode ===200){
							const {city, future, realtime: {info,temperature,direct,power}} = res.data.result
							this.city = city
							this.future = [...future]
							this.realtime = {
								info,
								temperature,
								direct,
								power
							}
						}
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
