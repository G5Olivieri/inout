import { Container } from 'inversify'
import { productsModule } from '@app/products/products.module'
import { domainEventsModule } from '@app/domain-events/domain-events.module'
import { PrismaClient } from '.prisma/client'
import { Listener } from '@app/common/listener'

const prisma = new PrismaClient()
const diContainer = new Container()

diContainer.bind<PrismaClient>(PrismaClient).toConstantValue(prisma)
diContainer.load(domainEventsModule)
diContainer.load(productsModule)

if (diContainer.isBound(Listener)) {
  diContainer.getAll(Listener).forEach((listener) => listener.start())
}

export { diContainer }
