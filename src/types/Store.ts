import { LENSES_WEAR_STEPS } from '../const/LENSES_WEAR_STEPS'

export type Store = {
  lensesTotalDays: number | null
  lensesCurrDays: number
  step: (typeof LENSES_WEAR_STEPS)[keyof typeof LENSES_WEAR_STEPS]
  uuid: string
  timestamp: number
}
