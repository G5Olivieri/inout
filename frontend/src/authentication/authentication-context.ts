import React from "react"
import { AuthManager } from "./auth-manager"
import { TokenRepository } from "./token-repository"

const repository = new TokenRepository(localStorage)
const authManager = new AuthManager(repository)

export const AuthenticationContext = React.createContext(authManager)
