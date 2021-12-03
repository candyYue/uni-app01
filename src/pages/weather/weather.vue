<template>
	<view>
		<p>{{city}}</p>
		<p>{{realtime.info}}{{realtime.temperature}}</p>
		<p>{{realtime.direct}}{{realtime.power}}</p>
		
		<ul>
			<li v-for="(item,index) in future">
				<span>{{item.date}}</span>
				<span>{{item.weather}}</span>
				<span>{{item.temperature}}</span>
			</li>
		</ul>
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
				uni.request({
					url:'/juheweather/simpleWeather/query',
					data:{
						key:'7f2e66a7ae64c23103847f0415a09571',
						city:'南京'
					},
					header: {
					    'content-type': 'application/x-www-form-urlencoded'
					},
					success:(res)=> {
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
					},
				})
			}
		},
		onLoad(){
			this.getWeather()
		}
	}
</script>

<style>
</style>
