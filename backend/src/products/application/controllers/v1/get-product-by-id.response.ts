import { Product } from '@app/products/domain/product'

export class GetProductByIdResponse {
  public constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly tags: string[]
  ) {}

  public static fromProduct(product: Product): GetProductByIdResponse {
    return new GetProductByIdResponse(
      product.id.toString(),
      product.name,
      Array.from(product.tags)
    )
  }
}
