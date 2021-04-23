import { UUID } from '@app/lib/uuid/uuid'
import { Decimal } from 'decimal.js-light'

export class Billable {
  public constructor(
    public readonly id: UUID,
    public readonly products: Array<UUID>,
    public readonly name: string,
    public readonly amount: Decimal
  ) {}
}
