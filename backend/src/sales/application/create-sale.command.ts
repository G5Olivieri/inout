import { Command } from '@app/common/command'
import { EventPublisher } from '@app/domain-events/event-publisher'
import { Sale } from '@app/sales/domain/sale'
import { SaleCreated } from '@app/sales/domain/sale-created'
import { SalesRepository } from '@app/sales/domain/sales.repository'
import { TriedCreateSaleForNonexistentProduct } from '@app/sales/domain/tried-create-sale-for-nonexistent-product'
import { inject, injectable } from 'inversify'

@injectable()
export class CreateSaleCommand implements Command {
  public constructor(
    @inject(SalesRepository)
    private readonly repository: SalesRepository,
    @inject(EventPublisher)
    private readonly publisher: EventPublisher
  ) {}

  public async execute(saleForCreation: Sale): Promise<void> {
    return this.repository.save(saleForCreation, {
      onSuccess: (sale) => this.publisher.publish(SaleCreated.fromSale(sale)),
      onProductNotFound: (sale) =>
        this.publisher.publish(
          TriedCreateSaleForNonexistentProduct.fromSale(sale)
        ),
    })
  }
}
