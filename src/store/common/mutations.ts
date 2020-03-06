import { MutationTree } from 'vuex'
import { CommonState } from '~/types/common/state'

const mutations: MutationTree<CommonState> = {
  setError(state, { error }) {
    state.commonInfo.error = error
  },
  clearError(state) {
    state.commonInfo.error = null
  },
  setJobDone(state, { jobDone }) {
    state.commonInfo.jobDone = jobDone
  },
  setIsBusy(state, { isBusy }) {
    state.commonInfo.isBusy = isBusy
  }
}

export default mutations
