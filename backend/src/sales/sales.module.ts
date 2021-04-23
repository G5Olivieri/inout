import { ContainerModule } from 'inversify'

import { CreateBillableCommand } from '@app/sales/billables/application/create-billable.command'
import { GetAllBillablesQuery } from '@app/sales/billables/application/get-all-billables.query'
import { GetBillableByIdQuery } from '@app/sales/billables/application/get-billable-by-id.query'
import { PrismaBillablesRepository } from '@app/sales/billables/infrastructure/prisma-billables.repository'
import { BillablesRepository } from '@app/sales/billables/domain/billables.repository'

// declare @controller's metadata
import '@app/sales/billables/application/controllers/v1/create-billable.controller'
import '@app/sales/billables/application/controllers/v1/get-all-billables.controller'
import '@app/sales/billables/application/controllers/v1/get-billable-by-id.controller'

export const salesModule = new ContainerModule((bind) => {
  bind<CreateBillableCommand>(CreateBillableCommand).toSelf()
  bind<GetAllBillablesQuery>(GetAllBillablesQuery).toSelf()
  bind<GetBillableByIdQuery>(GetBillableByIdQuery).toSelf()
  bind<BillablesRepository>(BillablesRepository).to(PrismaBillablesRepository)
})
