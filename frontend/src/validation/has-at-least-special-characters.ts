import { Rule } from "./rule"

export class HasAtLeastSpecialCharacters implements Rule<string> {
  private static REGEX: RegExp = /[!@#$%^&*(),\\.[\]{}]/g

  public constructor(private readonly minLength: number) { }

  public getMessageTemplate(): string {
    return `{0} must has at least ${this.minLength} special characters`
  }

  public apply(value: string) {
    return (value.match(HasAtLeastSpecialCharacters.REGEX) || []).length < this.minLength
  }
}
