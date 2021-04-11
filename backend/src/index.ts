import 'module-alias/register'
import 'reflect-metadata'
import { app } from '@app/server'
import { diContainer } from '@app/di-container'
import { PrismaClient } from '.prisma/client'

const port = process.env.PORT || '3000'

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server')
  server.close(() => {
    diContainer.get(PrismaClient).$disconnect()
    console.log('HTTP server closed')
  })
})
