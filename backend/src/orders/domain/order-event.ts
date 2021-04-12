export abstract class OrderEvent<T> {
  public constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly timestamp: Date,
    public readonly data: T
  ) {}
}
