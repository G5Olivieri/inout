import { EventType } from '@app/domain/events/event-type'
import { Action } from '@app/domain/events/action'

export interface EventSubscriber {
  on<T>(eventType: EventType<T>, listener: Action<T>): void
}
