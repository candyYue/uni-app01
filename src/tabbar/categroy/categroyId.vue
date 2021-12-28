<template>
	<div class='categroy-id'>
		<div class='des'>{{des}}</div>
		<div class='common'>
			<p v-for="(item,index) in common" :key='index'>{{item}}</p>
		</div>
		<div class='action'>
			<image src="../../static/img/todo.png" class='categroy-todo'></image>
			{{action}}
		</div>
	</div>
</template>

<script>
import { category } from './config.js'
	export default{
		data(){
			return {
				cid:0,
				category,
				des:'',
				common:'',
				action:''
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			if(option.cid){
				this.cid = option.cid
				this.des = this.category[option.cid - 1].des
				this.common = this.category[option.cid - 1].common.split('、')
				this.action = this.category[option.cid - 1].action
			}
		}
	}
</script>

<style>
	@import url("/src/static/css/views/categroy.scss");
</style>
