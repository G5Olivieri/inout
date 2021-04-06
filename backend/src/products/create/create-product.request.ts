import { t } from '@marblejs/middleware-io'

export const CreateProductRequest = t.type({
  name: t.string,
})

export type CreateProductRequest = t.TypeOf<typeof CreateProductRequest>
