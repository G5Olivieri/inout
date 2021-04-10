import 'module-alias/register'
import 'reflect-metadata'
import { server } from '@app/server'

const port = process.env.PORT || '3000'

server.listen(port, () => {
  console.info(`Server running on port ${port}`)
})
