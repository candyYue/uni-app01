<template>
	<view class="setting">
		<button type="default" @click="addImg">打开相册</button>
		<view class="list">
			<draggable v-model="list"  
			@start="drag = true"
			@ended="drag = false"
			 chosenClass="chosen-item">
				<transition-group>
					<view class="list-item" v-for="(item,index) in list" :key='index'>
						{{`星期${week[index].label}`}}
						<cover-image class="controls-play img" :src="item.path"></cover-image>
					</view>
				</transition-group>
			</draggable>
		</view>
		<button type="default" @click="saveImg" v-if="list.length===7">保存图片</button>
		<!-- <text @click="drawImg">drawImg</text> -->
	</view>
</template>

<script>
	import draggable from 'vuedraggable'
	import { week } from '../../utils/config/type.js'
	export default {
		data(){
			return {
				list: [],
				drag:false,
				week,
			}
		},
		components:{
			draggable,
		},
		methods:{
			addImg(){
				const that = this
				uniCloud.chooseAndUploadFile({
				  type: 'image',
				  count:7,
				  onChooseFile(res) {
					// if (res.tempFiles.length > 0) {
					// 	uni.showLoading({
					// 		title: '上传中...'
					// 	})
					// }
				    const processAll = []
				    for (let i = 0; i < res.tempFiles.length; i++) {
				      processAll.push(res.tempFiles[i])
				    }
				    return Promise.all(processAll).then((fileList) => {
				      let result = {
				        tempFilePaths: []
				      }
				      result.tempFiles = fileList.map((fileItem, index) => {
				        result.tempFilePaths.push(fileItem.path)
				        return {
				          path: fileItem.path,
				          cloudPath:  `weather/${that.deviceId}/${String(Math.random()*5).split('.')[1]}.png`, //保存在云端的文件名
				        }
				      })
				      return result
				    })
				  },
				  success(res){
					if(res.tempFiles&&res.tempFiles.length){
						let list = []
						const length = res.tempFiles&&res.tempFiles.length
						// if(0<length<7){
						// 	const addItem = res.tempFiles[res.tempFiles.length - 1]
						// 	let addArr = Array(7 - length)
						// 	addArr.fill(addItem)
						// 	list = [...res.tempFiles,...addArr]
						// }else{
							list = [...res.tempFiles]
						// }
						console.log(res)
						that.list = list.map((v,index)=>{
							return { path: v.path, index , url:v.url}
						})
						uniCloud.callFunction({  //调用云端函数，把图片地址写入表
							name:'weather',  //云函数名称
							data: {				//提交给云端的数据
								action:'set',
								deviceId: that.deviceId,
								list: that.list,
								createTime: Date.now()
							}			
						})
					  }
					}
				})
			},
		
		    drawImg(){
				
		    },
			saveImg(){
				
			},
			
		},
		mounted(){
			const that = this
			uni.getStorage({
			    key: 'deviceId',
			    success: function (res) {
			        that.deviceId = res.data
			    }
			});
		}
		
	}
</script>

<style lang="scss">
	@import url("/src/static/css/views/setting.scss");
</style>
