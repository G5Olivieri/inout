export abstract class Command {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public abstract execute(...args: any[]): Promise<void>
}
