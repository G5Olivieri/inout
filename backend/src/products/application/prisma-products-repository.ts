import { PrismaClient } from '.prisma/client'
import { Product } from '@app/products/domain/product'
import { ProductsRepository } from '@app/products/domain/products-repository'
import { inject, injectable } from 'inversify'

@injectable()
export class PrismaProductsRepository implements ProductsRepository {
  public constructor(
    @inject(PrismaClient) private readonly prisma: PrismaClient
  ) {}

  public async save(product: Product): Promise<Product> {
    const result = await this.prisma.product.create({
      data: {
        name: product.name,
      },
    })
    return new Product(result.name, result.id)
  }
}
