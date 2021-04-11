export abstract class Storage {
  public abstract readonly namespace: string
  public abstract get(key: string): unknown
  public abstract set(key: string, value: unknown): void
  public abstract getOrSet(key: string, value: unknown): unknown
  public abstract run(fn: () => void): void

  public static getOrSet(
    storage: Storage,
    key: string,
    value: unknown
  ): unknown {
    const storagedValue = storage.get(key)
    if (!storagedValue) {
      storage.set(key, value)
    }
    return storage.get(key)
  }
}
