import { inject } from 'inversify'
import {
  BaseHttpController,
  controller,
  interfaces,
  httpGet,
  requestParam,
} from 'inversify-express-utils'
import { UUID } from '@app/lib/uuid/uuid'
import { GetBillableByIdQuery } from '@app/catalog/application/get-billable-by-id.query'
import { GetBillableByIdResponse } from '@app/catalog/application/controllers/v1/get-billable-by-id.response'

@controller('/api/v1/catalog/:billableId')
export class GetBillableByIdController extends BaseHttpController {
  public constructor(
    @inject(GetBillableByIdQuery)
    private readonly query: GetBillableByIdQuery
  ) {
    super()
  }

  @httpGet('/')
  public async get(
    @requestParam('billableId') billableId: string
  ): Promise<interfaces.IHttpActionResult> {
    if (!UUID.validateString(billableId)) {
      return this.badRequest()
    }

    const result = await this.query.execute(UUID.fromString(billableId))

    if (result.isPresent()) {
      return this.json(GetBillableByIdResponse.fromBillable(result.get()))
    }
    return this.notFound()
  }
}
