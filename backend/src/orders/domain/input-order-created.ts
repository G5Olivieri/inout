import { OrderEvent } from '@app/orders/domain/order-event'
import { Decimal } from 'decimal.js-light'
import { v4 as uuid } from 'uuid'

interface InputOrderCreatedData {
  amount: Decimal
  quantity: number
}

export class InputOrderCreated extends OrderEvent<InputOrderCreatedData> {
  public constructor(amount: Decimal, quantity: number) {
    super(uuid(), 'OrderInputCreated', new Date(), {
      amount,
      quantity,
    })
  }
}
