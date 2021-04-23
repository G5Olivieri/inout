import { Query } from '@app/common/query'
import { Sale } from '@app/sales/domain/sale'
import { SalesRepository } from '@app/sales/domain/sales.repository'
import { GetAllSalesFilter } from '@app/sales/domain/get-all-sales.filter'
import { inject, injectable } from 'inversify'

@injectable()
export class GetAllSalesQuery implements Query<Sale[]> {
  public constructor(
    @inject(SalesRepository)
    private readonly repository: SalesRepository
  ) {}

  public async execute(filter: GetAllSalesFilter): Promise<Sale[]> {
    return this.repository.getAll(filter)
  }
}
