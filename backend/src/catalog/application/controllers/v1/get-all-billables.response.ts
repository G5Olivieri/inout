import { Billable } from '@app/catalog/domain/billable'

export class GetAllBillablesItemResponse {
  public constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly amount: string,
    public readonly products: string[]
  ) {}

  private static fromBillable(billable: Billable): GetAllBillablesItemResponse {
    return new GetAllBillablesItemResponse(
      billable.id.toString(),
      billable.name,
      billable.amount.toString(),
      billable.products.map((productId) => productId.toString())
    )
  }

  public static fromBillables(
    billables: Billable[]
  ): GetAllBillablesItemResponse[] {
    return billables.map((Billable) =>
      GetAllBillablesItemResponse.fromBillable(Billable)
    )
  }
}
