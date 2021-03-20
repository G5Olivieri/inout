import React from 'react'
import { useDomainEvents } from '@app/ui/events/use-domain-events'
import { DomainEventsContext } from '@app/ui/events/domain-events-context'

export const DomainEventsProvider: React.FC = ({ children }): JSX.Element => {
  const domainEvents = useDomainEvents()
  return (
    <DomainEventsContext.Provider value={domainEvents}>
      {children}
    </DomainEventsContext.Provider>
  )
}
