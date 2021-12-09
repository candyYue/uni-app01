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
			state.deviceId = payload.state
	    },
	},
    actions: {
		getDeviceId: (context, payload) => {
		  context.commit({
			type: 'getDeviceId',
			state: payload
		  })
		}
	}
})
export default store