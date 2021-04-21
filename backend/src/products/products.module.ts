import { ContainerModule } from 'inversify'

import { PrismaProductsRepository } from '@app/products/infrastructure/prisma-products.repository'
import { ProductsRepository } from '@app/products/domain/products.repository'
import { CreateProductCommand } from '@app/products/application/create-product.command'
import { GetAllProductsQuery } from '@app/products/application/get-all-products.query'

// declare @controller's metadata
import '@app/products/application/controllers/v1/create-product.controller'
import '@app/products/application/controllers/v1/get-all-products.controller'

export const productsModule = new ContainerModule((bind) => {
  bind<CreateProductCommand>(CreateProductCommand).toSelf()
  bind<GetAllProductsQuery>(GetAllProductsQuery).toSelf()
  bind<ProductsRepository>(ProductsRepository).to(PrismaProductsRepository)
})
