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
      statename.rooms = payload
    },
    clearRoom(statename) {
      statename.rooms = []
    },
    setRooms(state, payload){
      state.rooms = payload
    },
    updatePlayer(state, payload){
       let room = state.rooms.find(obj => obj.id === payload.id)
       room.players = payload.players
      
    }
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
        localStorage.setItem('room', payload.roomid)
        localStorage.setItem('username', payload.name)
        localStorage.setItem('userid', dataCreated.id)
      })
      .catch((err) => {
        alert(err)
        console.log(err);
      })

    },
    setMaster({ commit, dispatch, state}, payload) {
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
        localStorage.setItem('room', payload.roomid)
        localStorage.setItem('username', payload.name)
        localStorage.setItem('userid', dataCreated.id)
        db.collection('rooms')
          .doc(payload.roomid)
          .update({
            master : payload.name
          })
      })
      .catch((err) => {
        alert(err)
        console.log(err);
      })

    },
    fetchRooms({ commit, state }) {
      db.collection('rooms')
      .onSnapshot((querySnapshot) => {
        //commit('clearRoom')
        let roomsLobby = [] 
        querySnapshot.forEach(doc => {
          console.log("ketriger gak")
          const data = {}
          let fromRooms = true
          data.id = doc.id
          data.name = doc.data().name
          data.pokelist = doc.data().pokelist
          data.players = []
          db.collection('rooms')
            .doc(data.id)
            .collection('players')
            // .onSnapshot((dataPlayers) => { 
            //   dataPlayers.forEach(val => {
            //     const player = {
            //       id: val.id,
            //       ...val.data()
            //     }
            //     data.players.push(player)
            //   })
            // })
            .onSnapshot(
            (dataPlayers)=>{
              console.log( data,"ini data player")
              console.log(data.id, "ini data.id")
                // let id = dataCreated.getRef().id
                // alert(id)
                let players = []
                let updatedRoom = state.rooms.find(obj => obj.id === data.id)
                console.log(updatedRoom, "updatedRoomnya")

                updatedRoom.players = []
                console.log(updatedRoom, "updatedRoomnya seteleah di kosongin")

                dataPlayers.forEach(val => {
                const player = {
                  id: val.id,
                  ...val.data()
                }
                players.push(player)
              })
              updatedRoom.players = players
              console.log(updatedRoom, "updatedRoomnya seteleah di players")
              // if(!fromRooms){
              //   let payload = {
              //     id : id,
              //     players : dataPlayers
              //   }
              //   commit('updatePlayer', )
              // }else{

              // }
      
            })
          roomsLobby.push(data)
        })
        //state.rooms = roomsLobby 
        commit('setRooms', roomsLobby)     
      })
    }
  }
})
