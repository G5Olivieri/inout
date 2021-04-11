/* eslint-disable
@typescript-eslint/no-explicit-any,
@typescript-eslint/explicit-module-boundary-types
*/
import { Newable } from '@app/lib/inversify/newable'
import { Listener } from '@app/common/listener'
import { interfaces } from 'inversify'

type ComposableFunction = (context: interfaces.Context, injectable: any) => any

export const activate = (type: Newable<Listener>): ComposableFunction => (
  c: interfaces.Context,
  injectable: any
): any => {
  ;(c.container.get(type) as Listener).start()
  return injectable
}

export const composeActivation = (...fns: ComposableFunction[]) => (
  context: interfaces.Context,
  injectable: any
): any => fns.reduce((prev, curr) => curr(context, prev), injectable)
