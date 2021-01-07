import React, { FC, useContext, useEffect, useState } from 'react';
import { AuthenticationContext } from './authentication/authentication-context';
import { Logged } from './logged';
import { SignIn } from "./sign-in"

export const App: FC = (): JSX.Element => {
  const authManager = useContext(AuthenticationContext)
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    authManager.isAuthenticated().then(setIsLogged)

    authManager.subscribe(async () => {
      setIsLogged(await authManager.isAuthenticated())
    })
  }, [authManager])

  return (
    <>
      {isLogged ? <Logged /> : <SignIn />}
    </>
  )
}
