export const strict = false

// state 値を保持する
export const state = () => ({
  user: null,
})

// mutations stateの値を変更する
// actionsから渡ってきたpayloadをstateのuserに代入
export const mutations = {
  setUser (state, payload) {
    state.user = payload
  }
}

// actions mutationsを実行する
// payload firebaseが返したuserの値
export const actions = {
  setUser ({ commit }, payload) {
    commit('setUser', payload)
  }
}

// getters stateの値を監視する
export const getters = {
  isAuthenticated (state) {
    return !!state.user
  }
}