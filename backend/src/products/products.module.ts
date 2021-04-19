import { ContainerModule } from 'inversify'

import { Mapper } from '@app/common/mapper'
import { PrismaProductsRepository } from '@app/products/application/prisma-products-repository'
import { ProductsRepository } from '@app/products/domain/products-repository'
import { CreateProductCommand } from '@app/products/domain/create-product-command'
import { GetAllProductsCommand } from '@app/products/domain/get-all-products-command'

// declare @controller's metadata
import '@app/products/application/controllers/v1/create-product-controller'
import '@app/products/application/controllers/v1/get-all-products-controller'
import { CreateProductRequest } from '@app/products/application/controllers/v1/create-product-request'
import { CreateProductMapper } from '@app/products/application/controllers/v1/create-product-mapper'
import { Product } from '@app/products/domain/product'

export const productsModule = new ContainerModule((bind) => {
  bind<Mapper<CreateProductRequest, Product>>(CreateProductMapper).toSelf()
  bind<CreateProductCommand>(CreateProductCommand).toSelf()
  bind<GetAllProductsCommand>(GetAllProductsCommand).toSelf()
  bind<ProductsRepository>(ProductsRepository).to(PrismaProductsRepository)
})
