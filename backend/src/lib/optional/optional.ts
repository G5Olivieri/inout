import {
  Option,
  fromNullable,
  some,
  isSome,
  isNone,
  map,
  getOrElse,
  match
} from 'fp-ts/lib/Option'
import { Lazy } from 'fp-ts/lib/function'
import { Some } from '@app/lib/optional/some'
import { None, none} from '@app/lib/optional/none'

export class Optional<A> {
  protected constructor(protected readonly delegate: Option<A>) {}

  public static ofNullable<T>(value: T | null | undefined): Optional<T> {
    return new Optional(fromNullable(value))
  }

  public static of<T>(value: T): Some<T> {
    return new Some(some(value))
  }

  public static empty(): None {
    return none
  }
  public isPresent(): this is Some<A> {
    return isSome(this.delegate)
  }

  public isEmpty(): this is None {
    return isNone(this.delegate)
  }

  public map<B>(mapper: (value: A) => B): Optional<B> {
    const option = map(mapper)(this.delegate);
    if (isSome(option)) {
      return new Some(option);
    }

    return none
  }

  public getOrElse(defaultValue: () => A): A {
    return getOrElse<A>(defaultValue as Lazy<A>)(this.delegate)
  }

  public match<B>(matcher: { onSome(a: A): B, onNone(): B }): B {
    return match<A, B>(matcher.onNone, matcher.onSome)(this.delegate)
  }
}
