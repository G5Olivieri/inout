import winston from 'winston'
import { Format } from 'logform'
import { LOGGER_LEVEL } from '@app/settings'

export class LoggerTransportersFactory {
  public createWinstonInstance(): winston.Logger {
    const logger = winston.createLogger()

    logger.add(
      new winston.transports.Console({
        format: this.consoleFormat(),
        level: LOGGER_LEVEL,
      })
    )

    return logger
  }

  private consoleFormat(): Format {
    return winston.format.combine(
      winston.format.timestamp(),
      winston.format.printf((log) =>
        [
          log.timestamp,
          `[${log.level}]`,
          log.message,
          JSON.stringify(log, null, 4),
        ].join(' ')
      )
    )
  }
}
