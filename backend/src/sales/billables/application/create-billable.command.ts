import { Command } from '@app/common/command'
import { EventPublisher } from '@app/domain-events/event-publisher'
import { Billable } from '@app/sales/billables/domain/billable'
import { BillableCreated } from '@app/sales/billables/domain/billable-created'
import { BillablesRepository } from '@app/sales/billables/domain/billables.repository'
import { TriedCreateBillableForNonexistentProduct } from '@app/sales/billables/domain/tried-create-billable-for-nonexistent-product'
import { inject, injectable } from 'inversify'

@injectable()
export class CreateBillableCommand implements Command {
  public constructor(
    @inject(BillablesRepository)
    private readonly repository: BillablesRepository,
    @inject(EventPublisher)
    private readonly publisher: EventPublisher
  ) {}

  public async execute(billable: Billable): Promise<void> {
    return this.repository.save(billable, {
      onSuccess: (billable) =>
        this.publisher.publish(BillableCreated.fromBillable(billable)),
      onProductNotFound: (billable, productId) =>
        this.publisher.publish(
          new TriedCreateBillableForNonexistentProduct(billable.id, productId)
        ),
    })
  }
}
