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
const hasError = ref(false)
watch(totalDays, () => {
  if (totalDays.value < 0) totalDays.value = 0
  if (hasError.value && totalDays.value > 0) hasError.value = false
})

watch(isOpen, () => {
  if (!dialogRef.value) return
  dialogRef.value.isOpen = isOpen.value
})

watch(dialogOpen, () => {
  if (dialogOpen.value === false && isOpen.value) isOpen.value = false
})

function setTotalDays() {
  hasError.value = totalDays.value <= 0
  if (hasError.value) return

  state.lensesTotalDays = totalDays.value
  isOpen.value = false
}

defineExpose({
  isOpen,
})
</script>

<template>
  <AppDialog ref="dialog" @apply="setTotalDays">
    <template #title>Add new lenses pair</template>
    <template #ok-label>Add</template>

    <div>
      <AppInput
        v-model="totalDays"
        type="number"
        :error-msg="hasError ? 'Value can\'t be lesser then 1' : ''"
        ><template #label>Lenses durations:</template></AppInput
      >
    </div>
  </AppDialog>
</template>
