import { Product } from '@app/sales/domain/product'
import { Sale } from '@app/sales/domain/sale'

export class GetSaleByIdResponse {
  public constructor(
    public readonly id: string,
    public readonly timestamp: Date,
    public readonly products: Product[]
  ) {}

  public static fromSale(sale: Sale): GetSaleByIdResponse {
    return new GetSaleByIdResponse(
      sale.id.toString(),
      sale.timestamp,
      sale.products
    )
  }
}
