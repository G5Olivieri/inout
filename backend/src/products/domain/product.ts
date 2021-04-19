export class Product {
  public constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly tags: Set<string>
  ) {}
}
