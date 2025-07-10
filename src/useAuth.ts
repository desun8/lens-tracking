import { AuthError, createClient } from '@supabase/supabase-js'
import Cookies from 'universal-cookie'
import { computed, reactive, watch, type ComputedRef } from 'vue'
import type { Store } from './types/Store'
import type { UsersTableItem } from './types/UsersTableItem'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) throw Error('Doesnt pass supabase data')

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const cookies = new Cookies(null, { path: '/' })

const ACCESS_TOKEN_COOKIE_KEY = 'auth_access_token'
const REFRESH_TOKEN_COOKIE_KEY = 'auth_refresh_token'
const USER_ID_COOKIE_KEY = 'auth_id'

type State = {
  access_token: string
  refresh_token: string
  id: string
}
const state = reactive<State>({
  id: cookies.get(USER_ID_COOKIE_KEY),
  access_token: cookies.get(ACCESS_TOKEN_COOKIE_KEY),
  refresh_token: cookies.get(REFRESH_TOKEN_COOKIE_KEY),
})

watch(state, () => {
  cookies.set(ACCESS_TOKEN_COOKIE_KEY, state.access_token)
  cookies.set(REFRESH_TOKEN_COOKIE_KEY, state.refresh_token)
  cookies.set(USER_ID_COOKIE_KEY, state.id)
})

const isAuth = computed(() => !!state.access_token)

async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    if (error) {
      console.error('Error during sign up:', error)
      return error
    }

    state.access_token = data.session?.access_token ?? ''
    state.refresh_token = data.session?.refresh_token ?? ''
    state.id = data.session?.user.id ?? ''
    console.log('User registered successfully:', data)
  } catch (error) {
    console.error('Network error during sign up:', error)
    return { message: 'Network error. Please check your connection and try again.' }
  }
}

async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) {
      console.error('Error during sign in:', error)
      return error
    }

    state.access_token = data.session?.access_token ?? ''
    state.refresh_token = data.session?.refresh_token ?? ''
    state.id = data.session?.user.id ?? ''
    console.log('User signed in successfully:', data)
  } catch (error) {
    console.error('Network error during sign in:', error)
    return { message: 'Network error. Please check your connection and try again.' }
  }
}

async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error during sign out:', error)
    return
  }

  state.access_token = ''
  state.refresh_token = ''
  state.id = ''
  console.log('User signed out successfully')
}

async function saveUserData(userData: Store) {
  try {
    // Upsert данные в таблицу Users (обновить или вставить)
    const { data, error } = await supabase.from('Users').upsert([
      {
        id: state.id,
        uuid: userData.uuid,
        timestamp: userData.timestamp,
        lenses_total_days: userData.lensesTotalDays,
        lenses_current_days: userData.lensesCurrDays,
        options_step: userData.step,
      },
    ])

    // Проверяем на наличие ошибок
    if (error) {
      throw error
    }

    console.log('Данные успешно сохранены:', data)
  } catch (error) {
    console.error('Ошибка при сохранении данных:', error)
  }
}

async function loadUserData() {
  try {
    // Получаем данные пользователя
    const { data, error } = await supabase
      .from('Users')
      .select('*')
      .eq('id', state.id)
      .maybeSingle<UsersTableItem>()

    // Проверяем на наличие ошибок
    if (error) {
      throw error
    }

    console.log('Данные пользователя:', data)
    return data
  } catch (error) {
    console.error('Ошибка при получении данных:', error)
    return null // Возвращаем null - пользователь продолжит с локальными данными
  }
}

type Auth = {
  state: State
  isAuth: ComputedRef<boolean>
  signUp: (a: string, b: string) => Promise<AuthError | { message: string } | void>
  signIn: (a: string, b: string) => Promise<AuthError | { message: string } | void>
  signOut: () => void
  saveUserData: (a: Store) => void
  loadUserData: () => Promise<UsersTableItem | null | undefined>
}

export function useAuth(): Auth {
  return {
    state: state,
    isAuth,
    signUp,
    signIn,
    signOut,
    saveUserData,
    loadUserData,
  }
}
