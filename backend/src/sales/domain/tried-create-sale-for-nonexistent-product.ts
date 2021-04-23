import { Product } from '@app/sales/domain/product'
import { Sale } from '@app/sales/domain/sale'

export class TriedCreateSaleForNonexistentProduct {
  public constructor(
    public readonly timestamp: Date,
    public readonly products: Array<Product>
  ) {}

  public static fromSale(sale: Sale): TriedCreateSaleForNonexistentProduct {
    return new TriedCreateSaleForNonexistentProduct(
      sale.timestamp,
      sale.products
    )
  }
}
