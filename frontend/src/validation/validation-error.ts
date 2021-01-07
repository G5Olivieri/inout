export class ValidationError {
  public constructor(private readonly errors: string[] = []) {}

  public getErrors(): string[] {
    return this.errors;
  }

  public hasError(): boolean {
    return this.errors.length > 0
  }
}
