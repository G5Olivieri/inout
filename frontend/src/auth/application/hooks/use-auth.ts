import { useContext } from "react";
import { authContext } from "@app/auth/application/auth-context";

export const useAuth = () => useContext(authContext)
