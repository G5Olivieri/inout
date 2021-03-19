import { EventPublisher } from '@app/events/event-publisher'
import { EventSubscriber } from '@app/events/event-subscriber'
import { Action } from '@app/events/action'
import { EventType } from '@app/events/event-type'

export class DomainEvents implements EventSubscriber, EventPublisher {
  private readonly listeners = new Map<string, Array<Action<unknown>>>()

  public on<T>(eventType: EventType<T>, listener: Action<T>): void {
    const listeners = this.listeners.get(eventType.name) || []
    listeners.push(listener as Action<unknown>)
    this.listeners.set(eventType.name, listeners)
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public async publish<T extends object>(event: T): Promise<void> {
    const listeners = this.listeners.get(event.constructor.name) || []
    await Promise.all(listeners.map((action) => action(event)))
  }
}
