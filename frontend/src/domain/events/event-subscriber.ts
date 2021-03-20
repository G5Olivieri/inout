import { EventType } from '@app/domain/events/event-type'
import { Action } from '@app/domain/events/action'
import { Cancelable } from '@app/domain/events/cancelable'

export interface EventSubscriber {
  on<T>(eventType: EventType<T>, listener: Action<T>): Cancelable
}
