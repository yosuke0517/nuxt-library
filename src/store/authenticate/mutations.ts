import { MutationTree } from 'vuex'
import { AuthenticateState } from '~/types/authenticate/state'

const mutations: MutationTree<AuthenticateState> = {
  setId(state, { id }) {
    state.id = id
  },
  setEmail(state, { email }) {
    state.email = email
  },
  setName(state, { name }) {
    state.name = name
  },
  setIsAdmin(state, { isAdmin }) {
    state.isAdmin = isAdmin
  },
  signUpJobDone(state, { signUpJobDone }) {
    state.signUpJobDone = signUpJobDone
  },
  setloginStatus(state, { loginStatus }) {
    state.loginStatus = loginStatus
  },
  setUser(state, { user }) {
    state.user = user
  }
}

export default mutations
