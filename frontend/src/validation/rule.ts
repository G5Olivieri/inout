export interface Rule<T> {
  getMessageTemplate(): string;
  apply(value: T): boolean;
}
