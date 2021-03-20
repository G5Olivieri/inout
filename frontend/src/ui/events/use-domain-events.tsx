import React from 'react'
import { DomainEventsContext } from '@app/ui/events/domain-events-context'
import { DomainEvents } from '@app/domain/events/domain-events'

export const useDomainEvents = (): DomainEvents =>
  React.useContext(DomainEventsContext)
