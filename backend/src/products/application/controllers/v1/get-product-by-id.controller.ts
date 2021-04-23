import { inject } from 'inversify'
import {
  BaseHttpController,
  controller,
  interfaces,
  httpGet,
  requestParam,
} from 'inversify-express-utils'
import { UUID } from '@app/lib/uuid/uuid'
import { GetProductByIdQuery } from '@app/products/application/get-product-by-id.query'
import { GetProductByIdResponse } from '@app/products/application/controllers/v1/get-product-by-id.response'

@controller('/api/v1/products/:productId')
export class GetProductByIdController extends BaseHttpController {
  public constructor(
    @inject(GetProductByIdQuery)
    private readonly query: GetProductByIdQuery
  ) {
    super()
  }

  @httpGet('/')
  public async get(
    @requestParam('productId') productId: string
  ): Promise<interfaces.IHttpActionResult> {
    if (!UUID.validateString(productId)) {
      return this.badRequest()
    }

    const result = await this.query.execute(UUID.fromString(productId))

    if (result.isPresent()) {
      return this.json(GetProductByIdResponse.fromProduct(result.get()))
    }
    return this.notFound()
  }
}
