export abstract class Query<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public abstract execute(...args: any[]): Promise<T>
}
