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

watch(totalDays, () => {
  if (totalDays.value < 0) totalDays.value = 0
  
  if (totalDays.value <= 0) {
    errorMsg.value = 'Value must be greater than 0'
  } else if (totalDays.value > 365) {
    errorMsg.value = 'Maximum 365 days allowed'
  } else {
    errorMsg.value = ''
  }
})

watch(isOpen, () => {
  if (!dialogRef.value) return
  dialogRef.value.isOpen = isOpen.value
})

watch(dialogOpen, () => {
  if (dialogOpen.value === false && isOpen.value) isOpen.value = false
})

function setTotalDays() {
  if (errorMsg.value) return

  state.lensesTotalDays = totalDays.value
  state.lensesCurrDays = 0 // Сбрасываем текущие дни при добавлении новой пары
  isOpen.value = false
}

defineExpose({
  isOpen,
})
</script>

<template>
  <AppDialog ref="dialog" @apply="setTotalDays">
    <template #title>Add New Lens Pair</template>
    <template #ok-label>Add</template>

    <div>
      <AppInput
        v-model="totalDays"
        type="number"
        :error-msg="errorMsg"
        ><template #label>Lens Duration (days):</template></AppInput
      >
    </div>
  </AppDialog>
</template>
