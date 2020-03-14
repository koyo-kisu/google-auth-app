<template>
  <div>
    <div v-if="isAuthenticated">
      <h1>ログインしていないと見れないページ</h1>
      <button @click="logout">ログアウト</button>
    </div>
    <div v-else>
      <h1>ログインしてください</h1>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase';
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  middleware: 'authenticated',

  computed: {
    ...mapState(['user']),
    ...mapGetters(['isAuthenticated'])
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setUser(user)
    })
  },

  methods: {
    ...mapActions(['setUser']),

    logout() {
      firebase.auth().signOut()
        .then(() => {
          this.setUser(null)
          this.$router.push('/')
        })
        .catch((error) => {
          alert(error)
        })
    }
  }
}
</script>

<style>

</style>