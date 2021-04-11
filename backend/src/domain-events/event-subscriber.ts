import { Action } from '@app/domain-events/action'
import { injectable } from 'inversify'

/* eslint-disable @typescript-eslint/ban-types */
@injectable()
export abstract class EventSubscriber {
  public abstract on<T extends object>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    eventType: new (...args: any[]) => T,
    listener: Action<T>
  ): void
  public abstract once<T extends object>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    eventType: new (...args: any[]) => T,
    listener: Action<T>
  ): void
}
