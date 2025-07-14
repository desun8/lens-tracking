<script setup lang="ts">
import AppButton from '../AppButton.vue'
import DialogSignUp from '../Auth/DialogSignUp.vue'
import DialogSignIn from '../Auth/DialogSignIn.vue'
import { useTemplateRef } from 'vue'
import { useAuth } from '@/useAuth'
import { useStore } from '@/useStore'

const { resetState } = useStore()
const { isAuth, signOut } = useAuth()

const dialogSignUpRef = useTemplateRef<InstanceType<typeof DialogSignUp>>('dialogSignUp')
const dialogSignInRef = useTemplateRef<InstanceType<typeof DialogSignIn>>('dialogSignIn')

function showSignUpDialog() {
  if (!dialogSignUpRef.value) return
  dialogSignUpRef.value.isOpen = true
}

function showSignInDialog() {
  if (!dialogSignInRef.value) return
  dialogSignInRef.value.isOpen = true
}

async function logout() {
  await signOut()
  resetState()
}
</script>

<template>
  <header class="flex items-center justify-between py-4 mb-6">
    <div class="flex items-center gap-2 sm:gap-3">
      <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-glow cursor-pointer">
        <svg class="w-4 h-4 sm:w-6 sm:h-6 text-white transition-transform duration-200 hover:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>
        </svg>
      </div>
      <h1 class="text-xl sm:text-2xl font-bold text-gradient header-title transition-all duration-200 hover:scale-105 cursor-pointer">Lens Tracking</h1>
    </div>
    
    <div class="flex items-center gap-1 sm:gap-2">
      <AppButton v-if="isAuth" variant="outline" size="sm" class="button-hover group" @click="logout">
        <div class="flex items-center gap-1">
          <svg class="w-4 h-4 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16,17 21,12 16,7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          <span class="font-medium">Logout</span>
        </div>
      </AppButton>
      <template v-else>
        <AppButton variant="ghost" size="sm" class="button-hover group" @click="showSignInDialog">
          <div class="flex items-center gap-1">
            <svg class="w-4 h-4 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10,17 15,12 10,7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            <span class="font-medium">Sign In</span>
          </div>
        </AppButton>
        <AppButton size="sm" class="button-hover group" @click="showSignUpDialog">
          <div class="flex items-center gap-1">
            <svg class="w-4 h-4 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="8.5" cy="7" r="4"/>
              <line x1="20" y1="8" x2="20" y2="14"/>
              <line x1="23" y1="11" x2="17" y2="11"/>
            </svg>
            <span class="font-medium">Sign Up</span>
          </div>
        </AppButton>
      </template>
    </div>

    <DialogSignUp ref="dialogSignUp" />
    <DialogSignIn ref="dialogSignIn" />
  </header>
</template>
