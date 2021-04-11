import { GetAllProductsFilter } from '@app/products/domain/get-all-products-filter'
import { Pagination } from '@app/products/domain/pagination'
import { Product } from '@app/products/domain/product'
import { ProductsRepository } from '@app/products/domain/products-repository'
import { inject, injectable } from 'inversify'

@injectable()
export class GetAllProductsQuery {
  public constructor(
    @inject(ProductsRepository)
    private readonly productsRepository: ProductsRepository
  ) {}

  public async execute(
    filter: GetAllProductsFilter
  ): Promise<Pagination<Product>> {
    return this.productsRepository.getAll(filter)
  }
}
