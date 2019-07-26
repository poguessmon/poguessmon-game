<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="modal-card-title">Welcome !</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Enter Username">
          <b-input
            type="text"
            v-model="username"
            placeholder="Your Username"
            required>
          </b-input>
        </b-field>

      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Close</button>
        <button @click.prevent="addPlayer" class="button is-primary">Join Room</button>
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  props : ['selected'],
  data() {
    return {
      username: null,
    }
  },
  methods: {
    addPlayer() {
      const payload = {
        roomid : this.selected,
        name : this.username
      }
      this.$store.dispatch('insertPlayer', payload)
    }
  }
}

</script>
