import { useContext } from 'react'
import { InternacionalizationContext } from '@app/ui/internacionalizations/internacionalization-context'
import { Internacionalization } from '@app/ui/internacionalizations/internacionalization'

export const useInternacionalization = (): Internacionalization =>
  useContext(InternacionalizationContext)
