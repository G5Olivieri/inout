import { injectable } from 'inversify'
import { ProductsRepository } from '@app/products/domain/products-repository'
import { Product } from '@app/products/domain/product'

@injectable()
export class FakeProductsRepository extends ProductsRepository {
  public async save(product: Product): Promise<Product> {
    return new Promise<Product>((resolve) => {
      setTimeout(resolve, 300, product)
    })
  }
}
