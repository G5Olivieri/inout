import { Storage } from '@app/lib/storage/storage'

export class InMemoryStorage implements Storage {
  private storage: Record<string, unknown> = {}

  public constructor(public readonly namespace: string) {}

  public get(key: string): unknown {
    return this.storage[key]
  }

  public run(fn: () => void): void {
    fn()
  }

  public set(key: string, value: unknown): void {
    this.storage[key] = value
  }
}
