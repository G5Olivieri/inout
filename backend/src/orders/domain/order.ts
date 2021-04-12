import { OrderEvent } from '@app/orders/domain/order-event'
import { Product } from '@app/products/domain/product'
import { Decimal } from 'decimal.js-light'

export class Order {
  public constructor(
    public readonly id: string,
    public readonly product: Product,
    public readonly quantity: number,
    public readonly amount: Decimal,
    public readonly events: OrderEvent<unknown>[]
  ) {}

  public addEvent(orderEvent: OrderEvent<unknown>): void {
    this.events.push(orderEvent)
  }
}
