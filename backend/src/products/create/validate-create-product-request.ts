import { requestValidator$ } from '@marblejs/middleware-io'
import { CreateProductRequest } from '@app/products/create/create-product.request'
import { pipe } from 'rxjs'
import { map } from 'rxjs/operators'

export const validateCreateProductRequest = pipe(
  requestValidator$({
    body: CreateProductRequest,
  }),
  map((req) => req.body as CreateProductRequest)
)
