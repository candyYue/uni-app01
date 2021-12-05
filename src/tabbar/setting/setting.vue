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
				week
			}
		},
		components:{
			draggable,
		},
		methods:{
			addImg(){
				const that = this
				uni.chooseImage({
					count: 7,
				    sizeType: ['original', 'compressed'],
				    sourceType: ['album'],
				    success: function(res) {
						let list = []
						const length = res.tempFilePaths&&res.tempFilePaths.length
						if(0<length<7){
							const addItem = res.tempFilePaths[res.tempFilePaths.length - 1]
							let addArr = Array(7 - length)
							addArr.fill(addItem)
							list = [...res.tempFilePaths,...addArr]
						}else{
							list = [...res.tempFilePaths]
						}
						that.list = list.map((v,index)=>{
							return {
								path:v,
								index,
							}
						})
						console.log(that.list)
				        // 预览图片
				        // uni.previewImage({
				        //     urls: res.tempFilePaths,
				        //     longPressActions: {
				        //         itemList: ['发送给朋友', '保存图片', '收藏'],
				        //         success: function(data) {
				        //             console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				        //         },
				        //         fail: function(err) {
				        //             console.log(err.errMsg);
				        //         }
				        //     }
				        // });
				    }
                });
			},
		
		    drawImg(){
				
		    },
			saveImg(){
				
			}
		}
	}
</script>

<style lang="scss">
	@import url("/src/static/css/views/setting.scss");
</style>
