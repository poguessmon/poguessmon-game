<template>
    <div  style="margin-top:20px; display: inline-block" >
    <section v-if="!result"> 
        <b-steps v-model="activeStep" :animated="isAnimated" :has-navigation="false" >
            <b-step-item label="Round 1">
                <card 
                @nextRound="nextRound"
                @correct="correct"
                :currentRound="currentRound"
                :finalRound="false"
                :name="pokemonList[0].name"
                :picture="pokemonList[0].picture"
                ></card>
            </b-step-item> 
            <b-step-item label="Round 2">
                <card 
                @nextRound="nextRound"
                @correct="correct"
                :currentRound="currentRound"
                :finalRound="false"
                :name="pokemonList[1].name"
                :picture="pokemonList[1].picture"
                ></card>
            </b-step-item>
            <b-step-item label="Round 3">
                <card 
                @nextRound="nextRound"
                @correct="correct"
                :currentRound="currentRound"
                :finalRound="false"
                :name="pokemonList[2].name"
                :picture="pokemonList[2].picture"
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
        
        
    </div>
</template>

<script>

import card from '@/components/gameCards'
import resultField from '@/components/result'


export default {
    data(){
        return{
            currentRound: 0,
            pokemonList: [],
            
            activeStep: 0,
            isAnimated: true,
            result: false
        }
    },
    components:{
        card,
        resultField
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
            this.result=true
        }        
               
    },
    created(){
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

                // let roomId = this.$store.state.rooms[0].id
                // console.log(this.$store.state.rooms[0].players,"<<<<<<<<<")
            let roomId= localStorage.getItem('room')
            this.$store.state.rooms.forEach(element => {
                if(element.id == roomId){
                    this.pokemonList = element.pokelist
                }
            });

        this.currentRound++
        
    },
    watch:{
        currentRound (newVal, OldVal){            
            setTimeout(()=>{
                this.$toast.open({
                    duration: 1000,
                    message: `TIME'S UP!`,
                    type: 'is-danger'
                })                                    
                if(this.currentRound < 10){
                    this.$toast.open({
                        duration: 2000,
                        message: `be prepared for the next round!`,
                        position: 'is-bottom',
                        type: 'is-danger'
                    })
                    setTimeout(()=>{                        
                        this.currentRound = newVal + 1
                        this.activeStep = this.currentRound - 1
                    },3000)
                    
                } else {
                    this.showResult()
                }
                        
            }, 15000); 
        }
    }
}
</script>

<style>
</style>
