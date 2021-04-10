import express from 'express'
import { Logger } from '@app/lib/logger/logger'

const logger = Logger.getLogger('HttpCommunication')

const logRequest = (request: express.Request) => {
  const contentType = request.header('content-type') ?? ''
  let data = ''

  if (contentType.includes('application/json')) {
    data = JSON.stringify(request.body)
  }

  logger.http(`Request ${request.method.toUpperCase()} ${request.url}`, {
    url: request.url,
    method: request.method,
    headers: request.headers,
    params: request.params,
    data,
  })
}

const logResponse = (request: express.Request, response: express.Response) => {
  const requestStartTime = Date.now()
  // eslint-disable-next-line @typescript-eslint/ban-types
  const defaultEnd: Function = response.end
  // eslint-disable-next-line @typescript-eslint/ban-types
  const defaultWrite: Function = response.write
  const chunks: Buffer[] = []

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response.write = function write(chunk: any): any {
    chunks.push(Buffer.from(chunk))
    // eslint-disable-next-line prefer-rest-params
    return defaultWrite.apply(response, arguments)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response.end = function end(chunk: any): any {
    if (chunk) {
      chunks.push(Buffer.from(chunk))
    }

    const contentType = response.getHeader('content-type')
    const isJSON =
      typeof contentType === 'string'
        ? contentType.includes('application/json')
        : false
    const elapsedTimeMillis = Date.now() - requestStartTime

    logger.http(
      `Response ${request.method.toUpperCase()} ${request.url} ${
        response.statusCode
      }`,
      {
        url: request.url,
        method: request.method,
        elapsedTimeMillis,
        headers: { ...response.getHeaders() },
        status: response.statusCode,
        data: isJSON ? Buffer.concat(chunks).toString('utf8') : '',
      }
    )

    // eslint-disable-next-line prefer-rest-params
    return defaultEnd.apply(response, arguments)
  }
}

export const logHttpCommunication = () => (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
): void => {
  logRequest(request)
  logResponse(request, response)
  next()
}
