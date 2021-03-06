import { UUID } from '@app/lib/uuid/uuid'
import { Billable } from '@app/catalog/domain/billable'
import { Decimal } from 'decimal.js-light'

export class BillableCreated {
  public constructor(
    public readonly id: UUID,
    public readonly name: string,
    public readonly amount: Decimal,
    public readonly products: Array<UUID>
  ) {}

  public static fromBillable(billable: Billable): BillableCreated {
    return new BillableCreated(
      billable.id,
      billable.name,
      billable.amount,
      billable.products
    )
  }
}
