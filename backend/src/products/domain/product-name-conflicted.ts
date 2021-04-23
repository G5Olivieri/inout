import { Product } from '@app/products/domain/product'

export class ProductNameConflicted {
  public constructor(public readonly name: string) {}

  public static fromProduct(product: Product): ProductNameConflicted {
    return new ProductNameConflicted(product.name)
  }
}
