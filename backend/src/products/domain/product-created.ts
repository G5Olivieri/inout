import { Product } from '@app/products/domain/product'

export class ProductCreated {
  public constructor(public readonly id: string) {}

  public static fromProduct(product: Product): ProductCreated {
    return new ProductCreated(product.id)
  }
}
