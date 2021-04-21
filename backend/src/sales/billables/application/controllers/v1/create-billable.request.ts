import { Decimal } from '@prisma/client/runtime'
import * as z from 'zod'

export const createBillableSchema = z.object({
  name: z.string(),
  products: z.array(z.string().uuid()),
  amount: z.string().refine(
    (check) => {
      try {
        new Decimal(check)
        return true
      } catch (error) {
        return false
      }
    },
    {
      message: 'String must be decimal value',
    }
  ),
})

export type CreateBillableRequest = z.infer<typeof createBillableSchema>
