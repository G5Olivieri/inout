import { GetAllSalesItemResponse } from '@app/sales/application/controllers/v1/get-all-sales.response'
import { GetAllSalesQuery } from '@app/sales/application/get-all-sales.query'
import { inject } from 'inversify'
import {
  BaseHttpController,
  controller,
  interfaces,
  httpGet,
  queryParam,
} from 'inversify-express-utils'

@controller('/api/v1/sales')
export class GetAllSalesController extends BaseHttpController {
  public constructor(
    @inject(GetAllSalesQuery)
    private readonly query: GetAllSalesQuery
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

    return this.json(GetAllSalesItemResponse.fromSales(result))
  }
}
