import { none } from 'fp-ts/lib/Option'
import { Optional } from "@app/lib/optional/optional";

export class None extends Optional<never> {
  public static INSTANCE = new None(none)
}

const instance = None.INSTANCE

export { instance as none }
