import {
  Option,
  fromNullable,
  some,
  isSome,
  isNone,
  map,
  getOrElse,
  match,
} from 'fp-ts/lib/Option'
import { Lazy } from 'fp-ts/lib/function'

export class NoSuchElementError extends Error {}

export class Optional<A> {
  private constructor(private readonly delegate: Option<A>) {}

  public static ofNullable<T>(value: T | null | undefined): Optional<T> {
    return new Optional(fromNullable(value))
  }

  public static of<T>(value: T): Optional<T> {
    return new Optional(some(value))
  }

  public get(): A {
    if (isNone(this.delegate)) {
      throw new NoSuchElementError('Optional.get(): No such element.')
    }
    return this.delegate.value
  }

  public isPresent(): boolean {
    return isSome(this.delegate)
  }

  public isEmpty(): boolean {
    return isNone(this.delegate)
  }

  public map<B>(mapper: (value: A) => B): Optional<B> {
    const mapped = map(mapper)(this.delegate)
    return new Optional(mapped)
  }

  public getOrElse(defaultValue: () => A): A {
    return getOrElse<A>(defaultValue as Lazy<A>)(this.delegate)
  }

  public match<B>(matcher: { onSome(a: A): B; onNone(): B }): B {
    return match<A, B>(matcher.onNone, matcher.onSome)(this.delegate)
  }
}
