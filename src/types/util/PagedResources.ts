import { PageMetadata } from './PageMetadata'

export interface PagedResources<T> {
  page: PageMetadata
  _embedded: {
    results: T[]
  }
  _links: any
}
