<template>
  <div>
    <h1>main page</h1>
    <section>
      <div v-if="isAuthenticated">
        <button @click="logout">logout</button>
      </div>
      <div v-else>
        <a href="/only_member">メンバーページに遷移</a>
      </div>
    </section>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase';
// store内の処理を利用できるようにここでimport
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  // mapState,mapGettersは'computed'内で呼び出す
  computed: {
    ...mapState(['user']),
    ...mapGetters(['isAuthenticated'])
  },

  methods: {
    ...mapActions(['setUser']),
    // ログアウトを行うには、signOut()を呼び出す
    // setUserの値をnullに変更
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