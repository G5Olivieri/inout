export class Pagination<T> {
  public constructor(
    public readonly page: number,
    public readonly length: number,
    public readonly items: T[]
  ) {}
}
