import 'module-alias/register'

import express from 'express'
import { CORS_ALLOWED_ORIGINS } from '@app/settings'
import { logHttpCommunication } from '@app/server/middlewares/log-http-communication'
import { loggerContext } from '@app/server/middlewares/logger-context'
import bodyParser from 'body-parser'
import cors from 'cors'

const server = express()

server.use(
  cors({
    origin: CORS_ALLOWED_ORIGINS,
  })
)
server.use(bodyParser.json())
server.use(loggerContext())
server.use(logHttpCommunication())

server.get('/', (req, res) => {
  res.send('OK').end()
})

const port = process.env.PORT || '3000'

server.listen(port, () => {
  console.info(`Server running on port ${port}`)
})
