import { Subject, Subscription } from "rxjs"
import { Option } from "monapt"
import { EventPublisher } from "@app/events/domain/event-publisher";
import { EventSubscriber } from "@app/events/domain/event-subscriber";
import { Action } from "@app/events/domain/action";


export class DomainEvents implements EventSubscriber, EventPublisher {
  private readonly listeners = new Map<unknown, Subject<any>>()

  public on<T>(eventType: new (...args: any[]) => T, listener: Action<T>): Subscription {
    const subject = Option(this.listeners.get(eventType))
      .getOrElse(() => new Subject<T>())

    this.listeners.set(eventType, subject)

    return subject.subscribe((event) => listener(event))
  }

  public publish<T extends object>(event: T): void {
    Option(this.listeners.get(event.constructor))
      .foreach((subject) => subject.next(event))
  }
}
