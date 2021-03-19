// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EventType<T> = new (...args: any[]) => T
