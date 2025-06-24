import { AuthError, createClient } from '@supabase/supabase-js'
import Cookies from 'universal-cookie'
import { computed, reactive, watch, type ComputedRef } from 'vue'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) throw Error('Doesnt pass supabase data')

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const cookies = new Cookies(null, { path: '/' })

const ACCESS_TOKEN_COOKIE_KEY = 'auth_access_token'
const REFRESH_TOKEN_COOKIE_KEY = 'auth_refresh_token'

type State = {
  access_token: string
  refresh_token: string
}
const state = reactive<State>({
  access_token: cookies.get(ACCESS_TOKEN_COOKIE_KEY),
  refresh_token: cookies.get(REFRESH_TOKEN_COOKIE_KEY),
})

watch(state, () => {
  cookies.set(ACCESS_TOKEN_COOKIE_KEY, state.access_token)
  cookies.set(REFRESH_TOKEN_COOKIE_KEY, state.refresh_token)
})

const isAuth = computed(() => !!state.access_token)

async function signUp(email: string, password: string) {
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
  console.log('User registered successfully:', data)
}

async function signIn(email: string, password: string) {
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
  console.log('User signed in successfully:', data)
}

// Sign Out: Log out the current user
async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error during sign out:', error)
    return
  }

  state.access_token = ''
  state.refresh_token = ''
  console.log('User signed out successfully')
}

type Auth = {
  state: State
  isAuth: ComputedRef<boolean>
  signUp: (a: string, b: string) => Promise<AuthError | void>
  signIn: (a: string, b: string) => Promise<AuthError | void>
  signOut: () => void
}

export function useAuth(): Auth {
  return {
    state: state,
    isAuth,
    signUp,
    signIn,
    signOut,
  }
}
