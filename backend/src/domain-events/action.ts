export type Action<T> = (event: T) => Promise<void> | void
