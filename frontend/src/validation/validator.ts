import { Rule } from "./rule"
import { ValidationError } from "./validation-error"

export class Validator<T> {
  public constructor(
    private readonly fieldName: string,
    private readonly rules: Array<Rule<T>>
  ) { }

  public validate(value: T): ValidationError {
    const errors = this.rules
      .filter((rule) => rule.apply(value))
      .map((applied) => applied.getMessageTemplate().replace('{0}', this.fieldName))
    return new ValidationError(errors)
  }
}
