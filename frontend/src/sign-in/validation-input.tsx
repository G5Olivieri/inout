import React, { FC } from "react"
import { ValidationError } from "../validation/validation-error"
import { Errors } from "./errors"

interface Props {
  name: string,
  validationError: ValidationError,
  value: string,
  label: string,
  onChange: (value: string) => void,
  type?: string,
  autoFocus?: boolean,
}

export const ValidationInput: FC<Props> = ({
  name,
  validationError,
  value,
  onChange,
  label,
  autoFocus = false,
  type = "text",
}): JSX.Element => {
  return (
    <>
      <label htmlFor={name}>
        {label}:
        <input type={type} name={name} value={value} onChange={e => onChange(e.target.value)} autoFocus={autoFocus} />
      </label>
      <Errors errors={validationError} />
    </>
  )
}
