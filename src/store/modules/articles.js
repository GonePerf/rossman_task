const state = {
	
	users: [],

	articles:  [],

};

const getters = {

	articles: (state) => {
		return state.articles
	},

};

const mutations = {
	
	setArticles(state, articles) {
		state.articles = articles
	},

};

const actions = {
	
	async getArticles({ commit }) {
		await fetch('http://localhost:3000/articles')
			.then(res => res.json())
			.then(data => {
				commit('setArticles', data)
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