<template>
	<view class="view weather">
		<view class="today">
			<view class="weather-info">
				<text class="city">{{city}}</text><br/>
				<text class="temp">{{realtime.info}}  {{realtime.temperature}}℃</text><br/>
				<text class="wind">{{realtime.direct}}{{realtime.power}}</text>
			</view>
			<!-- <image class="weather-img" src="../../static/img/monday.jpeg"></image> -->
			<!-- <image class="weather-img-blur" mode="widthFix" src="../../static/img/monday.jpeg"></image> -->
		</view>
		
		<view v-for="(item,index) in future" class="future" :key='index'>
			<text>{{item.date}}</text>
			<text>{{item.weather}}</text>
			<text>{{item.temperature}}</text>
		</view>
	</view>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
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
				future: [],
				imageSrc:''
			}
		},
		methods:{
			...mapActions({
				getDeviceId: 'getDeviceId'
			}),
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
			},
			getWeatherImg(){
				this.imageSrc = '../../static/img/monday.jpeg'
			},
			getClientId() {
				const that = this
				uni.getSystemInfo({
					success(res){
						// that.deviceId = res.deviceId
						//设备id 非 App 端由 uni-app 框架生成并存储，清空 Storage 会导致改变
						uni.setStorage({
						    key: 'deviceId',
						    data: res.deviceId
						});
						that.getDeviceId(res.deviceId)
					}
				})
			}
		},
		onLoad(){
			this.getWeather()
			this.getWeatherImg()
			this.getClientId()
			console.log(mapActions)
		}
	}
</script>

<style lang="scss">
	@import url("/src/static/css/views/weather.scss");
</style>
