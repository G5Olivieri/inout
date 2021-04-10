import { ContainerModule } from 'inversify'
import { CreateProductCommand } from '@app/products/domain/create-product-command'
import { ProductsRepository } from '@app/products/domain/products-repository'
import { FakeProductsRepository } from '@app/products/application/fake-products-repository'

import '@app/products/application/controllers/v1/create-product-controller'

export const productsModule = new ContainerModule((bind) => {
  bind<CreateProductCommand>(CreateProductCommand).toSelf()
  bind<ProductsRepository>(ProductsRepository).to(FakeProductsRepository)
})
