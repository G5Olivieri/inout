import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { PrivateRoute } from "@app/main/routes/private-route"
import { Home } from "@app/home/application/home"
import { Signin } from "@app/auth/application/pages/signin"
import { Signup } from "@app/auth/application/pages/signup"

export const Routes: React.FC = () =>
<BrowserRouter>
  <Switch>
    <PrivateRoute exact path="/" component={Home} />
    <Route exact path="/signin" component={Signin} />
    <Route exact path="/signup" component={Signup} />
    <Route path="*" component={() => <h1>NOT FOUND</h1>} />
  </Switch>
</BrowserRouter>
