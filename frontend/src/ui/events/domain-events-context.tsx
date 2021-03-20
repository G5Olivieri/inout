import React from 'react'
import { DomainEvents } from '@app/domain/events/domain-events'

export const DomainEventsContext = React.createContext(new DomainEvents())
