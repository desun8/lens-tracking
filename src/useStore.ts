import { useStorage } from '@vueuse/core'
import { reactive, computed, watch, ref } from 'vue'
import type { Store } from './types/Store'
import type { UsersTableItem } from './types/UsersTableItem'
import { useAuth } from './useAuth'

export const LensesWearSteps = {
  DAY: 'day',
  HALF_DAY: 'halfDay',
  TWO_HOURS: '2hours',
} as const

export type StoreType = {
  lensesTotalDays: number | null
  lensesCurrDays: number
  step: (typeof LensesWearSteps)[keyof typeof LensesWearSteps]
  uuid: string
  timestamp: number
}

const defaultState = {
  lensesTotalDays: null,
  lensesCurrDays: 0,
  step: LensesWearSteps.DAY,
  uuid: crypto.randomUUID(),
  timestamp: Date.now(),
}

const localState = useStorage<Store>('lensestrack-state', { ...defaultState })

const state = reactive<StoreType>(localState.value)

// Только для внутреннего использования
const lastSyncTime = ref<number | null>(null)

function resetState() {
  Object.assign(state, {
    ...defaultState,
    uuid: crypto.randomUUID(),
    timestamp: Date.now(),
  })
}

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

function mergeUserData(cloudData: UsersTableItem) {
  const localData = state
  if (!cloudData) return

  // Если UUID не совпадают - полностью перезаписываем данные из облака
  if (cloudData.uuid !== localData.uuid) {
    console.log('UUID mismatch - overwriting with cloud data')
    Object.assign(state, {
      lensesTotalDays: cloudData.lenses_total_days,
      lensesCurrDays: cloudData.lenses_current_days,
      step: cloudData.options_step,
      uuid: cloudData.uuid,
      timestamp: cloudData.timestamp,
    })
    return
  }

  if (cloudData.timestamp > localData.timestamp) {
    console.log('Cloud data is newer - syncing from cloud')
    Object.assign(state, {
      lensesTotalDays: cloudData.lenses_total_days,
      lensesCurrDays: cloudData.lenses_current_days,
      step: cloudData.options_step,
      uuid: cloudData.uuid,
      timestamp: cloudData.timestamp,
    })
  } else {
    console.log('Local data is up to date')
  }
}

async function backgroundSync() {
  const { isAuth, loadUserData } = useAuth()

  if (!isAuth.value) {
    return
  }

  try {
    const cloudData = await loadUserData()
    if (cloudData) {
      mergeUserData(cloudData)
    }
    lastSyncTime.value = Date.now()
  } catch (error) {
    console.error('Background sync failed:', error)
  }
}

export const useStore = () => {
  const { isAuth, saveUserData } = useAuth()

  watch(state, async () => {
    localState.value = { ...state, timestamp: Date.now() }

    // Auto-sync to cloud if user is authenticated
    if (isAuth.value) {
      try {
        await saveUserData(localState.value)
        lastSyncTime.value = Date.now()
      } catch (error) {
        console.error('Auto-sync failed:', error)
      }
    }
  })

  // Таймер автосинхронизации каждые 5 минут
  let syncInterval: ReturnType<typeof setInterval> | null = null

  watch(
    isAuth,
    (authenticated) => {
      if (authenticated) {
        syncInterval = setInterval(
          () => {
            if (isAuth.value) {
              backgroundSync()
            }
          },
          5 * 60 * 1000,
        ) // 5 min
      } else {
        if (syncInterval) {
          clearInterval(syncInterval)
          syncInterval = null
        }
      }
    },
    { immediate: true },
  )

  return {
    state,
    stepValue,
    hasLensesPair,
    mergeUserData,
    resetState,
  }
}
