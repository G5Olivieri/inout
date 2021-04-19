import { Product } from '@app/products/domain/product'
import { inject, injectable } from 'inversify'
import { ProductsRepository } from '@app/products/domain/products-repository'
import { Command } from '@app/common/command'
import { EventPublisher } from '@app/domain-events/event-publisher'
import { ProductCreated } from '@app/products/domain/product-created'
import { ProductNameConflicted } from '@app/products/domain/product-name-conflicted'

@injectable()
export class CreateProductCommand implements Command {
  public constructor(
    @inject(ProductsRepository)
    private readonly productsRepository: ProductsRepository,
    @inject(EventPublisher)
    private readonly publisher: EventPublisher
  ) {}

  public async execute(product: Product): Promise<void> {
    await this.productsRepository.save(product, {
      onConflicted: (product) =>
        this.publisher.publish(ProductCreated.fromProduct(product)),
      onSuccess: (product) =>
        this.publisher.publish(ProductNameConflicted.fromProduct(product)),
    })
  }
}
