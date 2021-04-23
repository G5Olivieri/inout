import { ContainerModule } from 'inversify'

import { CreateSaleCommand } from '@app/sales/application/create-sale.command'
import { GetAllSalesQuery } from '@app/sales/application/get-all-sales.query'
import { GetSaleByIdQuery } from '@app/sales/application/get-sale-by-id.query'
import { SalesRepository } from '@app/sales/domain/sales.repository'
import { PrismaSalesRepository } from '@app/sales/infrastructure/prisma-sales.repository'

// declare @controller's metadata
import '@app/sales/application/controllers/v1/create-sale.controller'
import '@app/sales/application/controllers/v1/get-all-sales.controller'
import '@app/sales/application/controllers/v1/get-sale-by-id.controller'

export const salesModule = new ContainerModule((bind) => {
  bind<CreateSaleCommand>(CreateSaleCommand).toSelf()
  bind<GetAllSalesQuery>(GetAllSalesQuery).toSelf()
  bind<GetSaleByIdQuery>(GetSaleByIdQuery).toSelf()
  bind<SalesRepository>(SalesRepository).to(PrismaSalesRepository)
})
