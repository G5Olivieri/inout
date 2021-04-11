import { createNamespace, Namespace } from 'cls-hooked'
import { Storage } from '@app/lib/storage/storage'

export class AsyncStorage implements Storage {
  private readonly storage: Namespace

  public constructor(public readonly namespace: string) {
    this.storage = createNamespace(namespace)
  }

  public get(key: string): unknown {
    return this.storage.get(key)
  }

  public set(key: string, value: unknown): void {
    this.storage.set(key, value)
  }

  public getOrSet(key: string, value: unknown): unknown {
    return Storage.getOrSet(this, key, value)
  }

  public run(fn: () => void): void {
    this.storage.run(fn)
  }
}
