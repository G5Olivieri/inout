import { Product } from '@app/products/domain/product'
import { inject, injectable } from 'inversify'
import { ProductsRepository } from '@app/products/domain/products-repository'

@injectable()
export class CreateProductCommand {
  public constructor(
    @inject(ProductsRepository)
    private readonly productsRepository: ProductsRepository
  ) {}

  public async execute(product: Product): Promise<Product> {
    return this.productsRepository.save(product)
  }
}
