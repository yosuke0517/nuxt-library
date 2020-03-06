import { GetterTree } from 'vuex'
import { AuthenticateState } from '~/types/authenticate/state'
import { RootState } from '~/types/state'

const getters: GetterTree<AuthenticateState, RootState> = {
  id: (state) => state.id,
  name: (state) => state.name,
  isAdmin: (state) => state.isAdmin,
  email: (state) => state.email,
  signUpJobDone: (state) => state.signUpJobDone,
  loginStatus: (state) => state.loginStatus,
  user: (state) => state.user
}

export default getters
