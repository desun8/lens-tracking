import { useStorage } from '@vueuse/core'
import { reactive, computed, watch } from 'vue'

export const LensesWearSteps = {
  DAY: 'day',
  HALF_DAY: 'halfDay',
  TWO_HOURS: '2hours',
} as const

type StoreType = {
  lensesTotalDays: number | null
  lensesCurrDays: number
  step: (typeof LensesWearSteps)[keyof typeof LensesWearSteps]
}

const localState = useStorage<StoreType>('lensestrack-state', {
  lensesTotalDays: null,
  lensesCurrDays: 0,
  step: LensesWearSteps.DAY,
})

const state = reactive<StoreType>(localState.value)

watch(state, () => {
  localState.value = state
})

const stepValue = computed(() => {
  switch (state.step) {
    case LensesWearSteps.HALF_DAY:
      return 0.5
    case LensesWearSteps.TWO_HOURS:
      return 0.2
    default:
      return 1
  }
})

const hasLensesPair = computed(() => state.lensesTotalDays !== null)

export const useStore = () => {
  return {
    state,
    stepValue,
    hasLensesPair,
  }
}
