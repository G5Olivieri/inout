import { Rule } from "./rule"

export class IsGreaterThan implements Rule<string> {
  public constructor(private readonly minLength: number) {}

  public getMessageTemplate(): string {
    return `{0} must be length greater or equal ${this.minLength}`
  }

  public apply(value: string): boolean {
    return value.length < this.minLength
  }
}
