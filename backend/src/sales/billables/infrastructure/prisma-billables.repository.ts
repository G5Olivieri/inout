import { PrismaClient } from '.prisma/client'
import { Optional } from '@app/lib/optional/optional'
import { UUID } from '@app/lib/uuid/uuid'
import { Billable } from '@app/sales/billables/domain/billable'
import {
  BillablesRepository,
  SaveListener,
} from '@app/sales/billables/domain/billables.repository'
import { GetAllBillablesFilter } from '@app/sales/billables/domain/get-all-billables.filter'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime'
import Decimal from 'decimal.js-light'
import { inject, injectable } from 'inversify'

@injectable()
export class PrismaBillablesRepository implements BillablesRepository {
  public constructor(
    @inject(PrismaClient)
    private readonly prisma: PrismaClient
  ) {}

  public async save(billable: Billable, listener: SaveListener): Promise<void> {
    try {
      await this.prisma.billable.create({
        data: {
          id: billable.id.toString(),
          name: billable.name,
          amount: billable.amount.toString(),
          products: {
            connect: billable.products.map((productId) => ({
              id: productId.toString(),
            })),
          },
        },
      })
      return listener.onSuccess(billable)
    } catch (error) {
      if (!(error instanceof PrismaClientKnownRequestError)) {
        throw error
      }
      // see https://www.prisma.io/docs/reference/api-reference/error-reference
      if (error.code === 'P2025') {
        return listener.onProductNotFound(billable)
      }
      throw error
    }
  }

  public async getAll({
    limit = 100,
    offset = 0,
  }: GetAllBillablesFilter): Promise<Billable[]> {
    const results = await this.prisma.billable.findMany({
      skip: offset,
      take: limit,
      select: {
        id: true,
        name: true,
        amount: true,
        products: {
          select: {
            id: true,
          },
        },
      },
    })

    return results.map(
      (result) =>
        new Billable(
          UUID.fromString(result.id),
          result.products.map((product) => UUID.fromString(product.id)),
          result.name,
          new Decimal(result.amount)
        )
    )
  }

  public async findById(id: UUID): Promise<Optional<Billable>> {
    const result = await this.prisma.billable.findFirst({
      select: {
        id: true,
        name: true,
        amount: true,
        products: {
          select: {
            id: true,
          },
        },
      },
      where: {
        id: id.toString(),
      },
    })

    return Optional.ofNullable(result).map(
      (billable) =>
        new Billable(
          UUID.fromString(billable.id),
          billable.products.map((product) => UUID.fromString(product.id)),
          billable.name,
          new Decimal(billable.amount)
        )
    )
  }
}
