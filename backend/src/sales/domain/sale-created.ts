import { UUID } from '@app/lib/uuid/uuid'
import { Product } from '@app/sales/domain/product'
import { Sale } from '@app/sales/domain/sale'
import { Decimal } from 'decimal.js-light'

export class SaleCreated {
  public constructor(
    public readonly id: UUID,
    public readonly amount: Decimal,
    public readonly timestamp: Date,
    public readonly products: Array<Product>
  ) {}

  public static fromSale(sale: Sale): SaleCreated {
    return new SaleCreated(sale.id, sale.amount, sale.timestamp, sale.products)
  }
}
