import { UUID } from '@app/lib/uuid/uuid'
import Decimal from 'decimal.js-light'

export class Product {
  public constructor(
    public readonly id: UUID,
    public readonly quantity: number,
    public readonly amount: Decimal
  ) {}
}
