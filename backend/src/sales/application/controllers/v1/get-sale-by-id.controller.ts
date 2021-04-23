import { inject } from 'inversify'
import {
  BaseHttpController,
  controller,
  interfaces,
  httpGet,
  requestParam,
} from 'inversify-express-utils'
import { UUID } from '@app/lib/uuid/uuid'
import { GetSaleByIdQuery } from '@app/sales/application/get-sale-by-id.query'
import { GetSaleByIdResponse } from '@app/sales/application/controllers/v1/get-sale-by-id.response'

@controller('/api/v1/sales/:saleId')
export class GetSaleByIdController extends BaseHttpController {
  public constructor(
    @inject(GetSaleByIdQuery)
    private readonly query: GetSaleByIdQuery
  ) {
    super()
  }

  @httpGet('/')
  public async get(
    @requestParam('saleId') saleId: string
  ): Promise<interfaces.IHttpActionResult> {
    if (!UUID.validateString(saleId)) {
      return this.badRequest()
    }

    const result = await this.query.execute(UUID.fromString(saleId))

    if (result.isPresent()) {
      return this.json(GetSaleByIdResponse.fromSale(result.get()))
    }
    return this.notFound()
  }
}
