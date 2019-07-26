<template>
<<<<<<< HEAD
    <div  style="margin-top:20px; display: inline-block" >
    <section v-if="!result"> 
=======
    <div  style="margin-top:20px; display: inline-block">
    <section> 
>>>>>>> gamespace
        <b-steps v-model="activeStep" :animated="isAnimated" :has-navigation="false" >
            <b-step-item label="Round 1">
                <card 
                @nextRound="nextRound"
                @correct="correct"
                :currentRound="currentRound"
<<<<<<< HEAD
                :finalRound="false"
                :name="pokemonList[0].name"
                :picture="pokemonList[0].picture"
                ></card>
            </b-step-item> 
=======
                :stage="1"
                :finalRound="false"
                :name="pokemonList[0].name"
                :img="pokemonList[0].img"
                ></card>
            </b-step-item>
>>>>>>> gamespace
            <b-step-item label="Round 2">
                <card 
                @nextRound="nextRound"
                @correct="correct"
                :currentRound="currentRound"
<<<<<<< HEAD
                :finalRound="false"
                :name="pokemonList[1].name"
                :picture="pokemonList[1].picture"
=======
                :stage="2"
                :finalRound="false"
                :name="pokemonList[1].name"
                :img="pokemonList[1].img"
>>>>>>> gamespace
                ></card>
            </b-step-item>
            <b-step-item label="Round 3">
                <card 
                @nextRound="nextRound"
                @correct="correct"
                :currentRound="currentRound"
<<<<<<< HEAD
                :finalRound="false"
                :name="pokemonList[2].name"
                :picture="pokemonList[2].picture"
=======
                :stage="3"
                :finalRound="false"
                :name="pokemonList[2].name"
                :img="pokemonList[2].img"
>>>>>>> gamespace
                ></card>
            </b-step-item>
            <b-step-item label="Round 4">
                <card 
                @nextRound="nextRound"
                @correct="correct"
                :currentRound="currentRound"
                :stage="4"
                :finalRound="false"
                :name="pokemonList[3].name"
<<<<<<< HEAD
                :picture="pokemonList[3].picture"
                ></card>
            </b-step-item>
            <b-step-item label="Round 5">
                <card 
                @nextRound="showResult"
                @correct="correct"
                :currentRound="currentRound"
                :finalRound="false"
                :name="pokemonList[4].name"
                :picture="pokemonList[4].picture"
                ></card>
            </b-step-item>
            <b-step-item label="Round 6">
                <card 
                @nextRound="nextRound"
                @correct="correct"
                :currentRound="currentRound"
                :finalRound="false"
                :name="pokemonList[5].name"
                :picture="pokemonList[5].picture"
                ></card>
            </b-step-item> 
            <b-step-item label="Round 7">
                <card 
                @nextRound="nextRound"
                @correct="correct"
                :currentRound="currentRound"
                :finalRound="false"
                :name="pokemonList[6].name"
                :picture="pokemonList[6].picture"
                ></card>
            </b-step-item> 
            <b-step-item label="Round 8">
                <card 
                @nextRound="nextRound"
                @correct="correct"
                :currentRound="currentRound"
                :finalRound="false"
                :name="pokemonList[7].name"
                :picture="pokemonList[7].picture"
                ></card>
            </b-step-item> 
            <b-step-item label="Round 9">
                <card 
                @nextRound="nextRound"
                @correct="correct"
                :currentRound="currentRound"
                :finalRound="false"
                :name="pokemonList[8].name"
                :picture="pokemonList[8].picture"
                ></card>
            </b-step-item> 
            <b-step-item label="Final Round">
                <card 
                @nextRound="nextRound"
                @correct="correct"
                :currentRound="currentRound"
                :finalRound="true"
                :name="pokemonList[9].name"
                :picture="pokemonList[9].picture"
                ></card>
            </b-step-item> 
        </b-steps>
    </section>           
        <resultField v-if="result"></resultField>
        
=======
                :img="pokemonList[3].img"
                ></card>
            </b-step-item>
            <b-step-item label="Final Round">
                <card 
                @nextRound="showResult"
                @correct="correct"
                
                :stage="5"
                :finalRound="true"
                :name="pokemonList[4].name"
                :img="pokemonList[4].img"
                ></card>
            </b-step-item>
        </b-steps>
    </section>           
>>>>>>> gamespace
        
    </div>
</template>

<script>

<<<<<<< HEAD
import card from '@/components/gameCards'
import resultField from '@/components/result'

=======
import db from '../config/firebase'
import card from '@/components/gameCards'
import { setTimeout } from 'timers';
>>>>>>> gamespace

export default {
    data(){
        return{
            currentRound: 0,
            pokemonList: [],
            
            activeStep: 0,
            isAnimated: true,
<<<<<<< HEAD
            result: false
        }
    },
    components:{
        card,
        resultField
=======
            
        }
    },
    components:{
        card
>>>>>>> gamespace
    },
    methods: {
        timesUp(){

        },
        nextRound(){
            this.currentRound++
        },
        correct(){

        },
        showResult(){
<<<<<<< HEAD
            this.result=true
=======
            console.log(`Your Score: ${this.score}`)
>>>>>>> gamespace
        }        
               
    },
    created(){
<<<<<<< HEAD
        // const dummyPlayers ={}     
        // const dummyPokemons = [{
        //     name: "Bulbasaur",
        //     picture: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
        //     },
        //     {
        //     name: "Ivysaur",
        //     picture: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
        //     },
        //     {
        //     name: "Venusaur",
        //     picture: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
        //     },
        //     {
        //     name: "Charmander",
        //     picture: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
        //     },
        //     {
        //     name: "Charmeleon",
        //     picture: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png"
        //     },
        //     {
        //     name: "Bulbasaur",
        //     picture: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
        //     },
        //     {
        //     name: "Ivysaur",
        //     picture: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
        //     },
        //     {
        //     name: "Venusaur",
        //     picture: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
        //     },
        //     {
        //     name: "Charmander",
        //     picture: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
        //     },
        //     {
        //     name: "Charmeleon",
        //     picture: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png"
        //     }                               
        // ]
        
        // this.pokemonList = dummyPokemons
        // this.pokemonList = this.$store.state.rooms

            let roomId= localStorage.getItem(roomId)
            this.$store.state.rooms.forEach(element => {
                if(element.id == roomId){
                    this.pokemonList = element.pokelist
                }
            });
=======
        const dummyPlayers ={}     
        const dummyPokemons = [{
            name: "Bulbasaur",
            img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
            },
            {
            name: "Ivysaur",
            img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png"
            },
            {
            name: "Venusaur",
            img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
            },
            {
            name: "Charmander",
            img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png"
            },
            {
            name: "Charmeleon",
            img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png"
            }                        
        ]
        dummyPokemons.forEach(element => {
            this.pokemonList.push(element)
        });
>>>>>>> gamespace

        this.currentRound++
        
    },
    watch:{
        currentRound (newVal, OldVal){            
            setTimeout(()=>{
                this.$toast.open({
<<<<<<< HEAD
                    duration: 1000,
                    message: `TIME'S UP!`,
                    type: 'is-danger'
                })                                    
                if(this.currentRound < 10){
                    this.$toast.open({
                        duration: 2000,
=======
                    duration: 2000,
                    message: `TIME'S UP!`,
                    type: 'is-danger'
                })                                    
                if(this.currentRound < 5){
                    this.$toast.open({
                        duration: 3000,
>>>>>>> gamespace
                        message: `be prepared for the next round!`,
                        position: 'is-bottom',
                        type: 'is-danger'
                    })
<<<<<<< HEAD
                    setTimeout(()=>{                        
                        this.currentRound = newVal + 1
                        this.activeStep = this.currentRound - 1
                    },3000)
                    
                } else {
                    this.showResult()
                }
                        
            }, 1000); 
=======
                    setTimeout(()=>{
                        this.currentRound = newVal + 1
                        this.activeStep = this.currentRound - 1
                    },5000)
                    
                } else {
                    
                }
                        
            }, 10000); 
>>>>>>> gamespace
        }
    }
}
</script>

<style>
</style>
