import { Observable } from 'rxjs'
import { ProductFetched } from '@app/products/list/product-fetched'

export const listProducts$ = new Observable<Array<ProductFetched>>(
  (subscribe) => {
    const data = [
      new ProductFetched('1'),
      new ProductFetched('2'),
      new ProductFetched('3'),
    ]
    setTimeout(() => {
      subscribe.next(data)
    }, 300)
  }
)
