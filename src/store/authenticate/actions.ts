import { ActionTree } from 'vuex'
import { AuthenticateState } from '~/types/authenticate/state'
import { RootState } from '~/types/state'
import fireApp from '~/plugins/firebase'
import '@nuxtjs/axios'
import { InputUserFilter } from '~/types/authenticate/input-user-filter'
import { SignupUserFilter } from '~/types/authenticate/signup-user-filter'
// eslint-disable-next-line import/order
import Cookies from 'universal-cookie'

const actions: ActionTree<AuthenticateState, RootState> = {
  /** サインアップ */

  async signUpUser({ commit }, signupUserFilter: SignupUserFilter) {
    let newUser = null
    const db = fireApp.firestore()
    // 新規ユーザの登録(firebaseのauth)
    newUser = await fireApp
      .auth()
      .createUserWithEmailAndPassword(
        signupUserFilter.email,
        signupUserFilter.password
      )
    // commit('setId', { id: newUser.user.uid })
    // commit('setEmail', { email: newUser.user.email })
    await newUser.user.updateProfile({
      displayName: signupUserFilter.name
    })
    if (newUser !== null) {
      commit('signUpJobDone', { signUpJobDone: true })
    }
    // commit('setName', { name: newUser.user.name })

    /** DB登録 */
    const userRef = await db.collection('users').doc(newUser.user.uid)
    userRef.set({
      email: newUser.user.email,
      name: newUser.user.displayName,
      createdAt: new Date().toISOString(),
      isAdmin: false
    })
  },

  /** ログイン処理 */
  async login({ commit }, loginUserFilter: InputUserFilter) {
    const response = await fireApp
      .auth()
      .signInWithEmailAndPassword(
        loginUserFilter.email,
        loginUserFilter.password
      )
    if (response.operationType === 'signIn') {
      commit('setloginStatus', { loginStatus: true })

      const authUser = {
        id: response.user.uid,
        email: response.user.email,
        name: response.user.displayName
      }
      const cookies = new Cookies()
      cookies.set('user_id', JSON.stringify(response.user.uid))
      // firebase上のログインデータ取得まで確認済み
      commit('setId', { id: authUser.id })
      commit('setEmail', { email: authUser.email })
      commit('setName', { name: authUser.name })
    }
  },

  logout({ commit }) {
    const cookies = new Cookies()
    cookies.remove('user_id')
    cookies.remove('nuxt-library')
    cookies.remove('your-application-name')
    commit('setId', { id: null })
  },

  async easyLogin({ commit }) {
    const response = await fireApp
      .auth()
      .signInWithEmailAndPassword('test@email.com', 'password')
    if (response.operationType === 'signIn') {
      commit('setloginStatus', { loginStatus: true })

      const authUser = {
        id: response.user.uid,
        email: response.user.email,
        name: response.user.displayName
      }
      const cookies = new Cookies()
      cookies.set('user_id', JSON.stringify(response.user.uid))
      // firebase上のログインデータ取得まで確認済み
      commit('setId', { id: authUser.id })
      commit('setEmail', { email: authUser.email })
      commit('setName', { name: authUser.name })
    }
  }
}

export default actions
