import Vuex, { StoreOptions } from 'vuex'
import { RootState } from '~/types/state'
import authenticate from '~/store/authenticate'
import books from '~/store/books'

const storeOptions: StoreOptions<RootState> = {
  modules: {
    authenticate,
    books
  }
}

const store = () => new Vuex.Store<RootState>(storeOptions)
export default store
