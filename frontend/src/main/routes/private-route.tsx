import React from "react"
import { Redirect, Route, RouteProps } from "react-router-dom"

import { useAuth } from "@app/auth/application/hooks/use-auth"

type Props = RouteProps & {
  component: React.FC
}

export const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const auth = useAuth()
  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isLogged ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/signin", state: { from: props.location }}} />
        )
      }
    />
  )
}
