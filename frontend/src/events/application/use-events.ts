import { useContext } from "react"
import { eventsContext } from "@app/events/application/events-context"

export const useEvents = () => {
  return useContext(eventsContext)
}
