import { Optional } from '@app/lib/optional/optional'
import { UUID } from '@app/lib/uuid/uuid'
import { Billable } from '@app/catalog/domain/billable'
import { GetAllBillablesFilter } from '@app/catalog/domain/get-all-billables.filter'
import { injectable } from 'inversify'

export interface SaveListener {
  onSuccess: (billable: Billable) => Promise<void>
  onProductNotFound: (billable: Billable) => Promise<void>
}

@injectable()
export abstract class BillablesRepository {
  public abstract save(
    billable: Billable,
    listener: SaveListener
  ): Promise<void>
  public abstract getAll(filter: GetAllBillablesFilter): Promise<Billable[]>
  public abstract findById(id: UUID): Promise<Optional<Billable>>
}
