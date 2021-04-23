import { Optional } from '@app/lib/optional/optional'
import { UUID } from '@app/lib/uuid/uuid'
import { GetAllProductsFilter } from '@app/products/domain/get-all-products.filter'
import { Product } from '@app/products/domain/product'
import { injectable } from 'inversify'

export interface SaveListener {
  onConflicted(product: Product): Promise<void>
  onSuccess(product: Product): Promise<void>
}

@injectable()
export abstract class ProductsRepository {
  public abstract save(product: Product, listener: SaveListener): Promise<void>
  public abstract getAll(filter: GetAllProductsFilter): Promise<Product[]>
  public abstract findById(id: UUID): Promise<Optional<Product>>
}
