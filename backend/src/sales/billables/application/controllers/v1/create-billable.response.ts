import { BillableCreated } from '@app/sales/billables/domain/billable-created'

export class CreateBillableResponse {
  public constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly amount: string,
    public readonly products: Array<string>
  ) {}

  public static fromBillableCreated(
    event: BillableCreated
  ): CreateBillableResponse {
    return new CreateBillableResponse(
      event.id.toString(),
      event.name,
      event.amount.toString(),
      event.products.map((product) => product.toString())
    )
  }
}
