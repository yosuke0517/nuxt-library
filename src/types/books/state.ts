import { DefaultTransfer, ListFromat } from '~/types/books'

export interface DomainData {
  books: BooksState
}

export interface BooksState {
  defaultInfo: DefaultTransfer
  book: ListFromat
}
