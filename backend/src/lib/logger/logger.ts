import { StorageFactory } from '@app/lib/storage/storage-factory'
import { LoggerMetadataFilter } from '@app/lib/logger/logger-metadata-filter'
import { LoggerTransportersFactory } from '@app/lib/logger/logger-transporter-factory'
import { Level } from '@app/lib/logger/level'
import { NODE_ENV } from '@app/settings'

export class Logger {
  private static readonly metadataFilter = new LoggerMetadataFilter([
    'card',
    'cnpj',
    'cpf',
    'cvv',
    'num',
    'pass',
    'phone',
    'secu',
    'telefone',
    'auth',
    'senha',
  ])

  // eslint-disable-next-line max-len
  private static readonly winston = new LoggerTransportersFactory().createWinstonInstance()

  private static readonly context = StorageFactory.create('logger-namespace')

  private static applicationInfo: Record<string, string> = {}

  private constructor(public readonly name: string) {}

  public static getLogger(name = 'main'): Logger {
    return new Logger(name)
  }

  public static setApplicationInfo(name: string, value: string): void {
    Logger.applicationInfo[name] = value
  }

  public static runInContext(fn: (...args: unknown[]) => void): void {
    Logger.context.run(fn)
  }

  public static setRequestId(id: string): void {
    Logger.context.set('requestId', id)
  }

  public static setCorrelationId(id: string): void {
    Logger.context.set('correlationId', id)
  }

  public static setSessionMetadata(data: unknown): void {
    Logger.context.set('sessionMetadata', data)
  }

  public info(message: string, meta: { [key: string]: unknown } = {}): void {
    this.log(Level.info, message, meta)
  }

  public error(message: string, meta: { [key: string]: unknown } = {}): void {
    this.log(Level.error, message, meta)
  }

  public debug(message: string, meta: { [key: string]: unknown } = {}): void {
    this.log(Level.debug, message, meta)
  }

  public http(message: string, meta: { [key: string]: unknown } = {}): void {
    this.log(Level.http, message, meta)
  }

  public warn(message: string, meta: { [key: string]: unknown } = {}): void {
    this.log(Level.warn, message, meta)
  }

  public log(
    level: Level,
    message: string,
    meta: { [key: string]: unknown }
  ): void {
    try {
      Logger.winston.log(level, message, {
        name: this.name,
        session: Logger.context.get('sessionMetadata'),
        correlationId: Logger.context.get('correlationId'),
        requestId: Logger.context.get('requestId'),
        nodeEnv: NODE_ENV,
        meta: { [this.name]: Logger.metadataFilter.filter(meta) },
        applicationInfo: Logger.applicationInfo,
      })
    } catch (error: unknown) {
      console.error('Failed to write logs', error)
    }
  }
}
