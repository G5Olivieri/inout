import { EventType } from '@app/core/events/event-type'
import { Action } from '@app/core/events/action'

export interface EventSubscriber {
  on<T>(eventType: EventType<T>, listener: Action<T>): void
}
