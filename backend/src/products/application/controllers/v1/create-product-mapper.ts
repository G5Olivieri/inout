import { v4 as uuid } from 'uuid'
import { CreateProductRequest } from '@app/products/application/controllers/v1/create-product-request'
import { Product } from '@app/products/domain/product'
import { Mapper } from '@app/common/mapper'
import { injectable } from 'inversify'

@injectable()
export class CreateProductMapper
  implements Mapper<CreateProductRequest, Product> {
  public map(createProductRequest: CreateProductRequest): Product {
    return new Product(
      uuid(),
      createProductRequest.name,
      createProductRequest.tags.reduce(
        (acc, value) => acc.add(value.toLowerCase()),
        new Set<string>()
      )
    )
  }
}
