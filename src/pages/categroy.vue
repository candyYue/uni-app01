<template>
	<div>categroy{{cid}}</div>
</template>

<script>
	export default{
		data(){
			return {
				cid:0
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			this.cid = option.cid
		}
	}
</script>

<style>
</style>
