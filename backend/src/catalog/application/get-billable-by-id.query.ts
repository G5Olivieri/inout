import { Query } from '@app/common/query'
import { Optional } from '@app/lib/optional/optional'
import { UUID } from '@app/lib/uuid/uuid'
import { Billable } from '@app/catalog/domain/billable'
import { BillablesRepository } from '@app/catalog/domain/billables.repository'
import { inject, injectable } from 'inversify'

@injectable()
export class GetBillableByIdQuery implements Query<Optional<Billable>> {
  public constructor(
    @inject(BillablesRepository)
    private readonly repository: BillablesRepository
  ) {}

  public async execute(id: UUID): Promise<Optional<Billable>> {
    return this.repository.findById(id)
  }
}
