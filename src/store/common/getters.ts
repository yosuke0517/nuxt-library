import { GetterTree } from 'vuex'
import { CommonState } from '~/types/common/state'
import { RootState } from '~/types/state'

const getters: GetterTree<CommonState, RootState> = {
  error: (state) => state.commonInfo.error,
  isBusy: (state) => state.commonInfo.isBusy,
  jobDone: (state) => state.commonInfo.jobDone,
  version: (state) => state.commonInfo.version
}

export default getters
