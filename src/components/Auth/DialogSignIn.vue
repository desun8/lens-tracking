<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from 'vue'
import AppDialog from '../AppDialog.vue'
import AppInput from '../AppInput.vue'
import { useAuth } from '@/useAuth'

const dialogRef = useTemplateRef<InstanceType<typeof AppDialog>>('dialog')

const isOpen = ref(false)
const dialogOpen = computed(() => dialogRef.value?.isOpen)

watch(isOpen, () => {
  if (!dialogRef.value) return
  dialogRef.value.isOpen = isOpen.value
})

watch(dialogOpen, () => {
  if (dialogOpen.value === false && isOpen.value) isOpen.value = false
})

const auth = useAuth()
const email = ref('')
const password = ref('')

async function signIn() {
  const error = await auth.signIn(email.value, password.value)
  if (error) {
    alert(error.message)
    return
  }

  isOpen.value = false
}

defineExpose({
  isOpen,
})
</script>

<template>
  <AppDialog ref="dialog" @apply="signIn">
    <template #title>Sign in</template>
    <template #ok-label>Sign in</template>

    <div>
      <AppInput v-model="email" type="email">
        <template #label>Email</template>
      </AppInput>
      <AppInput v-model="password" type="password">
        <template #label>Password</template>
      </AppInput>
    </div>
  </AppDialog>
</template>
