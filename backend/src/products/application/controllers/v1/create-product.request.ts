import * as z from 'zod'

export const createProductSchema = z.object({
  name: z.string(),
  tags: z.array(z.string()),
})

export type CreateProductRequest = z.infer<typeof createProductSchema>
