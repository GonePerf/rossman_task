const state = {
    
	box:  null,

};

const getters = {

	box: (state) => {
		return state.box
	},

};

const mutations = {
	
	setBox(state, box) {
		state.box = box
	},

};

const actions = {
	
	async getBox({ commit }, BoxCode) {
		await fetch('http://localhost:4000/boxes/' + BoxCode)
			.then(res => {
				if(res.ok) {
					return res.json()
				}
				else throw new Error()
			})
			.then(data => {
				commit('setBox', data)
			})
	},

};

export default {

	state,

	getters,

	mutations,

	actions

};