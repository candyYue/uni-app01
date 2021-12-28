<template>
	<div class='garbage'>
		<div class="garbage-search">
			<image src="../../static/icon/camare.png" @click='chooseImg' class='search-img'></image>
			<input placeholder="你输入搜索内容" confirm-type='search' class="garbage-input" @confirm='searchInput'/>
			<image src="../../static/icon/search.png" @click='searchInput' class='search-txt'></image>
		</div>
		<div class='garbage-category'>
			<div v-for="(item,index) in category" :key='index' @click='goCategory(item.value)'>
				{{item.label}}
			</div>
		</div>
		<!-- <div class="spinner" v-if='showLoading'>
		  <div class="double-bounce1"></div>
		  <div class="double-bounce2"></div>
		</div> -->
		<div v-if='categroyRes.key'>
			{{categroyRes.name}} <br>
			属于<br> {{categroyRes.key}}
		</div>
	</div>
</template>

<script>
	import { category } from './config.js'
	export default {
		data(){
			return {
				category,
				camera:null,
				renderer:null,
				imgBase64:'',
				imgURL:'',
				access_token:'',
				keyword:'',
				showLoading: false,
				categroyRes:{
					name:'',
					key:''
				}
			}
		},
		methods:{
			goCategory(index){
				uni.navigateTo({
					url: "./categroyId?cid="+index,
				})
			},
			getAccessToken(){
				uni.request({
				    url: '/baidu/oauth/2.0/token', //仅为示例，并非真实接口地址。
				    data: {
						grant_type:'client_credentials',
				        client_id: 'gBOdzoL95TFLlhpVTHHyDTDx',
						client_secret:'tSC16r2iVwLCrCqEgR37FA0lHFreHErU'
				    },
				    success: (res) => {
				        this.access_token = res.data.access_token
						this.getKeyword(res.data.access_token)
				    }
				});
			},
			getKeyword(access_token){
				uni.request({
				    url: 'baidu/rest/2.0/image-classify/v2/advanced_general', //仅为示例，并非真实接口地址。
				    data: {
						access_token,
						url: this.imgURL
				    },
				    success: (res) => {
				        console.log(res)
						this.keyword = res.data.result[0].keyword
						this.analysisImg(this.keyword)
				    }
				});
			},
			searchInput(event){
				const kw = event.detail.value
				if(kw){
					this.analysisImg(kw)
				}
			},
			analysisImg(keyword){
				uni.request({
				    url: '/keyword/wx_miniprogram/sites/feiguan/trashTypes_2/Handler/Handler.ashx',
				    data: {
						a:'EXC_QUERY',
						kw: keyword
				    },
				    success: (res) => {
						this.showLoading = false
				        console.log(res)
						if(res.data.query_result_type_1&&res.data.query_result_type_1.TypeKey){
							this.categroyRes = {
								name:res.data.query_result_type_1.Name,
								key:res.data.query_result_type_1.TypeKey
							}
						}
				    }
				});
			},
			getBase64Image(img) {
			    var canvas = document.createElement("canvas");
			    canvas.width = img.width;
			    canvas.height = img.height;
			
			    var ctx = canvas.getContext("2d");
			    ctx.drawImage(img, 0, 0, img.width, img.height);
			    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
			    var dataURL = canvas.toDataURL("image/"+ext);
			    return dataURL;
			},
			chooseImg(){
				const that = this
				uni.chooseImage({
				    count: 1,
					sourceType:['album', 'camera'],
				    success(res) {
						that.showLoading = true
				        if (res.tempFilePaths.length > 0) {
				            let filePath = res.tempFilePaths[0]
				            uniCloud.uploadFile({
				                filePath: filePath,
								cloudPath: 'garbage/a.jpg',
				                async success(res) {
									let result = await uniCloud.getTempFileURL({
									    fileList: [res.fileID]
									});
									that.imgURL = result.fileList[0].download_url
									// var image = new Image();
									// image.crossOrigin = '';
									// image.src = result.fileList[0].download_url;
									// image.onload = function(){
									//     that.imgBase64 = that.getBase64Image(image).slice(22);
									// 	console.log(that.imgBase64)
										that.getAccessToken()
									// }
								},
				                fail() {
									that.showLoading = false
								}
				            });
				        }
				    }
				});
			}
		},
	}
</script>

<style lang="scss">
	@import url("/src/static/css/views/categroy.scss");
</style>
