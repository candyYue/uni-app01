<template>
	<view class="view weather">
		<view class="today">
			<view class="weather-info">
				<text class="city">{{city}}</text><br/>
				<text class="temp">{{realtime.info}}  {{realtime.temperature}}℃</text><br/>
				<text class="wind">{{realtime.direct}}{{realtime.power}}</text>
			</view>
			{{imageSrc}}
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
		computed: {
			...mapGetters({
				deviceId: 'deviceId'
			})
			// name() {
			// 	return this.data 
			// }
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
				// 
				// 存到云数据库中
				const that = this
				uniCloud.callFunction({ //客户端调用云函数 云函数调用数据库
					name:'weather',
					data:{
						action:'get',
						deviceId: that.deviceId,
					},
					success(res){
						if(res.result.data.length===0){
							that.imageSrc = '../../static/img/monday.jpeg'
						}else{
							that.imageSrc = res.result.data[0].list[0].path
						}
						console.log(res)
					}
				})
			},
			getClientId() {
				const that = this
				uni.getSystemInfo({
					success(res){
						// that.deviceId = res.deviceId
						//设备id 非 App 端由 uni-app 框架生成并存储，清空 Storage 会导致改变
						uni.setStorage({
						    key: 'deviceId',
						    data: res.deviceId,
							success: function () {
								that.getDeviceId(res.deviceId)
							}
						});
					}
				})
			}
		},
		async onLoad(){
			await this.getClientId()
			// this.getWeather()
			this.getWeatherImg()
		}
	}
</script>

<style lang="scss">
	@import url("/src/static/css/views/weather.scss");
</style>
