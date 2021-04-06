import { validateCreateProductRequest } from '@app/products/create/validate-create-product-request'
import { createProduct } from '@app/products/create/create-product'
import { map, mergeMap } from 'rxjs/operators'
import { pipe } from 'rxjs'

export const createProductController$ = pipe(
  validateCreateProductRequest,
  mergeMap(createProduct),
  map((product) => ({ body: product, status: 201 }))
)
