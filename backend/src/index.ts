import 'module-alias/register'
import 'reflect-metadata'
import { createServer } from '@marblejs/core'
import { IO } from 'fp-ts/lib/IO'

import { listener } from '@app/http.listener'

const server = createServer({
  port: 1337,
  hostname: '0.0.0.0',
  listener,
})

const main: IO<void> = async () => await (await server)()

main()
