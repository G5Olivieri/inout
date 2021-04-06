import { combineRoutes } from '@marblejs/core'
import { createProductRoute$ } from '@app/products/create/create-product.effect'
import { listProductsRoute$ } from '@app/products/list/list-products.effect'

export const products$ = combineRoutes('/products', [
  listProductsRoute$,
  createProductRoute$,
])
