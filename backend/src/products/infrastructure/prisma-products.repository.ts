import { PrismaClient } from '.prisma/client'
import { UUID } from '@app/lib/uuid/uuid'
import { GetAllProductsFilter } from '@app/products/domain/get-all-products.filter'
import { Pagination } from '@app/common/pagination'
import { Product } from '@app/products/domain/product'
import {
  ProductsRepository,
  SaveListener,
} from '@app/products/domain/products.repository'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import { inject, injectable } from 'inversify'

@injectable()
export class PrismaProductsRepository implements ProductsRepository {
  public constructor(
    @inject(PrismaClient) private readonly prisma: PrismaClient
  ) {}

  public async save(product: Product, listener: SaveListener): Promise<void> {
    try {
      await this.prisma.product.create({
        data: {
          id: product.id.toString(),
          name: product.name,
          tags: Array.from(product.tags).join(';'),
        },
      })

      return listener.onSuccess(product)
    } catch (error) {
      if (!(error instanceof PrismaClientKnownRequestError)) {
        throw error
      }
      // see https://www.prisma.io/docs/reference/api-reference/error-reference
      if (error.code === 'P2002') {
        return listener.onConflicted(product)
      }
      throw error
    }
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
      results.map(
        (result) =>
          new Product(
            UUID.fromString(result.id),
            result.name,
            new Set(result.tags.split(';'))
          )
      )
    )
  }
}
