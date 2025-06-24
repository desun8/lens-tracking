<script setup lang="ts">
import AppButton from '../AppButton.vue'
import DialogSignUp from '../Auth/DialogSignUp.vue'
import DialogSignIn from '../Auth/DialogSignIn.vue'
import { useTemplateRef } from 'vue'
import { useAuth } from '@/useAuth'

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
</script>

<template>
  <header class="flex items-center">
    <h1>Lens Tracking</h1>
    <AppButton v-if="isAuth" class="ml-auto" @click="signOut">Logout</AppButton>

    <template v-else>
      <AppButton class="ml-auto" variant="text" @click="showSignInDialog">Sign In</AppButton>
      <AppButton variant="text" @click="showSignUpDialog">Sign Up</AppButton>
    </template>

    <DialogSignUp ref="dialogSignUp" />
    <DialogSignIn ref="dialogSignIn" />
  </header>
</template>
