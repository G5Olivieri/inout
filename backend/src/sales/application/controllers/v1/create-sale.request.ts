import { Decimal } from 'decimal.js-light'
import * as z from 'zod'

const productSchema = z.object({
  id: z.string().uuid(),
  quantity: z.number().int().min(1),
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

export const createSaleSchema = z.object({
  timestamp: z.string().refine((check) => {
    try {
      new Date(check)
      return true
    } catch {
      return false
    }
  }),
  products: z.array(productSchema),
})

export type CreateSaleRequest = z.infer<typeof createSaleSchema>
