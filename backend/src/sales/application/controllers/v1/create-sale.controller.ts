import { EventSubscriber } from '@app/domain-events/event-subscriber'
import { UUID } from '@app/lib/uuid/uuid'
import { CreateSaleResponse } from '@app/sales/application/controllers/v1/create-sale.response'
import {
  CreateSaleRequest,
  createSaleSchema,
} from '@app/sales/application/controllers/v1/create-sale.request'
import { CreateSaleCommand } from '@app/sales/application/create-sale.command'
import { Sale } from '@app/sales/domain/sale'
import { SaleCreated } from '@app/sales/domain/sale-created'
import { Decimal } from 'decimal.js-light'
import express from 'express'
import { inject } from 'inversify'
import {
  BaseHttpController,
  controller,
  httpPost,
  request,
  interfaces,
} from 'inversify-express-utils'
import { TriedCreateSaleForNonexistentProduct } from '@app/sales/domain/tried-create-sale-for-nonexistent-product'
import { Product } from '@app/sales/domain/product'

@controller('/api/v1/sales')
export class CreateSaleController extends BaseHttpController {
  private response: interfaces.IHttpActionResult = this.ok()

  public constructor(
    @inject(EventSubscriber)
    private readonly subscriber: EventSubscriber,
    @inject(CreateSaleCommand)
    private readonly command: CreateSaleCommand
  ) {
    super()
  }

  @httpPost('/')
  public async create(
    @request() req: express.Request
  ): Promise<interfaces.IHttpActionResult> {
    const result = createSaleSchema.safeParse(req.body)
    if (!result.success) {
      return this.json(result.error, 400)
    }

    this.subscriber.once(SaleCreated, this.onSaleCreated.bind(this))
    this.subscriber.once(
      TriedCreateSaleForNonexistentProduct,
      this.onProductNotFound.bind(this)
    )

    await this.command.execute(this.mapRequestToDomain(result.data))
    return this.response
  }

  private mapRequestToDomain(request: CreateSaleRequest): Sale {
    return new Sale(
      UUID.randomUUID(),
      new Date(request.timestamp),
      request.products.map(
        (product) =>
          new Product(
            UUID.fromString(product.id),
            product.quantity,
            new Decimal(product.amount)
          )
      )
    )
  }

  private onSaleCreated(event: SaleCreated): void {
    const createSaleResponse = CreateSaleResponse.fromSaleCreated(event)

    this.response = this.created(
      `/api/v1/sales/catalog/sales/${createSaleResponse.id}`,
      createSaleResponse
    )
  }

  private onProductNotFound(): void {
    this.response = this.notFound()
  }
}
