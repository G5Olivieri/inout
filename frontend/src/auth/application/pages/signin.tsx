import React, { useEffect, useMemo, useState } from "react"
import { useHistory } from "react-router-dom"
import { useEvents } from "@app/events/application/use-events"
import { useAuth } from "@app/auth/application/hooks/use-auth"
import { AuthenticateFailureEvent } from "@app/auth/domain/commands/authenticate/authenticate-failure-event"
import { AuthenticateSuccessEvent } from "@app/auth/domain/commands/authenticate/authenticate-success-event"

export const Signin: React.FC = () => {
  const events = useEvents()
  const auth = useAuth()
  const history = useHistory()
  const [failure, setFailure] = useState("")

  const subscriptions = useMemo(() => [
    events.on(AuthenticateFailureEvent, (event) => {
      setFailure(event.reason)
    }),

    events.on(AuthenticateSuccessEvent, () => {
      history.push("/")
    }),
  ], [events, history])

  useEffect(() => () => subscriptions.forEach((s) => s.unsubscribe()), [subscriptions])

  const authenticate = async () => {
    await auth.authenticate({
      username: "glayson",
      password: "12345"
    })
  }

  const gotoSignup = () => {
    history.push("/signup")
  }

  return (
    <div>
      {failure}
      <h1>Signin</h1>
      <button onClick={authenticate}>Entrar</button>
      <button onClick={gotoSignup}>Cadastrar</button>
    </div>
  )
}
