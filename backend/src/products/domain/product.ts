import { UUID } from '@app/lib/uuid/uuid'

export class Product {
  public constructor(
    public readonly id: UUID,
    public readonly name: string,
    public readonly tags: Set<string>
  ) {}
}
