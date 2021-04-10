import z from 'zod'

export const createProductSchema = z.object({
  name: z.string(),
})

export type CreateProductRequest = z.infer<typeof createProductSchema>
