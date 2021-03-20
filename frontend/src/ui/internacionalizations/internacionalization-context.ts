import { createContext } from 'react'
import { DefaultInternacionalization } from '@app/ui/internacionalizations/default-internacionalization'

export const InternacionalizationContext = createContext(
  new DefaultInternacionalization()
)
