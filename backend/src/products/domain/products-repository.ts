import { GetAllProductsFilter } from '@app/products/domain/get-all-products-filter'
import { Pagination } from '@app/products/domain/pagination'
import { Product } from '@app/products/domain/product'
import { injectable } from 'inversify'

@injectable()
export abstract class ProductsRepository {
  public abstract save(product: Product): Promise<Product>
  public abstract getAll(
    filter: GetAllProductsFilter
  ): Promise<Pagination<Product>>
}
