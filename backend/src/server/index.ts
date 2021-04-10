import { CORS_ALLOWED_ORIGINS } from '@app/settings'
import { logHttpCommunication } from '@app/server/middlewares/log-http-communication'
import { loggerContext } from '@app/server/middlewares/logger-context'
import bodyParser from 'body-parser'
import cors from 'cors'
import { diContainer } from '@app/di-container'
import { InversifyExpressServer } from 'inversify-express-utils'

const server = new InversifyExpressServer(diContainer)
  .setConfig((app) => {
    app.use(
      cors({
        origin: CORS_ALLOWED_ORIGINS,
      })
    )
    app.use(bodyParser.json())
    app.use(loggerContext())
    app.use(logHttpCommunication())

    app.get('/', (req, res) => {
      res.send({ status: 'OK' }).end()
    })
  })
  .build()

export { server }
