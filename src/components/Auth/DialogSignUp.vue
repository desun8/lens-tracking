<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from 'vue'
import AppDialog from '../AppDialog.vue'
import AppInput from '../AppInput.vue'
import AppErrorMessage from '../AppErrorMessage.vue'
import { useAuth } from '@/useAuth'

const dialogRef = useTemplateRef<InstanceType<typeof AppDialog>>('dialog')

const isOpen = ref(false)
const dialogOpen = computed(() => dialogRef.value?.isOpen)

watch(isOpen, () => {
  if (!dialogRef.value) return
  dialogRef.value.isOpen = isOpen.value

  // Clear form when dialog is closed
  if (!isOpen.value) {
    // Force clear form after a short delay to ensure dialog is closed
    setTimeout(() => {
      email.value = ''
      password.value = ''
      repeatPassword.value = ''
      errorMessage.value = ''
      isLoading.value = false
    }, 100)
  }
})

watch(dialogOpen, () => {
  if (dialogOpen.value === false && isOpen.value) {
    isOpen.value = false
  }
})

const auth = useAuth()
const email = ref('')
const password = ref('')
const repeatPassword = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

// Clear error when user starts typing
watch([email, password, repeatPassword], () => {
  if (errorMessage.value) {
    errorMessage.value = ''
  }
})

const isPasswordsEqual = computed(
  () => password.value === repeatPassword.value && password.value.length,
)

const passwordError = computed(() => {
  if (!repeatPassword.value) return ''
  if (password.value !== repeatPassword.value) {
    return 'Passwords do not match'
  }
  return ''
})

async function signUp() {
  if (isLoading.value) return

  if (!email.value.trim()) {
    errorMessage.value = 'Please enter your email address'
    return
  }

  if (!password.value.trim()) {
    errorMessage.value = 'Please enter a password'
    return
  }

  if (password.value.length < 6) {
    errorMessage.value = 'Password must be at least 6 characters long'
    return
  }

  if (!isPasswordsEqual.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const error = await auth.signUp(email.value, password.value)
    if (error) {
      if (error.message.includes('already registered') || error.message.includes('User already registered')) {
        errorMessage.value = 'This email is already registered. Please use a different email or try signing in.'
      } else if (error.message.includes('Invalid email')) {
        errorMessage.value = 'Please enter a valid email address'
      } else if (error.message.includes('Password')) {
        errorMessage.value = 'Password must be at least 6 characters long'
      } else {
        errorMessage.value = error.message || 'An error occurred during sign up. Please try again.'
      }
      return
    }

    isOpen.value = false
  } finally {
    isLoading.value = false
  }
}

function clearForm() {
  // Only clear if not currently loading to avoid interrupting requests
  if (!isLoading.value) {
    email.value = ''
    password.value = ''
    repeatPassword.value = ''
    errorMessage.value = ''
  }
}

defineExpose({
  isOpen,
  clearForm,
})
</script>

<template>
  <AppDialog ref="dialog" @apply="signUp" @cancel="clearForm" :disabled="isLoading">
    <template #title>
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="8.5" cy="7" r="4"/>
          <line x1="20" y1="8" x2="20" y2="14"/>
          <line x1="23" y1="11" x2="17" y2="11"/>
        </svg>
        Sign up
      </div>
    </template>
    <template #ok-label>
      <div class="flex items-center gap-2">
        <svg v-if="isLoading" class="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12a9 9 0 11-6.219-8.56"/>
        </svg>
        {{ isLoading ? 'Creating account...' : 'Sign up' }}
      </div>
    </template>

    <div class="space-y-4">
      <div class="text-sm text-slate-600 dark:text-slate-400">
        Create a new account to sync your lens data across devices.
      </div>

      <AppErrorMessage :message="errorMessage" />

      <AppInput v-model="email" type="email" placeholder="Enter your email" :disabled="isLoading">
        <template #label>Email</template>
      </AppInput>
      <AppInput v-model="password" type="password" placeholder="Create a password" :disabled="isLoading">
        <template #label>Password</template>
      </AppInput>
      <AppInput v-model="repeatPassword" type="password" placeholder="Confirm your password" :error-msg="passwordError" :disabled="isLoading">
        <template #label>Repeat Password</template>
      </AppInput>
    </div>
  </AppDialog>
</template>
