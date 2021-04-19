import { GetAllProductsFilter } from '@app/products/domain/get-all-products-filter'
import { Pagination } from '@app/products/domain/pagination'
import { Product } from '@app/products/domain/product'
import { injectable } from 'inversify'

export interface SaveListener {
  onConflicted(product: Product): Promise<void>
  onSuccess(product: Product): Promise<void>
}

@injectable()
export abstract class ProductsRepository {
  public abstract save(product: Product, listener: SaveListener): Promise<void>
  public abstract getAll(
    filter: GetAllProductsFilter
  ): Promise<Pagination<Product>>
}
