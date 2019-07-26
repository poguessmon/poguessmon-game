<template>
  <div class="home">
    <navigationbar></navigationbar>
    <!-- Header -->
    <div class="columns is-multiline">
      <div class="column is-half room-form" id="create-room">
        <h2>Create a Room</h2>
        <b-field label="Room Name">
          <b-input v-model="name" placeholder="Room Name"></b-input>
        </b-field>
        <b-button type="is-primary" @click.prevent="createRoom">Create Room</b-button>
      </div>
      <div class="column is-half"></div>
    </div>
    <!-- Body -->
    <div>
      <h1>Room List</h1>
      <div class="columns is-multiline room-list">
        <div v-for="room in rooms" :key="room.id" class="column is-4">
          <div class="box">
            <h1>{{room.name}}</h1>
            <div v-for="player in room.players" :key="player.id" class="player-list">
              <li>{{player.name}}</li>
            </div>
            <button
              class="button-option"
              pack="fas"
              icon="user"
              size="is-small"
              @click="deleteRoom(room.id)"
            >delete</button>
            <button @click="leaveRoom(room.id)">Leave Room</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import navigationbar from "@/components/Nav-Bar.vue";
import firebase from "firebase/app";
import axios from "axios";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: "ollert-fd497.firebaseapp.com",
  projectId: "ollert-fd497"
});

const db = firebase.firestore();

export default {
  created() {
    db.collection("rooms").onSnapshot(querySnapshot => {
      let rooms = [];
      querySnapshot.forEach(doc => {
        const data = {};
        data.id = doc.id;
        data.name = doc.data().name;
        data.players = [];
        db.collection("rooms")
          .doc(data.id)
          .collection("players")
          .onSnapshot(dataPlayers => {
            dataPlayers.forEach(val => {
              const player = {
                id: val.id,
                ...val.data()
              };
              data.players.push(player);
            });
          });
        rooms.push(data);
      });
      // if (store.state.rooms.length === 0) {}

      this.$store.commit("receiveroom", rooms);
    });
  },
  name: "home",
  components: {
    HelloWorld,
    navigationbar
  },
  data() {
    return {
      name: null
    };
  },
  computed: {
    rooms() {
      this.name = ""
      return this.$store.state.rooms;      
    }
  },
  methods: {
    createRoom() {
      let pokemon = [];
      for (let i = 0; i < 10; i++) {
        const rnd = Math.floor(Math.random() * (151 - 1) + 1);
        pokemon.push(
          new Promise((resolve, reject) => {
            axios({
              url: `https://pokeapi.co/api/v2/pokemon/${rnd}`,
              method: "GET"
            })
              .then(({ data }) => {
                const poke = {
                  id: data.id,
                  name: data.name,
                  picture: data.sprites.front_default
                };
                resolve(poke);
              })
              .catch(err => {
                reject(err);
                console.log(err);
              });
          })
        );
      }

      Promise.all(pokemon)
        .then(poke => {
          console.log(poke, "Ini Data");
          db.collection("rooms")
            .add({
              name: this.name,
              players: [],
              pokelist: poke
            })
            .then(data => {
              console.log("Document successfully written!", data.id);
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteRoom(id) {
      this.rooms.forEach(el => {
        console.log(el, "ini element");
        
        if (el.id == id) {
          if (el.players.length > 0) {
            console.log("can't delete room");
          } else {
            console.log("kedelete");
            db.collection("rooms")
              .doc(id)
              .delete()
              .then(function() {
                console.log("Document successfully deleted!");
              })
              .catch(function(error) {
                console.error("Error removing document: ", error);
              });
          }
        }
      })
    },
    leaveRoom(roomId){
      this.rooms.forEach(room => {
        if(room.id == roomId){
          let username = localStorage.getItem('username')
          if(el.players.name == username){
            //delete subcollection
            db.collection('rooms').doc(roomId)
              .collection('players')
              .doc(localStorage.getItem('userId'))
              .delete()
              .then(() => {
                console.log("You're no longer in that room, thankyou for playing");
              })
              .catch(err => {
                console.log(err);
              })
          }
        } else {
          console.log("error");
        }
      })
    }
  }
};
</script>

<style>
.room-form {
  margin: 5%;
  padding: 15px;
  text-align: start;
}

.room-list {
  padding: 5vh 5vw;
}

.button-option {
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
}

.button-option:hover {
  background-color: red;
  color: #fff;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
}

.box {
  height: 200px;
}
</style>
