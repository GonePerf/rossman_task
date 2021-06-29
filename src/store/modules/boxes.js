const state = {
    
	boxes:  [],

};

const getters = {

	boxes: (state) => {
		return state.boxes
	},

};

const mutations = {
	
	setBoxes(state, boxes) {
		state.boxes = boxes
	},

};

const actions = {
	
	async getBoxes({ commit }) {
		await fetch('http://localhost:4000/boxes')
			.then(res => res.json())
			.then(data => {
				commit('setBoxes', data)
			})
			.catch(err => console.log(err.message))
	},

};

export default {

	state,

	getters,

	mutations,

	actions

};