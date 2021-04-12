import { Order } from '@app/orders/domain/order'

export abstract class OrdersRepository {
  public abstract save(order: Order): Promise<void>
}
