export type Action<T> = (event: T) => void | Promise<void>
