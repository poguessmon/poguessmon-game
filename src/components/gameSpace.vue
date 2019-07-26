<template>
    <div  style="margin-top:20px; display: inline-block">
    <section> 
        <b-steps v-model="activeStep" :animated="isAnimated" :has-navigation="false" >
            <b-step-item label="Round 1">
                <card 
                @nextRound="nextRound"
                @correct="correct"
                :currentRound="currentRound"
                :stage="1"
                :finalRound="false"
                :name="pokemonList[0].name"
                :img="pokemonList[0].img"
                ></card>
            </b-step-item>
            <b-step-item label="Round 2">
                <card 
                @nextRound="nextRound"
                @correct="correct"
                :currentRound="currentRound"
                :stage="2"
                :finalRound="false"
                :name="pokemonList[1].name"
                :img="pokemonList[1].img"
                ></card>
            </b-step-item>
            <b-step-item label="Round 3">
                <card 
                @nextRound="nextRound"
                @correct="correct"
                :currentRound="currentRound"
                :stage="3"
                :finalRound="false"
                :name="pokemonList[2].name"
                :img="pokemonList[2].img"
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
        
    </div>
</template>

<script>

import db from '../config/firebase'
import card from '@/components/gameCards'
import { setTimeout } from 'timers';

export default {
    data(){
        return{
            currentRound: 0,
            pokemonList: [],
            
            activeStep: 0,
            isAnimated: true,
            
        }
    },
    components:{
        card
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
            console.log(`Your Score: ${this.score}`)
        }        
               
    },
    created(){
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

        this.currentRound++
        
    },
    watch:{
        currentRound (newVal, OldVal){            
            setTimeout(()=>{
                this.$toast.open({
                    duration: 2000,
                    message: `TIME'S UP!`,
                    type: 'is-danger'
                })                                    
                if(this.currentRound < 5){
                    this.$toast.open({
                        duration: 3000,
                        message: `be prepared for the next round!`,
                        position: 'is-bottom',
                        type: 'is-danger'
                    })
                    setTimeout(()=>{
                        this.currentRound = newVal + 1
                        this.activeStep = this.currentRound - 1
                    },5000)
                    
                } else {
                    
                }
                        
            }, 10000); 
        }
    }
}
</script>

<style>
</style>
