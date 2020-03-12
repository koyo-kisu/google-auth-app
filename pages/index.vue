<template>
  <div class="login-contents">
    <div v-if="isAuthenticated">
      <p>{{ user.email }}でログイン中です</p>
      <button @click="logout">ログアウト</button>
      <a href="/member-page">メンバーページへ</a>
    </div>

    <div v-else>
      <el-card class="box-card login">
        <div slot="header" class="clearfix">
          <span>ログイン</span>
        </div>
        <el-form label-width="120px">
          <p class="errorMessage" style="color: red" v-if="valid">{{validError}}</p>
          <el-form-item label="メールアドレス">
            <el-input v-model="mailAddress" label-width="360px"></el-input>
          </el-form-item>
          <el-form-item label="パスワード">
            <el-input type="password" v-model="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="float: right" type="primary" @click="login">ログイン</el-button>
          </el-form-item>
          <hr>
          <span class="sns-btn">SNSでログインする</span>
          <el-form-item class="google-auth">
            <img src="~/assets/btn_google_signin_light_normal_web@2x.png" alt="Googleでログイン" class="google-btn" @click="googleLogin">
          </el-form-item>
          <el-form-item class="twitter-auth">
            <img src="~/assets/twitter-button.png" alt="Twitterでログイン" class="twitter-btn" @click="twitterLogin">
          </el-form-item>
        </el-form>
      </el-card>
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
          this.$router.push('/member-page')
        })
        .catch((error) => {
          this.valid = true;
        });
    },

    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider)
        .then( user => {
          this.$router.push('/member-page')
        })
        .catch((error) => {
          this.valid = true;
        });
    },

    twitterLogin() {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then( user => {
          this.$router.push('/member-page')
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

<style scoped>
.box-card {
  width: 560px;
}

.login {
  position: relative;
  top: 100px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  margin: auto;
}

.sns-btn {
  text-align: center;
}

.google-auth {
  margin-top: 15px;
}

.google-btn, 
.twitter-btn {
  width: 240px;
  cursor: pointer;
}
</style>