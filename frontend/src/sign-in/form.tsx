import React, { FC, useState } from "react"
import { Credential } from "../authentication/credential"
import { validatePassword, validateUsername } from "./validation"
import { CompositeValidationError } from "../validation/composition-validation-error"
import { ValidationInput } from "./validation-input"
import { ValidationError } from "../validation/validation-error"

interface Props {
  onSubmit: (credential: Credential) => void,
}

export const Form: FC<Props> = ({ onSubmit }): JSX.Element => {
  const [ username, setUsername ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ usernameError, setUsernameError ] = useState(new ValidationError())
  const [ passwordError, setPasswordError ] = useState(new ValidationError())

  const validateForm = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const errors = new CompositeValidationError({
      username: validateUsername(username),
      password: validatePassword(password),
    })

    setUsernameError(errors.getValidationError("username"))
    setPasswordError(errors.getValidationError("password"))

    if (!errors.hasError()) {
      onSubmit({ username, password });
    }
  }

  return (
    <form onSubmit={validateForm}>
      <ValidationInput
        label="Usuário"
        value={username}
        onChange={setUsername}
        validationError={usernameError}
        name="username"
        autoFocus
      />
      <ValidationInput
        label="Senha"
        value={password}
        onChange={setPassword}
        validationError={passwordError}
        name="password"
        type="password"
      />

      <button type="submit">Enviar</button>
    </form>
  )
}
