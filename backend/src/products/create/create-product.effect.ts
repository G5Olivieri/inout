import { r } from '@marblejs/core'
import { createProductController$ } from '@app/products/create/create-product.controller'

export const createProductRoute$ = r.pipe(
  r.matchPath('/'),
  r.matchType('POST'),
  r.useEffect((req$) => req$.pipe(createProductController$))
)
