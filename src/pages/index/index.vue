<template>
	<view class="content">
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	// import { fetchUserRepositories } from '@/api/repositories'
	import { ref } from 'vue'
	export default {
		// components: { RepositoriesFilters, RepositoriesSortBy, RepositoriesList },
		props: {
			user: {
			  type: String,
			  required: true
			}
		},
		setup (props) {
			const repositories = ref([])
			const getUserRepositories = async () => {
			  // repositories.value = await fetchUserRepositories(props.user)
			}
		
			return {
			  repositories,
			  getUserRepositories
			}
		},
		  // mounted () {
		  //   this.getUserRepositories() // 1
		  // }
		onLoad() {

		},
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
