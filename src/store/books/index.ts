import { Module } from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import { BooksState } from '~/types/books/state'
import { RootState } from '~/types/state'

const state: BooksState = {
  // 一覧情報
  defaultInfo: null,
  book: null
}

const books: Module<BooksState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default books
