import { Product } from '@app/sales/domain/product'
import { SaleCreated } from '@app/sales/domain/sale-created'

export class CreateSaleResponse {
  public constructor(
    public readonly id: string,
    public readonly timestamp: Date,
    public readonly products: Product[]
  ) {}

  public static fromSaleCreated(event: SaleCreated): CreateSaleResponse {
    return new CreateSaleResponse(
      event.id.toString(),
      event.timestamp,
      event.products
    )
  }
}
