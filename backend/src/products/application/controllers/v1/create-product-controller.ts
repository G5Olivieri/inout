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

@controller('/api/v1/products')
export class CreateProductController extends BaseHttpController {
  public constructor(
    @inject(CreateProductCommand)
    private readonly command: CreateProductCommand
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
    const response = await this.command.execute(
      new Product(validationResult.data.name)
    )
    return this.json(response)
  }
}
