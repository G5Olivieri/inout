import { PrismaClient } from '.prisma/client'
import { Optional } from '@app/lib/optional/optional'
import { UUID } from '@app/lib/uuid/uuid'
import { Sale } from '@app/sales/domain/sale'
import {
  SalesRepository,
  SaveListener,
} from '@app/sales/domain/sales.repository'
import { GetAllSalesFilter } from '@app/sales/domain/get-all-sales.filter'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import Decimal from 'decimal.js-light'
import { inject, injectable } from 'inversify'
import { Product } from '@app/sales/domain/product'

@injectable()
export class PrismaSalesRepository implements SalesRepository {
  public constructor(
    @inject(PrismaClient)
    private readonly prisma: PrismaClient
  ) {}

  public async save(sale: Sale, listener: SaveListener): Promise<void> {
    try {
      await this.prisma.sale.create({
        data: {
          id: sale.id.toString(),
          timestamp: sale.timestamp,
          products: {
            create: sale.products.map((product) => ({
              quantity: product.quantity,
              amount: product.amount.toString(),
              product: {
                connect: {
                  id: product.id.toString(),
                },
              },
            })),
          },
        },
      })
      return listener.onSuccess(sale)
    } catch (error) {
      if (!(error instanceof PrismaClientKnownRequestError)) {
        throw error
      }
      // see https://www.prisma.io/docs/reference/api-reference/error-reference
      if (error.code === 'P2025') {
        return listener.onProductNotFound(sale)
      }
      throw error
    }
  }

  public async getAll({
    limit = 100,
    offset = 0,
  }: GetAllSalesFilter): Promise<Sale[]> {
    const results = await this.prisma.sale.findMany({
      skip: offset,
      take: limit,
      select: {
        id: true,
        timestamp: true,
        products: {
          select: {
            productId: true,
            amount: true,
            quantity: true,
          },
        },
      },
    })

    return results.map(
      (result) =>
        new Sale(
          UUID.fromString(result.id),
          result.timestamp,
          result.products.map(
            (product) =>
              new Product(
                UUID.fromString(product.productId),
                product.quantity,
                new Decimal(product.amount)
              )
          )
        )
    )
  }

  public async findById(id: UUID): Promise<Optional<Sale>> {
    const result = await this.prisma.sale.findFirst({
      select: {
        id: true,
        timestamp: true,
        products: {
          select: {
            productId: true,
            amount: true,
            quantity: true,
          },
        },
      },
      where: {
        id: id.toString(),
      },
    })

    return Optional.ofNullable(result).map(
      (sale) =>
        new Sale(
          UUID.fromString(sale.id),
          sale.timestamp,
          sale.products.map(
            (product) =>
              new Product(
                UUID.fromString(product.productId),
                product.quantity,
                new Decimal(product.amount)
              )
          )
        )
    )
  }
}
