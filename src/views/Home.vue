<template>
  <div class="home">
    <!-- Navbar -->
    <navigationbar></navigationbar>
    <b-modal :active.sync="isComponentModalActive" has-modal-card>
      <ModalForm :selected="selected"></ModalForm>
    </b-modal>
    <!-- Form Modal -->
    <!-- Header -->
    <div class="columns is-multiline">
      <div class="column is-half room-form" id="create-room">
        <h2>Create a Room</h2>
        <b-field label="Room Name">
          <b-input v-model="name" placeholder="Room Name"></b-input>
        </b-field>
        <b-field label="Room Master">
          <b-input v-model="master" placeholder="Room Master"></b-input>
        </b-field>
        <b-button
          type="is-primary"
          @click.prevent="createRoom"
        >Create Room</b-button>
      </div>
      <div class="column is-half">
      </div>
    </div>
    <!-- Body -->
    <div>
      <h1>Room List</h1>
      <div class="columns is-multiline room-list">
        <div v-for="room in rooms" :key="room.id" class="column is-4">
          <div class="box">
            <div class="columns is-multiline">
              <div class="column is-half">
                <h1>{{room.name}}</h1>
              </div>
              <div class="column is-half">
                <b-button
                v-if="room.players.length <=5" 
                rounded
                type="is-primary"
                icon-pack="fas"
                icon-right="sign-in-alt"
                style="font-weight:600"
                @click="isComponentModalActive = true; selected = room.id">
                Join This Room</b-button>
                <b-button
                v-if="room.players.length >= 6" 
                rounded
                disabled
                type="is-primary"
                icon-pack="fas"
                icon-right="sign-in-alt"
                style="font-weight:600">
                Join This Room</b-button>
              </div>
            </div>
            <p style="text-align: left">Players Count : {{room.players.length}}/6</p>
            <h3>Players List</h3>
            <div v-for="player in room.players" :key="player.id" class="player-list">
              <li>
                <b-icon
                pack="fas"
                icon="user"
                style="margin-right : 15px;"
                size="is-small">
                </b-icon>{{player.name}}
              </li>
            </div>
            <b-button @click="startGame(room.id)">Start</b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import navigationbar from '@/components/Nav-Bar.vue'
import axios from 'axios'
import ModalForm from '@/components/Form-Player.vue'
import db from '@/config/firebase.js'
export default {
  created () {
    console.log(this.$store.state.rooms);
    this.$store.dispatch('fetchRooms')
  },
  name: 'home',
  components: {
    HelloWorld,
    navigationbar,
    ModalForm,
  },
  data () {
    return {
      roomsHome: [],
      name: null,
      master: null,
      isComponentModalActive: false,
      selected: null
    }
  },
  computed: {
    rooms () {
      return this.$store.state.rooms
    }
  },
  methods: {
    createRoom () { 
      let pokemon = []
      for(let i = 0; i< 10; i++) {
        const rnd = Math.floor(Math.random() * (151 - 1) + 1)
        pokemon.push(new Promise ((resolve, reject) => {
          axios({
            url : `https://pokeapi.co/api/v2/pokemon/${rnd}`,
            method : 'GET',
          })
            .then(({ data }) => {
              const poke = {
                id : data.id,
                name : data.name,
                picture : data.sprites.front_default
              }
              resolve(poke)
            })
            .catch((err) => {
              reject(err)
              console.log(err);
            })
        }))
      }
      Promise.all(pokemon)
      .then((poke) => {
        console.log(poke, 'Ini Data');
        db.collection('rooms').add({
          name: this.name,
          playing:false,
          pokelist: poke,
          master: null
        })
        .then((data) => {
          const payload = {
            roomid : data.id,
            name : this.master
          }
          this.$store.dispatch('setMaster', payload)
          console.log('Document successfully written!', data.id)
        })
      })
      .catch((err) => {
        console.log(err);
      })
    },
    startGame(id){
      if(localStorage.getItem('room')==id){
        db.collection('rooms').doc(id).update({
        playing : true
      })
        this.$router.push('/play')
      }
      console.log("bisa main game bareng");
    }
  }
}
</script>

<style>
.room-form {
  margin: 5%;
  padding: 15px;
  text-align: start
}
.room-list {
  padding: 5vh 5vw;
}
.box h1 {
  text-align: start;
  font-size: 20px;
  font-weight: 600;
}
.box h3 {
  text-align: start;
  font-size: 16px;
  font-weight: 600;
}
.box li {
  list-style-type: none;
  text-align: start
}
</style>