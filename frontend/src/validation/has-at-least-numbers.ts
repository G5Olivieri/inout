import { Rule } from "./rule"

export class HasAtLeastNumbers implements Rule<string> {
  private static REGEX: RegExp = /[0-9]/g

  public constructor(private readonly minLength: number) { }

  public getMessageTemplate(): string {
    return `{0} must has at least ${this.minLength} numbers`
  }

  public apply(value: string) {
    return (value.match(HasAtLeastNumbers.REGEX) || []).length < this.minLength
  }
}
