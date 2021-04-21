import { EventSubscriber } from '@app/domain-events/event-subscriber'
import { UUID } from '@app/lib/uuid/uuid'
import { CreateBillableResponse } from '@app/sales/billables/application/controllers/v1/create-billable.response'
import {
  CreateBillableRequest,
  createBillableSchema,
} from '@app/sales/billables/application/controllers/v1/create-billable.request'
import { CreateBillableCommand } from '@app/sales/billables/application/create-billable.command'
import { Billable } from '@app/sales/billables/domain/billable'
import { BillableCreated } from '@app/sales/billables/domain/billable-created'
import { TriedCreateBillableForNonexistentProduct } from '@app/sales/billables/domain/tried-create-billable-for-nonexistent-product'
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

@controller('/api/v1/sales/catalog/billables')
export class CreateBillableController extends BaseHttpController {
  private response: interfaces.IHttpActionResult = this.ok()

  public constructor(
    @inject(EventSubscriber)
    private readonly subscriber: EventSubscriber,
    @inject(CreateBillableCommand)
    private readonly command: CreateBillableCommand
  ) {
    super()
  }

  @httpPost('/')
  public async create(
    @request() req: express.Request
  ): Promise<interfaces.IHttpActionResult> {
    const result = createBillableSchema.safeParse(req.body)
    if (!result.success) {
      return this.badRequest()
    }

    this.subscriber.once(BillableCreated, this.onBillableCreated.bind(this))
    this.subscriber.once(
      TriedCreateBillableForNonexistentProduct,
      this.onProductNotFound.bind(this)
    )

    await this.command.execute(this.mapRequestToDomain(result.data))
    return this.response
  }

  private mapRequestToDomain(request: CreateBillableRequest): Billable {
    return new Billable(
      UUID.randomUUID(),
      new Set(request.products.map(UUID.fromString)),
      request.name,
      new Decimal(request.amount)
    )
  }

  private onBillableCreated(event: BillableCreated): void {
    const createBillableResponse = CreateBillableResponse.fromBillableCreated(
      event
    )

    this.response = this.created(
      `/api/v1/sales/catalog/billables/${createBillableResponse.id}`,
      createBillableResponse
    )
  }

  private onProductNotFound(): void {
    this.response = this.notFound()
  }
}
