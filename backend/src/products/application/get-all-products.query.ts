import { Query } from '@app/common/query'
import { GetAllProductsFilter } from '@app/products/domain/get-all-products.filter'
import { Product } from '@app/products/domain/product'
import { ProductsRepository } from '@app/products/domain/products.repository'
import { inject, injectable } from 'inversify'

@injectable()
export class GetAllProductsQuery implements Query<Product[]> {
  public constructor(
    @inject(ProductsRepository)
    private readonly productsRepository: ProductsRepository
  ) {}

  public async execute(filter: GetAllProductsFilter): Promise<Product[]> {
    return this.productsRepository.getAll(filter)
  }
}
