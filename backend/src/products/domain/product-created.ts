import { UUID } from '@app/lib/uuid/uuid'
import { Product } from '@app/products/domain/product'

export class ProductCreated {
  public constructor(public readonly id: UUID) {}

  public static fromProduct(product: Product): ProductCreated {
    return new ProductCreated(product.id)
  }
}
