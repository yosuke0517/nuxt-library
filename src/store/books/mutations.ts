import { MutationTree } from 'vuex'
import { BooksState } from '~/types/books/state'

const mutations: MutationTree<BooksState> = {
  describe(state, { defaultInfo }) {
    state.defaultInfo = defaultInfo
  },

  book(state, { book }) {
    state.book = book
  }
}

export default mutations
