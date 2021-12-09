import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		deviceId: ''
	},
	getters:{
		deviceId:state => state.deviceId
	},
    mutations: {
		getDeviceId (state, payload) {
			console.log(payload)
			state.deviceId = payload.state
	    },
	},
    actions: {}
})
export default store