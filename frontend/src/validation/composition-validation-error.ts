import { ValidationError } from "./validation-error";

export class CompositeValidationError {
  public constructor(private errors: { [key: string]: ValidationError } = {}) {}

  public getErrors(): string[] {
    return Object.values(this.errors).map((error) => error.getErrors()).flat();
  }

  public hasError(): boolean {
    return Object.values(this.errors).some(e => e.hasError())
  }

  public getValidationError(name: string): ValidationError {
    return this.errors[name] || new ValidationError()
  }
}
