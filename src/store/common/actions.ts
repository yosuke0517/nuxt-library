import { ActionTree } from 'vuex'
import { CommonState } from '~/types/common/state'
import { RootState } from '~/types/state'
import '@nuxtjs/axios'

const actions: ActionTree<CommonState, RootState> = {
  /** ログイン処理 */
  // async login({ commit }) {
  //   const response = await this.$axios.$post<>(`/`)
  //   /** ログインが成功したらストアに格納する */
  //   commit('userInfo', { Userinfo: response })
  // }
}

export default actions
