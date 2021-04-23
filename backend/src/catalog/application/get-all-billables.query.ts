import { Query } from '@app/common/query'
import { Billable } from '@app/catalog/domain/billable'
import { BillablesRepository } from '@app/catalog/domain/billables.repository'
import { GetAllBillablesFilter } from '@app/catalog/domain/get-all-billables.filter'
import { inject, injectable } from 'inversify'

@injectable()
export class GetAllBillablesQuery implements Query<Billable[]> {
  public constructor(
    @inject(BillablesRepository)
    private readonly repository: BillablesRepository
  ) {}

  public async execute(filter: GetAllBillablesFilter): Promise<Billable[]> {
    return this.repository.getAll(filter)
  }
}
