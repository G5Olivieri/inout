import { Query } from '@app/common/query'
import { Optional } from '@app/lib/optional/optional'
import { UUID } from '@app/lib/uuid/uuid'
import { Product } from '@app/products/domain/product'
import { ProductsRepository } from '@app/products/domain/products.repository'
import { inject, injectable } from 'inversify'

@injectable()
export class GetProductByIdQuery implements Query<Optional<Product>> {
  public constructor(
    @inject(ProductsRepository)
    private readonly productsRepository: ProductsRepository
  ) {}

  public async execute(id: UUID): Promise<Optional<Product>> {
    return this.productsRepository.findById(id)
  }
}
