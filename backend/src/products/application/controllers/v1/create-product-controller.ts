import express from 'express'
import { inject } from 'inversify'
import {
  BaseHttpController,
  controller,
  httpPost,
  request,
  interfaces,
} from 'inversify-express-utils'
import { CreateProductCommand } from '@app/products/domain/create-product-command'
import { Product } from '@app/products/domain/product'
import { createProductSchema } from '@app/products/application/controllers/v1/create-product-request'
import { EventSubscriber } from '@app/domain-events/event-subscriber'
import { ProductCreated } from '@app/products/domain/product-created'

@controller('/api/v1/products')
export class CreateProductController extends BaseHttpController {
  public constructor(
    @inject(CreateProductCommand)
    private readonly command: CreateProductCommand,
    @inject(EventSubscriber)
    private readonly eventSubscriber: EventSubscriber
  ) {
    super()
  }

  @httpPost('/')
  public async create(
    @request() req: express.Request
  ): Promise<interfaces.IHttpActionResult> {
    const validationResult = createProductSchema.safeParse(req.body)
    if (!validationResult.success) {
      return this.badRequest(validationResult.error.name)
    }

    let response: interfaces.IHttpActionResult = this.ok()

    this.eventSubscriber.once(ProductCreated, (event) => {
      response = this.created(`/api/v1/products/${event.id}`, event)
    })

    await this.command.execute(new Product(validationResult.data.name))
    return response
  }
}
