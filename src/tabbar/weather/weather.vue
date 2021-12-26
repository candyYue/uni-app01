<template>
	<view class="view weather">
		<view :class="['today',isshow?'':'today-up']">
			<view class="city">
				<image src="../../static/icon/location.png" mode=""></image>
				<div class="uni-list">
					 <picker @change="changeCity" :value="index" :range="array">
						 <view class="uni-input">{{array[index]}}</view>
					 </picker>
				</div>
			</view>
			<view class="weather-info">
				<text class="temp">{{realtime.info}}  {{realtime.temperature}}℃</text>
			</view>
			<image class="weather-img" :src="imageSrc"></image>
			<!-- <image class="weather-img-blur" mode="widthFix" :src="imageSrc"></image> -->
			
		</view>
		
		<view :class="['detail',isshow?'detail-up':'']">
			<view class="up-btn" @click="showaction">
				{{isshow?'ˇ':'ˆ'}}
			</view>
			<view class="detail-info">
				<view class="airquality">
					<p>空气质量指数</p>
					<p>{{realtime.aqi}}</p>
					<image src="../../static/icon/airquality.png" mode=""></image>
				</view>
				<view class="humidity">
					<p>湿度</p>
					<p>{{realtime.humidity}}</p>
					<image src="../../static/icon/humidity.png" mode=""></image>
				</view>
				<view class="winddirection">
					<p>风向</p>
					<p>{{realtime.direct}}</p>
					<image src="../../static/icon/winddirection.png" mode=""></image>
				</view>
				<view class="windpower">
					<p>风力</p>
					<p>{{realtime.power}}</p>
					<image src="../../static/icon/windpower.png" mode=""></image>
				</view>
			</view>
			<view v-for="(item,index) in future" class="future" :key='index'>
				<text>{{item.date}}</text>
				<text>{{item.weather}}</text>
				<text>{{item.temperature}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex'
	export default{
		data(){
			return{
				city:'南京',
				realtime:{
					aqi: "75",
					direct: "东南风",
					humidity: "90",
					info: "多云",
					power: "1级",
					temperature: "6",
					wid: "01"
				},
				array: ['南京', '扬州', '西安', '云南'],
				index: 0,
				future: [{
					date: "2021-12-15",
					direct: "东风转北风",
					temperature: "9/15℃",
					weather: "阴转小雨",
				},{
					date: "2021-12-15",
					direct: "东风转北风",
					temperature: "9/15℃",
					weather: "阴转小雨",
				}],
				imageSrc:'',
				isshow:false
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
			getWeather(city){
				uni.request({
					url:'/juheweather/simpleWeather/query',
					data:{
						key:'7f2e66a7ae64c23103847f0415a09571',
						city,
					},
					header: {
					    'content-type': 'application/x-www-form-urlencoded'
					},
					success:(res)=> {
						if(res.statusCode ===200){
							const {city, future, realtime} = res.data.result
							this.city = city
							this.future = [...future]
							this.realtime = realtime
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
						let imgurl = ''
						if(res.result.data.length>0){
							imgurl = res.result.data[0].list[0].url
						}
						uniCloud.getTempFileURL({
						    fileList: [imgurl],
						    success(res) {
								console.log(res)
								if(res.fileList&&res.fileList.length){
									that.imageSrc = res.fileList[0].download_url || ''
								}
							},
						    fail() {},
						    complete() {}
						});
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
			},
			showaction(){
				this.isshow =! this.isshow
				console.log(this.isshow)
			},
			changeCity(e){
				this.index = e.target.value
				this.getWeather(this.array[e.target.value])
			},
		},
		async onLoad(){
			await this.getClientId()
			// this.getWeather()
			// this.getWeatherImg()
		}
	}
</script>

<style lang="scss">
	@import url("/src/static/css/views/weather.scss");
</style>
