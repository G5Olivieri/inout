// eslint-disable-next-line max-len
/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any */
import { fromNullable, getOrElse } from 'fp-ts/Option'
import { pipe } from 'fp-ts/function'
import { Logger } from '@app/lib/logger/logger'
import { EventSubscriber } from '@app/domain-events/event-subscriber'
import { EventPublisher } from '@app/domain-events/event-publisher'
import { Action } from '@app/domain-events/action'
import { injectable } from 'inversify'

@injectable()
export class InMemoryDomainEvents implements EventPublisher, EventSubscriber {
  private readonly logger = Logger.getLogger(InMemoryDomainEvents.name)

  private readonly listeners = new Map<unknown, Array<Action<unknown>>>()
  private readonly onceListeners = new Map<unknown, Array<Action<unknown>>>()

  public on<T extends object>(
    eventType: new (...args: any[]) => T,
    listener: Action<T>
  ): void {
    const addListener = (arr: Array<Action<T>>) => arr.concat(listener)
    const updateListeners = (listeners: Array<Action<T>>) =>
      this.listeners.set(eventType, listeners as Array<Action<unknown>>)

    pipe(
      fromNullable(this.listeners.get(eventType)),
      getOrElse(() => [] as Array<Action<T>>),
      addListener,
      updateListeners
    )
  }

  public once<T extends object>(
    eventType: new (...args: any[]) => T,
    listener: Action<T>
  ): void {
    const addListener = (arr: Array<Action<T>>) => arr.concat(listener)
    const updateListeners = (listeners: Array<Action<T>>) =>
      this.onceListeners.set(eventType, listeners as Array<Action<unknown>>)

    pipe(
      fromNullable(this.onceListeners.get(eventType)),
      getOrElse(() => [] as Array<Action<T>>),
      addListener,
      updateListeners
    )
  }

  public async publish<T extends object>(event: T): Promise<void> {
    const getListeners = (listenersMap: Map<unknown, Array<Action<unknown>>>) =>
      pipe(
        fromNullable(listenersMap.get(event.constructor)),
        getOrElse(() => [] as Array<Action<T>>)
      )

    const allListeners = getListeners(this.listeners).concat(
      getListeners(this.onceListeners)
    )

    this.logger.debug('Publishing event', {
      listenerCount: allListeners.length,
      type: event.constructor.name,
    })

    await Promise.all(allListeners.map((listener) => listener(event)))

    this.onceListeners.delete(event.constructor)
  }
}
