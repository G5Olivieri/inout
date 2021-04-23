import { inject } from 'inversify'
import {
  BaseHttpController,
  controller,
  interfaces,
  httpGet,
  queryParam,
} from 'inversify-express-utils'
import { GetAllProductsQuery } from '@app/products/application/get-all-products.query'
import { GetAllProductsItemResponse } from '@app/products/application/controllers/v1/get-all-products.response'

@controller('/api/v1/products')
export class GetAllProductsController extends BaseHttpController {
  public constructor(
    @inject(GetAllProductsQuery)
    private readonly query: GetAllProductsQuery
  ) {
    super()
  }

  @httpGet('/')
  public async get(
    @queryParam('limit') limit?: number,
    @queryParam('offset') offset?: number
  ): Promise<interfaces.IHttpActionResult> {
    const result = await this.query.execute({
      limit,
      offset,
    })

    return this.json(GetAllProductsItemResponse.fromProducts(result))
  }
}
