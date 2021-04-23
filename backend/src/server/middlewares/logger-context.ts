import express from 'express'
import { Logger } from '@app/lib/logger/logger'
import { v4 as uuid } from 'uuid'
import _ from 'lodash'

const getCorrelationId = (req: express.Request) => {
  const correlationId: unknown = _.get(req, 'headers.x-correlation-id')
  return typeof correlationId === 'string' ? correlationId : uuid()
}

export const loggerContext = () => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  Logger.runInContext(() => {
    Logger.setCorrelationId(getCorrelationId(req))
    Logger.setRequestId(uuid())
    next()
  })
}
