import { ContainerModule } from 'inversify'
import { EventPublisher } from '@app/domain-events/event-publisher'
import { EventSubscriber } from '@app/domain-events/event-subscriber'
import { InMemoryDomainEvents } from '@app/domain-events/in-memory-domain-events'

export const domainEventsModule = new ContainerModule((bind) => {
  const domainEvents = new InMemoryDomainEvents()
  bind<EventPublisher>(EventPublisher).toConstantValue(domainEvents)
  bind<EventSubscriber>(EventSubscriber).toConstantValue(domainEvents)
})
