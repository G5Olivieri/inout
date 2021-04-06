import { listProducts$ } from '@app/products/list/list-products'
import { pipe } from 'rxjs'
import { map, mergeMapTo } from 'rxjs/operators'

export const listProductsController$ = pipe(
  mergeMapTo(listProducts$),
  map((produts) => ({
    body: produts,
  }))
)
