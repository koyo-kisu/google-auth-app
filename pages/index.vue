<template>
  <div>
    <div v-if="isAuthenticated">
      <p>{{ user.name }}でログイン中です</p>
      <button @click="logout">ログアウト</button>
      <a href="/member-page">メンバーページへ</a>
    </div>
    <div v-else>
      <h3>ログイン画面</h3>
      <p class="errorMessage" style="color: red" v-if="valid">{{validError}}</p>
      <span>メールアドレス</span>
      <input type="text" v-model="mailAddress">
      <span>パスワード</span>
      <input type="password" v-model="password">
      <button @click="login">ログイン</button>
    </div>
  </div>
</template>

<script>
import firebase from '~/plugins/firebase';
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  data() {
    return {
      mailAddress: '',
      password: '',
      valid: false,
      validError: "UserIDまたはPasswordが間違っています",
    }
  },

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

    login() {
      firebase.auth().signInWithEmailAndPassword(this.mailAddress, this.password)
        .then( user => {
          // this.$store.commit('loginState', this.mailAddress, this.password);
          this.$router.push('/')
        })
        .catch((error) => {
          this.valid = true;
        });
    },

    logout() {
      firebase.auth().signOut()
        .then(() => {
          this.setUser(null)
        })
        .catch((error) => {
          alert(error)
        })
    }
  },

  created() {
    console.log("create完了！")
  }
}
</script>

<style>

</style>