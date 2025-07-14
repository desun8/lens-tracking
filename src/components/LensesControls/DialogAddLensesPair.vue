<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from 'vue'
import AppDialog from '../AppDialog.vue'
import AppInput from '../AppInput.vue'
import { useStore } from '@/useStore'

const { state } = useStore()
const dialogRef = useTemplateRef<InstanceType<typeof AppDialog>>('dialog')

const isOpen = ref(false)
const dialogOpen = computed(() => dialogRef.value?.isOpen)

const totalDays = ref(0)
const errorMsg = ref('')

function validateTotalDays() {
  if (totalDays.value < 0) totalDays.value = 0

  if (totalDays.value <= 0) {
    errorMsg.value = 'Value must be greater than 0'
  } else if (totalDays.value > 365) {
    errorMsg.value = 'Maximum 365 days allowed'
  } else {
    errorMsg.value = ''
  }
}

watch(totalDays, validateTotalDays)

watch(isOpen, () => {
  if (!dialogRef.value) return
  dialogRef.value.isOpen = isOpen.value
})

watch(dialogOpen, () => {
  if (dialogOpen.value === false && isOpen.value) isOpen.value = false
})

function setTotalDays() {
  validateTotalDays()
  if (errorMsg.value) return

  state.lensesTotalDays = totalDays.value
  state.lensesCurrDays = 0 // Reset current days when adding a new pair
  isOpen.value = false
}

defineExpose({
  isOpen,
})
</script>

<template>
  <AppDialog ref="dialog" @apply="setTotalDays">
    <template #title>Add New Pair</template>
    <template #ok-label>Add</template>

    <div class="space-y-4">
      <div class="text-sm text-slate-600 dark:text-slate-400">
        Enter the recommended wear duration for your new contact lenses:
      </div>
      <AppInput
        v-model="totalDays"
        type="number"
        :error-msg="errorMsg"
        placeholder="e.g., 30"
      >
        <template #label>Lens Duration (days)</template>
      </AppInput>
    </div>
  </AppDialog>
</template>
