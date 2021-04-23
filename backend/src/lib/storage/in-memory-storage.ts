import { Storage } from '@app/lib/storage/storage'

export class InMemoryStorage implements Storage {
  private storage: Record<string, unknown> = {}
  public constructor(public readonly namespace: string) {}

  public get(key: string): unknown {
    return this.storage[key]
  }

  public set(key: string, value: unknown): void {
    this.storage[key] = value
  }

  public getOrSet(key: string, value: unknown): unknown {
    return Storage.getOrSet(this, key, value)
  }

  public run(fn: () => void): void {
    fn()
  }
}
