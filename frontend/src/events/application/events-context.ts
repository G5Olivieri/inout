import { createContext } from "react"
import { DomainEvents } from "@app/events/domain/domain-events"

export const eventsContext = createContext(new DomainEvents())
