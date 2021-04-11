import { Product } from '@app/products/domain/product'
import { inject, injectable } from 'inversify'
import { ProductsRepository } from '@app/products/domain/products-repository'
import { Command } from '@app/common/command'
import { EventPublisher } from '@app/domain-events/event-publisher'
import { ProductCreated } from '@app/products/domain/product-created'

@injectable()
export class CreateProductCommand implements Command {
  public constructor(
    @inject(ProductsRepository)
    private readonly productsRepository: ProductsRepository,
    @inject(EventPublisher)
    private readonly publisher: EventPublisher
  ) {}

  public async execute(product: Product): Promise<void> {
    const savedProduct = await this.productsRepository.save(product)
    await this.publisher.publish(
      new ProductCreated(savedProduct.id, savedProduct.name)
    )
  }
}
