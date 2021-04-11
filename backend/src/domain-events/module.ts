import { ContainerModule } from 'inversify'
import { EventPublisher } from '@app/domain-events/event-publisher'
import { EventSubscriber } from '@app/domain-events/event-subscriber'
import { RequestContext } from '@app/server/middlewares/request-context-storage'
import { InMemoryDomainEvents } from '@app/domain-events/in-memory-domain-events'

export const domainEventsModule = new ContainerModule((bind) => {
  bind<EventPublisher>(EventPublisher).toDynamicValue(
    () =>
      RequestContext.current.getOrSet(
        'domainEvents',
        new InMemoryDomainEvents()
      ) as EventPublisher
  )
  bind<EventSubscriber>(EventSubscriber).toDynamicValue(
    () =>
      RequestContext.current.getOrSet(
        'domainEvents',
        new InMemoryDomainEvents()
      ) as EventSubscriber
  )
})
