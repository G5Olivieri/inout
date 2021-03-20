import { Subject } from 'rxjs'
import { EventPublisher } from '@app/domain/events/event-publisher'
import { EventSubscriber } from '@app/domain/events/event-subscriber'
import { Action } from '@app/domain/events/action'
import { EventType } from '@app/domain/events/event-type'
import { Cancelable } from '@app/domain/events/cancelable'

export class DomainEvents implements EventSubscriber, EventPublisher {
  private readonly listeners = new Map<string, Subject<unknown>>()

  public on<T>(eventType: EventType<T>, listener: Action<T>): Cancelable {
    const subject = this.listeners.get(eventType.name) || new Subject<unknown>()
    const subscription = subject.subscribe({
      next: listener as Action<unknown>,
    })

    this.listeners.set(eventType.name, subject)

    return {
      cancel: () => subscription.unsubscribe(),
    }
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  public publish<T extends object>(event: T): void {
    const subject = this.listeners.get(event.constructor.name)
    if (!subject) {
      return
    }
    subject.next(event)
  }
}
