import { Module } from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import { CommonState } from '~/types/common/state'
import { RootState } from '~/types/state'

const state: CommonState = {
  commonInfo: null
}

const common: Module<CommonState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default common
