import { Product } from '@app/products/domain/product'
import { injectable } from 'inversify'

@injectable()
export abstract class ProductsRepository {
  public abstract save(product: Product): Promise<Product>
}
