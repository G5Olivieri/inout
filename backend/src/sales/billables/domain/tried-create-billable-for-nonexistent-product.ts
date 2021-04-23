import { UUID } from '@app/lib/uuid/uuid'
import { Billable } from '@app/sales/billables/domain/billable'
import { Decimal } from 'decimal.js-light'

export class TriedCreateBillableForNonexistentProduct {
  public constructor(
    public readonly products: Array<UUID>,
    public readonly name: string,
    public readonly amount: Decimal
  ) {}

  public static fromBillable(
    billable: Billable
  ): TriedCreateBillableForNonexistentProduct {
    return new TriedCreateBillableForNonexistentProduct(
      billable.products,
      billable.name,
      billable.amount
    )
  }
}
