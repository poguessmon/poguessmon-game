import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import db from '@/config/firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: []
  },
  mutations: {
    receiveroom (statename, payload) {
      this.state.rooms = payload
    },
    clearRoom(statename) {
      statename.rooms = []
    },
  },
  actions: {
    insertPlayer({ commit, dispatch, state }, payload) {
      commit('clearRoom')
      db.collection('rooms')
        .doc(payload.roomid)
        .collection('players')
        .add({
          name: payload.name,
          points: 10
        })
      .then((dataCreated) => {
        dispatch('fetchRooms')
      })
      .catch((err) => {
        alert(err)
        console.log(err);
      })

    },
    fetchRooms({ commit, state }) {
      commit('clearRoom')
      db.collection('rooms')
      .onSnapshot((querySnapshot) => {
        let roomsLobby = [] 
        querySnapshot.forEach(doc => {
          const data = {}
          data.id = doc.id
          data.name = doc.data().name
          data.pokelist = doc.data().pokelist
          data.players = []

          db.collection('rooms')
            .doc(data.id)
            .collection('players')
            .onSnapshot((dataPlayers) => { 
              dataPlayers.forEach(val => {
                const player = {
                  id: val.id,
                  ...val.data()
                }
                data.players.push(player)
              })
            })
          roomsLobby.push(data)
        })
        state.rooms = roomsLobby      
      })
    }
  }
})
