import React from "react"
import { authContext } from "./auth-context"
import { useProvideAuth } from "./hooks/use-provide-auth"

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useProvideAuth()
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  )
}
