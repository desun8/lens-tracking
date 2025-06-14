<script setup lang="ts">
import { computed, ref, useTemplateRef, watch } from 'vue'
import { LensesWearSteps, useStore } from '../../useStore'
import AppDialog from '../AppDialog.vue'
import AppSelect from '../AppSelect.vue'

const { state } = useStore()
const dialogRef = useTemplateRef<InstanceType<typeof AppDialog>>('dialog')

const isOpen = ref(false)
const dialogOpen = computed(() => dialogRef.value?.isOpen)

watch(isOpen, () => {
  if (!dialogRef.value) return
  dialogRef.value.isOpen = isOpen.value

  if (!isOpen.value) duration.value = state.step
})

watch(dialogOpen, () => {
  if (dialogOpen.value === false && isOpen.value) isOpen.value = false
})

const duration = ref(state.step)
function saveChanges() {
  state.step = duration.value
  isOpen.value = false
}

const durationVariants: {
  value: (typeof LensesWearSteps)[keyof typeof LensesWearSteps]
  label: string
}[] = [
  { value: 'day', label: 'Day' },
  { value: 'halfDay', label: 'Half day' },
  { value: '2hours', label: '2 hours' },
]

defineExpose({
  isOpen,
})
</script>

<template>
  <AppDialog ref="dialog" @apply="saveChanges">
    <template #title>Settings</template>
    <template #ok-label>Save</template>

    <div>
      <AppSelect v-model="duration" :items="durationVariants">Set leneses wear duration</AppSelect>
    </div>
  </AppDialog>
</template>
