import { ActionTree } from 'vuex'
import { BooksState } from '~/types/books/state'
import { RootState } from '~/types/state'
import fireApp from '~/plugins/firebase'
import { AddFilter } from '~/types/books/add-filter'
import { RentalFilter } from '~/types/books/rental-filter'

import '@nuxtjs/axios'
// import firebase from '~/plugins/firebase'

const actions: ActionTree<BooksState, RootState> = {
  /* 登録 */
  async add({ commit }, addFilter: AddFilter) {
    const db = fireApp.firestore()
    // クエスチョンを登録
    const booksRef = db.collection('books')
    await booksRef.add({
      title: addFilter.title,
      author: addFilter.author,
      isRental: addFilter.isRental,
      genre: addFilter.genre,
      userRef: db.collection('users').doc(addFilter.userId),
      lastupDt: new Date().toISOString()
    })
    // commit('signUpJobDone', { signUpJobDone: true })
  },
  /* 一覧表示 */
  async show({ commit }) {
    const db = fireApp.firestore()
    const books = []
    // 書籍データを取得
    const querySnapshot = await db.collection('books').get()
    // 書籍データをfetch
    querySnapshot.forEach((doc) => {
      books.push({
        id: doc.id, // 書籍ごとのID
        ...doc.data()
      })
    })
    // storeのデータを作成
    const booksInfo = []
    for (let i = 0; i < books.length; i++) {
      const bookInfo = books[i]
      booksInfo.push(bookInfo)
    }
    commit('describe', { defaultInfo: booksInfo })
  },

  async detail({ commit }, bookId) {
    const db = fireApp.firestore()
    // クエスチョン1件にアクセス
    const book = await db
      .collection('books')
      .doc(bookId)
      .get()
    commit('book', { book: book.data() })
  },

  /* レンタル処理 */
  async rental({ commit }, rentalFilter: RentalFilter) {
    const db = fireApp.firestore()
    // 書籍情報とユーザ情報を登録
    const booksRef = db.collection('books')
    await booksRef.doc(rentalFilter.bookId).update({
      title: rentalFilter.title,
      author: rentalFilter.author,
      isRental: rentalFilter.isRental,
      genre: rentalFilter.genre,
      userRef: db.collection('users').doc(rentalFilter.userId),
      lastupDt: new Date().toISOString()
    })
    // 状態管理は必要ないという思いからcommitは不要？？だと思う。
  },

  /* 返却処理 */
  async returnBook({ commit }, rentalFilter: RentalFilter) {
    const db = fireApp.firestore()
    // 書籍情報とユーザ情報を登録
    const booksRef = db.collection('books')
    await booksRef.doc(rentalFilter.bookId).update({
      title: rentalFilter.title,
      author: rentalFilter.author,
      isRental: false,
      genre: rentalFilter.genre,
      userRef: db.collection('users').doc(rentalFilter.userId),
      lastupDt: new Date().toISOString()
    })
  }
}

export default actions
