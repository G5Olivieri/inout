import { Observable } from 'rxjs'
import { CreateProductRequest } from '@app/products/create/create-product.request'
import { ProductCreated } from '@app/products/create/product-created'

export const createProduct = (
  createProductRequest: CreateProductRequest
): Observable<ProductCreated> =>
  new Observable<ProductCreated>((subscribe) => {
    setTimeout(() => {
      subscribe.next(new ProductCreated(createProductRequest.name))
    }, 100)
  })
