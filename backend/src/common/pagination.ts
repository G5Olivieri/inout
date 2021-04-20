type MapFunction<T, R> = (item: T) => R

export class Pagination<T> {
  public constructor(
    public readonly page: number,
    public readonly items: T[]
  ) {}

  public map<R>(mapFunction: MapFunction<T, R>): Pagination<R> {
    return new Pagination(this.page, this.items.map(mapFunction))
  }
}
