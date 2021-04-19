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
import {
  CreateProductRequest,
  createProductSchema,
} from '@app/products/application/controllers/v1/create-product-request'
import { EventSubscriber } from '@app/domain-events/event-subscriber'
import { ProductCreated } from '@app/products/domain/product-created'
import { CreateProductMapper } from '@app/products/application/controllers/v1/create-product-mapper'
import { Mapper } from '@app/common/mapper'
import { ProductNameConflicted } from '@app/products/domain/product-name-conflicted'

@controller('/api/v1/products')
export class CreateProductController extends BaseHttpController {
  private response: interfaces.IHttpActionResult = this.ok()

  public constructor(
    @inject(CreateProductCommand)
    private readonly command: CreateProductCommand,
    @inject(EventSubscriber)
    private readonly eventSubscriber: EventSubscriber,
    @inject(CreateProductMapper)
    private readonly mapper: Mapper<CreateProductRequest, Product>
  ) {
    super()
  }

  @httpPost('/')
  public async create(
    @request() req: express.Request
  ): Promise<interfaces.IHttpActionResult> {
    const result = createProductSchema.safeParse(req.body)
    if (!result.success) {
      return this.badRequest(result.error.name)
    }

    this.eventSubscriber.once(ProductCreated, (event) => {
      this.response = this.created(`/api/v1/products/${event.id}`, event)
    })

    this.eventSubscriber.once(ProductNameConflicted, () => {
      this.response = this.conflict()
    })

    await this.command.execute(this.mapper.map(result.data))

    return this.response
  }
}
