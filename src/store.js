import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: []
  },
  mutations: {
    receiveroom (statename, payload) {
      this.state.rooms = payload
    }
  },
  actions: {

  }
})
