import { Billable } from '@app/catalog/domain/billable'

export class GetBillableByIdResponse {
  public constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly amount: string,
    public readonly products: string[]
  ) {}

  public static fromBillable(billable: Billable): GetBillableByIdResponse {
    return new GetBillableByIdResponse(
      billable.id.toString(),
      billable.name,
      billable.amount.toString(),
      billable.products.map((productId) => productId.toString())
    )
  }
}
