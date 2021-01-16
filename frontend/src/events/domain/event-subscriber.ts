import { Action } from "@app/events/domain/action"
import { Subscription } from "rxjs";

export interface EventSubscriber {
  on<T>(eventType: new (...args: any[]) => T, listener: Action<T>): Subscription;
}
