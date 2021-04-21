import { UUID } from '@app/lib/uuid/uuid'

export class TriedCreateBillableForNonexistentProduct {
  public constructor(
    public readonly billableId: UUID,
    public readonly productId: UUID
  ) {}
}
