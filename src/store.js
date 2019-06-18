import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
	conservationStates: []
}

const mutations = {
	'set-conservation-states'(state, conservationStates) {
		state.conservationStates = conservationStates
	}
}

const actions = {
	'load-conservation-states'(context, data) {
		context.commit('set-conservation-states', [
			{
				id: 1,
				code: 'POOR',
				desc: 'Poor'
			},
			{
				id: 2,
				code: 'G',
				desc: 'Good'
			},
			{
				id: 3,
				code: 'VG',
				desc: 'Very Good'
			},
			{
				id: 4,
				code: 'F',
				desc: 'Fine'
			},
			{
				id: 5,
				code: 'F / VG',
				desc: 'Fine/Very Fine'
			},
			{
				id: 6,
				code: 'VF',
				desc: 'Very Fine'
			},
			{
				id: 7,
				code: 'VF / EF',
				desc: 'Very Fine / Extremely Fine'
			},
			{
				id: 8,
				code: 'EF or XF',
				desc: 'Extremely Fine or Extra Fine'
			},
		])
	}
}

export default new Vuex.Store({
	state,
	getters: {
		conservationStates: state => state.conservationStates,
	},
	mutations,
	actions
})