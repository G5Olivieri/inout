import express from 'express'

import {
  BaseHttpController,
  controller,
  httpPost,
  interfaces,
  request,
} from 'inversify-express-utils'

@controller('/api/v1/products/:productId/orders')
export class CreateInputOrderController extends BaseHttpController {
  @httpPost('/')
  public async create(
    @request() req: express.Request
  ): Promise<interfaces.IHttpActionResult> {
    const result = createInputOrderSchema.safeParse()
    return this.json({
      ok: true,
    })
  }
}
