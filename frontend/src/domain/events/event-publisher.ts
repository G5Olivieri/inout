export interface EventPublisher {
  // eslint-disable-next-line @typescript-eslint/ban-types
  publish<T extends object>(event: T): void
}
