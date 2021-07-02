const state = {
	
	users: [],

	article:  null,

};

const getters = {

	article: (state) => {
		return state.article
	},

};

const mutations = {
	
	setArticle(state, article) {
		state.article = article
	},

};

const actions = {
	
	async getArticle({ commit }, code) {
		
			await fetch('http://localhost:3000/articles/'+code)
			.then(res => {
				if(res.ok) {
					return res.json()
				}
				else throw new Error()
			})
			.then(data => {
				commit('setArticle', data)
			})
		
	},

};

export default {

	state,

	getters,

	mutations,

	actions

};