<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from 'vue'
import AppDialog from '../AppDialog.vue'
import AppInput from '../AppInput.vue'
import AppErrorMessage from '../AppErrorMessage.vue'
import { useAuth } from '@/useAuth'
import { useStore } from '@/useStore'

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

const { mergeUserData } = useStore()

const auth = useAuth()
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

// Clear error when user starts typing
watch([email, password], () => {
  if (errorMessage.value) {
    errorMessage.value = ''
  }
})

async function signIn() {
  if (isLoading.value) return

  if (!email.value.trim()) {
    errorMessage.value = 'Please enter your email address'
    return
  }

  if (!password.value.trim()) {
    errorMessage.value = 'Please enter your password'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const error = await auth.signIn(email.value, password.value)
    if (error) {
      // Handle different error types
      if (error.message.includes('Invalid login credentials')) {
        errorMessage.value =
          'Invalid email or password. Please check your credentials and try again.'
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage.value =
          'Please check your email and click the confirmation link before signing in.'
      } else if (error.message.includes('Too many requests')) {
        errorMessage.value = 'Too many login attempts. Please wait a moment before trying again.'
      } else {
        errorMessage.value = error.message || 'An error occurred during sign in. Please try again.'
      }
      return
    }

    const userData = await auth.loadUserData()
    if (userData) mergeUserData(userData)

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
    errorMessage.value = ''
  }
}

defineExpose({
  isOpen,
  clearForm,
})
</script>

<template>
  <AppDialog ref="dialog" @apply="signIn" @cancel="clearForm" :disabled="isLoading">
    <template #title>
      <div class="flex items-center gap-2">
        <svg
          class="w-5 h-5 text-primary"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <polyline points="10,17 15,12 10,7" />
          <line x1="15" y1="12" x2="3" y2="12" />
        </svg>
        Sign in
      </div>
    </template>
    <template #ok-label>
      <div class="flex items-center gap-2">
        <svg
          v-if="isLoading"
          class="w-4 h-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M21 12a9 9 0 11-6.219-8.56" />
        </svg>
        {{ isLoading ? 'Signing in...' : 'Sign in' }}
      </div>
    </template>

    <div class="space-y-4">
      <div class="text-sm text-slate-600 dark:text-slate-400">
        Welcome back! Please sign in to your account.
      </div>

      <AppErrorMessage :message="errorMessage" />

      <AppInput v-model="email" type="email" placeholder="Enter your email" :disabled="isLoading">
        <template #label>Email</template>
      </AppInput>
      <AppInput
        v-model="password"
        type="password"
        placeholder="Enter your password"
        :disabled="isLoading"
      >
        <template #label>Password</template>
      </AppInput>
    </div>
  </AppDialog>
</template>
