import { StorageFactory } from '@app/lib/storage/storage-factory'
import { Storage } from '@app/lib/storage/storage'
import express from 'express'

const NAMESPACE = 'RequestContextStorage'
let context: Storage | null = null
const defaultStorage = StorageFactory.createInMemoryStorage(NAMESPACE)
let isInRequest = false

export class RequestContext {
  public static get current(): Storage {
    if (context === null) {
      return defaultStorage
    }
    return context
  }
}

export const requestContextStorage = () => (
  _req: express.Request,
  _res: express.Response,
  next: express.NextFunction
): void => {
  if (isInRequest) {
    next()
    return
  }

  if (context === null) {
    context = StorageFactory.createAsyncStorage(NAMESPACE)
  }

  isInRequest = true
  context.run(() => next())
  isInRequest = false
}
