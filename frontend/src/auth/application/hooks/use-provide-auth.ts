import { useEffect, useMemo, useState } from "react"
import { StatusCodes } from "http-status-codes"
import { Option } from "monapt"

import { AuthenticateCommand } from "@app/auth/domain/commands/authenticate/authenticate-command"
import { AuthenticateSuccessEvent } from "@app/auth/domain/commands/authenticate/authenticate-success-event"
import { CheckIfIsAuthenticatedCommand } from "@app/auth/domain/commands/is-authenticated/check-if-is-authenticated-command"
import { IsAuthenticatedEvent } from "@app/auth/domain/commands/is-authenticated/is-authenticated-event"
import { IsNotAuthenticatedEvent } from "@app/auth/domain/commands/is-authenticated/is-not-authenticated-event"
import { useEvents } from "@app/events/application/use-events"
import { HttpResponse } from "@app/http/domain/http-response"
import { AuthContext } from "@app/auth/application/auth-context"
import { AuthenticateFailureEvent } from "@app/auth/domain/commands/authenticate/authenticate-failure-event"

export const useProvideAuth = (): AuthContext => {
  const [isLogged, setIsLogged] = useState(false)
  const [token, setToken] = useState<string | undefined>(undefined)
  const events = useEvents()

  const checkIfIsAuthenticatedCommand = useMemo(() => new CheckIfIsAuthenticatedCommand(events, {
    getToken: async () => Option<string>(token)
  }), [events, token])

  const authenticateCommand = useMemo(() => new AuthenticateCommand(events, {
    post: async () => new HttpResponse(StatusCodes.OK, { token: "invalid password" })
  }), [events])

  const subscriptions = useMemo(() => [
    events.on(IsAuthenticatedEvent, () => {
      setIsLogged(true)
    }),

    events.on(IsNotAuthenticatedEvent, () => {
      setIsLogged(false)
    }),

    events.on(AuthenticateSuccessEvent, (event) => {
      setToken(event.token)
      setIsLogged(true)
    }),

    events.on(AuthenticateFailureEvent, () => {
      setToken(undefined)
      setIsLogged(false)
    })
  ], [events])

  useEffect(() => {
    checkIfIsAuthenticatedCommand.execute();
    return () => subscriptions.forEach(s => s.unsubscribe())
  }, [subscriptions, checkIfIsAuthenticatedCommand])

  return {
    isLogged,
    authenticate: authenticateCommand.execute.bind(authenticateCommand)
  }
}
