import { AggregateRoot } from '~/types/util'

export interface CommonInforansfer extends AggregateRoot {
  error: string
  jobDone: boolean
  isBusy: boolean
}
