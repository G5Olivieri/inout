import { UUID } from '@app/lib/uuid/uuid'
import { Billable } from '@app/sales/billables/domain/billable'
import { injectable } from 'inversify'

interface SaveListener {
  onSuccess: (billable: Billable) => Promise<void>
  onProductNotFound: (billable: Billable, productId: UUID) => Promise<void>
}

@injectable()
export abstract class BillablesRepository {
  public abstract save(
    billable: Billable,
    listener: SaveListener
  ): Promise<void>
}
