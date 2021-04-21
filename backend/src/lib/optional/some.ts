import { Some as SomeDelegate } from "fp-ts/lib/Option";
import { Optional } from "@app/lib/optional/optional";

export class Some<T> extends Optional<T> {
  public get value(): T {
    return (this.delegate as SomeDelegate<T>).value
  }
}
