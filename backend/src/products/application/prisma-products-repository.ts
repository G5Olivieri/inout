import { PrismaClient } from '.prisma/client'
import { GetAllProductsFilter } from '@app/products/domain/get-all-products-filter'
import { Pagination } from '@app/products/domain/pagination'
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

  public async getAll({
    page = 1,
    itemsPerPage = 10,
  }: GetAllProductsFilter): Promise<Pagination<Product>> {
    const results = await this.prisma.product.findMany({
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
    })

    return new Pagination(
      page,
      results.length,
      results.map((result) => new Product(result.name, result.id))
    )
  }
}
