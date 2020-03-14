<template>
  <div class="login-contents">
    <!-- isAuthenticatedがtrueの場合に表示 -->
    <div v-if="isAuthenticated">
      <p>{{ user.email }}でログインしました</p>
      <router-link to="/">メインページに戻る</router-link>
    </div>

    <!-- isAuthenticatedがfalseの場合に表示 -->
    <div v-else>
      <el-card class="box-card login">
        <div slot="header" class="clearfix">
          <span>ログイン</span>
        </div>
        <el-form label-width="120px">
          <!-- 
            validがtrueの場合にvalidErrorを表示
            初期値はdata()にfalseと登録しておく
           -->
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
// store内の処理を利用できるようにここでimport
import { mapActions, mapState, mapGetters } from 'vuex';

export default {
  // 初期値を定義
  data() {
    return {
      mailAddress: '',
      password: '',
      valid: false,
      validError: "メールアドレスまたはPasswordが間違っています",
    }
  },

  // mapState,mapGettersは'computed'内で呼び出す
  computed: {
    ...mapState(['user']),
    ...mapGetters(['isAuthenticated'])
  },

// ログインが完了したか判定
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setUser(user)
    })
  },

  // mapActions,mapMutationsは'methods'内で呼び出す
  methods: {
    ...mapActions(['setUser']),

    login() {
      // 入力されたemail/passwordを用いて認証処理する
      firebase.auth().signInWithEmailAndPassword(this.mailAddress, this.password)
        .then( user => {
          // 認証成功後はトップページに遷移
          this.$router.push('/')
        })
        //認証失敗時は'valid'をtrueに変更
        // エラー文を表示 
        .catch((error) => {
          this.valid = true;
        });
    },

    googleLogin() {
      // Googleプロバイダオブジェクトのインスタンスを作成
      // 定数providerに代入
      // providerをもとに認証処理
      // ポップアップ ウィンドウを表示するか、ログインページにリダイレクトする方法がある
      // モバイルアプリではリダイレクトを推奨（公式ドキュメント）
      // ポップアップウィンドウでログイン signInWithPopup()
      // ダイレクトしてログイン signInWithRedirect()
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider)
        .then( user => {
          this.$router.push('/')
        })
        .catch((error) => {
          this.valid = true;
        });
    },

    twitterLogin() {
      const provider = new firebase.auth.TwitterAuthProvider()
      firebase.auth().signInWithRedirect(provider)
        .then( user => {
          this.$router.push('/')
        })
        .catch((error) => {
          this.valid = true;
        });
    },
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

.google-auth {
  margin-top: 15px;
}

.google-btn, 
.twitter-btn {
  width: 240px;
  cursor: pointer;
}
</style>