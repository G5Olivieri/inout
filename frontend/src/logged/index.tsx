import React, { FC, useContext } from "react"
import { AuthenticationContext } from "../authentication/authentication-context"
export const Logged: FC = () => {
  const authManager = useContext(AuthenticationContext)

  const onClick = async () => {
    await authManager.logout()
  }

  return (
    <div>
      <button onClick={onClick}>Logout</button>
    </div>
  )
}
