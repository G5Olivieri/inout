import { EventPublisher } from '@app/domain-events/event-publisher'
import { InputOrderCreated } from '@app/orders/domain/input-order-created'
import { Order } from '@app/orders/domain/order'
import { OrdersRepository } from '@app/orders/domain/orders-repository'
import { inject, injectable } from 'inversify'

@injectable()
export class CreateInputOrderCommand {
  public constructor(
    @inject(EventPublisher)
    private readonly publisher: EventPublisher,
    @inject(OrdersRepository)
    private readonly repository: OrdersRepository
  ) {}

  public async execute(order: Order): Promise<void> {
    const event = new InputOrderCreated(order.amount, order.quantity)
    order.addEvent(event)
    await this.repository.save(order)
    await this.publisher.publish(event)
  }
}
