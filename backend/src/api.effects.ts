import { combineRoutes } from '@marblejs/core'
import { products$ } from '@app/products/products.effect'

export const api$ = combineRoutes('/api/v1', [products$])
