import React, { FC, useContext } from "react"
import { AuthenticationContext } from "../authentication/authentication-context"
import { Credential } from "../authentication/credential"
import { Form } from "./form"

export const SignIn: FC = (): JSX.Element => {
  const authManager = useContext(AuthenticationContext)

  const login = async (credential: Credential): Promise<void> => {
    await authManager.authenticate(credential)
  }

  return <Form onSubmit={login} />
}
