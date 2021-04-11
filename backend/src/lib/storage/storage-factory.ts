import { NODE_ENV } from '@app/settings'
import { Storage } from '@app/lib/storage/storage'
import { InMemoryStorage } from '@app/lib/storage/in-memory-storage'
import { AsyncStorage } from '@app/lib/storage/async-storage'

export class StorageFactory {
  public static create(namespace = 'default'): Storage {
    if (NODE_ENV === 'test') {
      return StorageFactory.createInMemoryStorage(namespace)
    }

    return StorageFactory.createAsyncStorage(namespace)
  }

  public static createInMemoryStorage(namespace: string): Storage {
    return new InMemoryStorage(namespace)
  }

  public static createAsyncStorage(namespace: string): Storage {
    return new AsyncStorage(namespace)
  }
}
