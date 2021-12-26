<template>
	<div class='garbage'>
		<input placeholder="你输入搜索内容" confirm-type='search' class="garbage-search"/>
		<div class='garbage-category'>
			<div v-for="(item,index) in category" :key='index' @click='goCategory(item.value)'>
				{{item.label}}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				category:[
					{label:'干垃圾',value:1,des:'（其他垃圾）包括除上述几类垃圾之外的砖瓦陶瓷、渣土、卫生间废纸、纸巾等难以回收的废弃物及尘土、食品袋（盒）。采取卫生填埋可有效减少对地下水、地表水、土壤及空气的污染。'},
					{label:'湿垃圾',value:2,des:'（厨余垃圾）包括剩菜剩饭、骨头、菜根菜叶、果皮等食品类废物。经生物技术就地处理堆肥，每吨可生产0.6~0.7吨有机肥料。'},
					{label:'可回收垃圾', value:3, des:'可回收物主要包括废纸、塑料、玻璃、金属和布料五大类'},
					{label:'有害垃圾',value:4,des:'有害垃圾含有对人体健康有害的重金属、有毒的物质或者对环境造成现实危害或者潜在危害的废弃物。包括电池、荧光灯管、灯泡、水银温度计、油漆桶、部分家电、过期药品及其容器、过期化妆品等。这些垃圾一般使用单独回收或填埋处理。'}
				],
				camera:null,
				renderer:null,
			}
		},
		methods:{
			goCategory(index){
				uni.navigateTo({
					url: "../../pages/categroy?cid="+index,
				})
			}
		},
	}
</script>

<style lang="scss">
	@import url("/src/static/css/views/menu.scss");
</style>
