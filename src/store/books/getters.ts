import { GetterTree } from 'vuex'
import { BooksState } from '~/types/books/state'
import { RootState } from '~/types/state'

const getters: GetterTree<BooksState, RootState> = {
  defaultInfo: (state) => state.defaultInfo,
  book: (state) => state.book
}

export default getters
