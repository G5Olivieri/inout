import { ContainerModule } from 'inversify'

import { CreateBillableCommand } from '@app/catalog/application/create-billable.command'
import { GetAllBillablesQuery } from '@app/catalog/application/get-all-billables.query'
import { GetBillableByIdQuery } from '@app/catalog/application/get-billable-by-id.query'
import { PrismaBillablesRepository } from '@app/catalog/infrastructure/prisma-billables.repository'
import { BillablesRepository } from '@app/catalog/domain/billables.repository'

// declare @controller's metadata
import '@app/catalog/application/controllers/v1/create-billable.controller'
import '@app/catalog/application/controllers/v1/get-all-billables.controller'
import '@app/catalog/application/controllers/v1/get-billable-by-id.controller'

export const catalogModule = new ContainerModule((bind) => {
  bind<CreateBillableCommand>(CreateBillableCommand).toSelf()
  bind<GetAllBillablesQuery>(GetAllBillablesQuery).toSelf()
  bind<GetBillableByIdQuery>(GetBillableByIdQuery).toSelf()
  bind<BillablesRepository>(BillablesRepository).to(PrismaBillablesRepository)
})
