import React from "react"
import { Credential } from "../domain/credential"

export interface AuthContext {
  isLogged: boolean,
  authenticate: (credential: Credential) => Promise<void>
}

export const authContext = React.createContext<AuthContext>({
  isLogged: false,
  authenticate: async () => {}
})
