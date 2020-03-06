import { Module } from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import { AuthenticateState } from '~/types/authenticate/state'
import { RootState } from '~/types/state'

const state: AuthenticateState = {
  id: null,
  email: null,
  name: null,
  isAdmin: null,
  signUpJobDone: null,
  loginStatus: null,
  user: null
}

const authenticate: Module<AuthenticateState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default authenticate
