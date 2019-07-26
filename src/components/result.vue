<template>
    <div class="card" style="display: inline-block">

<div class="tile is-parent is-vertical">
      <article class="tile is-child notification is-primary">
        <p class="title">The game has ended, this is the result</p>
        <div class="content">
            <h3 v-for="(player,index) in players" v-bind:key="index" style="color:white">
                Name: {{ player.name }}
                
                Score: {{ player.points}}
            </h3>
          
        </div>
      </article>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return {
            players: []
        }
    },
    created(){
        let roomId= localStorage.getItem(roomId)
        this.$store.state.rooms.forEach(element => {
            if(element.id == roomId){
                this.players = element.players
            }
        });
    }

}
</script>

<style>

</style>
