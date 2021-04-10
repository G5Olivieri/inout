export interface Storage {
  namespace: string
  get(key: string): unknown
  set(key: string, value: unknown): void
  run(fn: () => void): void
}
