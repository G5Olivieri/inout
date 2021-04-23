import { GetAllBillablesItemResponse } from '@app/catalog/application/controllers/v1/get-all-billables.response'
import { GetAllBillablesQuery } from '@app/catalog/application/get-all-billables.query'
import { inject } from 'inversify'
import {
  BaseHttpController,
  controller,
  interfaces,
  httpGet,
  queryParam,
} from 'inversify-express-utils'

@controller('/api/v1/catalog')
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
