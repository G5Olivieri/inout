import express from 'express'
import { inject } from 'inversify'
import {
  BaseHttpController,
  controller,
  httpPost,
  request,
  interfaces,
} from 'inversify-express-utils'
import { CreateProductCommand } from '@app/products/domain/create-product.command'
import { Product } from '@app/products/domain/product'
import {
  CreateProductRequest,
  createProductSchema,
} from '@app/products/application/controllers/v1/create-product.request'
import { EventSubscriber } from '@app/domain-events/event-subscriber'
import { ProductCreated } from '@app/products/domain/product-created'
import { ProductNameConflicted } from '@app/products/domain/product-name-conflicted'
import { UUID } from '@app/lib/uuid/uuid'
import { CreateProductResponse } from '@app/products/application/controllers/create-product.response'

@controller('/api/v1/products')
export class CreateProductController extends BaseHttpController {
  private response: interfaces.IHttpActionResult = this.ok()

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
    const result = createProductSchema.safeParse(req.body)
    if (!result.success) {
      return this.badRequest(result.error.name)
    }

    this.eventSubscriber.once(ProductCreated, (event) => {
      this.response = this.created(
        `/api/v1/products/${event.id.toString()}`,
        CreateProductResponse.fromProductCreated(event)
      )
    })

    this.eventSubscriber.once(ProductNameConflicted, () => {
      this.response = this.conflict()
    })

    await this.command.execute(this.mapRequestToDomain(result.data))

    return this.response
  }

  private mapRequestToDomain(request: CreateProductRequest) {
    return new Product(
      UUID.randomUUID(),
      request.name,
      request.tags.reduce(
        (acc, value) => acc.add(value.toLowerCase()),
        new Set<string>()
      )
    )
  }
}
