import { r } from '@marblejs/core'
import { listProductsController$ } from '@app/products/list/list-products.controller'

export const listProductsRoute$ = r.pipe(
  r.matchPath('/'),
  r.matchType('GET'),
  r.useEffect((req$) => req$.pipe(listProductsController$))
)
