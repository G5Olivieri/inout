import { useContext } from 'react'
import { InternacionalizationContext } from '@app/internacionalizations/internacionalization-context'
import { Internacionalization } from '@app/internacionalizations/internacionalization'

export const useInternacionalization = (): Internacionalization =>
  useContext(InternacionalizationContext)
