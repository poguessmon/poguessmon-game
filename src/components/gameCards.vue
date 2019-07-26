<template>
<!-- <b-step-item :label="index+1"> -->
    <div id="card" class="card" style="display: inline-block">
        <div class="card-image">
            <div v-if="!revealed">
            <img  style="filter: contrast(0%) brightness(0%)" :src="picture" alt="pokemon" height="400" width="400 ">                   
            </div>
            <div v-if="revealed">
            <img :src="picture" alt="pokemon" height="400" width="400 ">
            <figcaption>It's {{name}}!</figcaption>
            </div>            
            

        </div>
        <div class="card-content">               
            <b-field v-if="!wait" label="Name This Pokemon!">
            <b-input v-if="!wait" v-model="answer"></b-input>
            </b-field>      
            <b-button v-if="!wait" @click="submit" type="is-primary" outlined>
                Submit Answer!
            </b-button>
            <b-button v-if="wait" loading>
                Loading
            </b-button>
        </div>
    </div>  
<!-- </b-step-item> -->
</template>

<script>
import db from '@/config/firebase.js'
import firebase from 'firebase/app'
export default {
    props:['name','picture','index', 'finalRound','stage', 'currentRound'],
    data(){
        return{
            answer: "",
            revealed: false,
            wait: false,
            answered: false
        }
    },
    methods:{
        nextRound(){
            this.$emit('nextRound')
        },
        submit(){
            if(this.answer.toLowerCase() == this.name.toLowerCase()){
                this.$toast.open({
                    message: 'You guessed correctly!',
                    type: 'is-success'
                })
                this.$toast.open({
                    message: 'You gained 10 point',
                    type: 'is-success'
                })
                this.answered = true
                this.revealed = true
                this.wait = true  
                let roomId= localStorage.getItem('room')
                let userId = loaclStorage.getItem('userid')
                // let roomId = this.$store.state.rooms[0].id
                // let userId = "Z35bkE7x7Qcbfys16Ti4"
                const ref = db.collection('rooms').doc(roomId).collection('players').doc(userId)
                const increased = firebase.firestore.FieldValue.increment(10)

                ref.update({points : increased})
                this.$emit('correct')
            }else{
                this.$toast.open({
                    message: `You guessed wrong!`,
                    type: 'is-danger'
                })
                this.$toast.open({
                            message: `No point(s) earned`,
                            type: 'is-danger'
                })
            }
            this.answer = ""
            this.revealed = true
            this.wait = true           
    
            
                  
            
            }
    },
    watch:{
        currentRound (newVal, OldVal){
            console.log("stage" , this.stage)            
            if(newVal == this.stage){
                
                                     
            }
        }
    }
}
</script>

<style scoped>
#card{
    background-image: url("../assets/bg.png");
    background-repeat: no-repeat;
}
</style>
