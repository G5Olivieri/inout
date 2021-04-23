import { UUID } from '@app/lib/uuid/uuid'
import { Product } from '@app/sales/domain/product'
import { Decimal } from 'decimal.js-light'

export class Sale {
  public constructor(
    public readonly id: UUID,
    public readonly timestamp: Date,
    public readonly products: Array<Product>
  ) {}

  public get amount(): Decimal {
    return this.products.reduce(
      (amount, product) => amount.plus(product.amount.mul(product.quantity)),
      new Decimal('0')
    )
  }
}
