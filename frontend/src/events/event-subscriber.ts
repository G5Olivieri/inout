import { EventType } from '@app/events/event-type'
import { Action } from '@app/events/action'

export interface EventSubscriber {
  on<T>(eventType: EventType<T>, listener: Action<T>): void
}
