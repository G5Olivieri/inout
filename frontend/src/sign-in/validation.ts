import { HasAtLeastNumbers } from "../validation/has-at-least-numbers"
import { HasAtLeastSpecialCharacters } from "../validation/has-at-least-special-characters"
import { IsEmpty } from "../validation/is-empty"
import { IsGreaterThan } from "../validation/is-greater-than"
import { ValidationError } from "../validation/validation-error"
import { Validator } from "../validation/validator"

export const validatePassword = (password: string): ValidationError => {
  const validator = new Validator("Password", [
    new IsEmpty(),
    new IsGreaterThan(8),
    new HasAtLeastNumbers(2),
    new HasAtLeastSpecialCharacters(2),
  ])
  return validator.validate(password.trim())
}

export const validateUsername = (username: string): ValidationError => {
  const validation = new Validator("Username", [
    new IsEmpty(),
  ])
  return validation.validate(username.trim())
}
