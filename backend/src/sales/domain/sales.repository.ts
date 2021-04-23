import { Optional } from '@app/lib/optional/optional'
import { UUID } from '@app/lib/uuid/uuid'
import { Sale } from '@app/sales/domain/sale'
import { GetAllSalesFilter } from '@app/sales/domain/get-all-sales.filter'
import { injectable } from 'inversify'

export interface SaveListener {
  onSuccess: (sale: Sale) => Promise<void>
  onProductNotFound: (sale: Sale) => Promise<void>
}

@injectable()
export abstract class SalesRepository {
  public abstract save(Sale: Sale, listener: SaveListener): Promise<void>
  public abstract getAll(filter: GetAllSalesFilter): Promise<Sale[]>
  public abstract findById(id: UUID): Promise<Optional<Sale>>
}
