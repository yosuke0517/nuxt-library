import { DefaultInfo } from './default-info'
import { AggregateRoot } from '~/types/util'

export interface DefaultTransfer extends AggregateRoot {
  defaultInfo: Array<DefaultInfo>
}
