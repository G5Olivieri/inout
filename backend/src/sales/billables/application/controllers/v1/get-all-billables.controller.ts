import { GetAllBillablesItemResponse } from '@app/sales/billables/application/controllers/v1/get-all-billables.response'
import { GetAllBillablesQuery } from '@app/sales/billables/application/get-all-billables.query'
import { inject } from 'inversify'
import {
  BaseHttpController,
  controller,
  interfaces,
  httpGet,
  queryParam,
} from 'inversify-express-utils'

@controller('/api/v1/sales/billables')
export class GetAllBillablesController extends BaseHttpController {
  public constructor(
    @inject(GetAllBillablesQuery)
    private readonly query: GetAllBillablesQuery
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

    return this.json(GetAllBillablesItemResponse.fromBillables(result))
  }
}
