import { injectable } from 'inversify'

@injectable()
export abstract class EventPublisher {
  // eslint-disable-next-line @typescript-eslint/ban-types
  public abstract publish<T extends object>(event: T): Promise<void>
}
