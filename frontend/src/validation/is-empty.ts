import { Rule } from "./rule"

export class IsEmpty implements Rule<string> {
  public getMessageTemplate(): string {
    return "{0} must be not empty."
  }

  public apply(value: string): boolean {
    return value.length === 0
  }
}
