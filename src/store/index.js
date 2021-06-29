import Vue from 'vue'
import Vuex from 'vuex'
import articles from './modules/articles'
import boxes from './modules/boxes'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    articles,
    boxes
  }
})
