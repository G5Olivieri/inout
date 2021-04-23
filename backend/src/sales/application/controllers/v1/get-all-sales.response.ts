import { Product } from '@app/sales/domain/product'
import { Sale } from '@app/sales/domain/sale'

export class GetAllSalesItemResponse {
  public constructor(
    public readonly id: string,
    public readonly timestamp: Date,
    public readonly products: Product[]
  ) {}

  private static fromSale(sale: Sale): GetAllSalesItemResponse {
    return new GetAllSalesItemResponse(
      sale.id.toString(),
      sale.timestamp,
      sale.products
    )
  }

  public static fromSales(sales: Sale[]): GetAllSalesItemResponse[] {
    return sales.map((Sale) => GetAllSalesItemResponse.fromSale(Sale))
  }
}
