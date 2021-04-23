import { Query } from '@app/common/query'
import { Optional } from '@app/lib/optional/optional'
import { UUID } from '@app/lib/uuid/uuid'
import { Sale } from '@app/sales/domain/sale'
import { SalesRepository } from '@app/sales/domain/sales.repository'
import { inject, injectable } from 'inversify'

@injectable()
export class GetSaleByIdQuery implements Query<Optional<Sale>> {
  public constructor(
    @inject(SalesRepository)
    private readonly repository: SalesRepository
  ) {}

  public async execute(id: UUID): Promise<Optional<Sale>> {
    return this.repository.findById(id)
  }
}
