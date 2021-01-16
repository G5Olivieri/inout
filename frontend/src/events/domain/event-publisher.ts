export interface EventPublisher {
  publish<T extends object>(event: T): void
}
