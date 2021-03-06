import { ProductCreated } from '@app/products/domain/product-created'

export class CreateProductResponse {
  public constructor(public readonly id: string) {}

  public static fromProductCreated(
    productCreated: ProductCreated
  ): CreateProductResponse {
    return new CreateProductResponse(productCreated.id.toString())
  }
}
