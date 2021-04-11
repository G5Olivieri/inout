import { inject } from 'inversify'
import {
  BaseHttpController,
  controller,
  interfaces,
  httpGet,
  queryParam,
} from 'inversify-express-utils'
import { GetAllProductsQuery } from '@app/products/domain/get-all-products-query'

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
    @queryParam('page') page?: number,
    @queryParam('itemsPerPage') itemsPerPage?: number
  ): Promise<interfaces.IHttpActionResult> {
    const result = await this.query.execute({
      page,
      itemsPerPage,
    })
    return this.json(result)
  }
}
