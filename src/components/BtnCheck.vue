<script setup lang="ts">
import { useStore } from '@/useStore'
import AppButton from './AppButton.vue'
import { numFormatter } from '@/utils/numFormatter'
import { useDebounceFn } from '@vueuse/core'

const { disabled = false } = defineProps<{ disabled?: boolean }>()
const { state, stepValue } = useStore()

function checkProgress() {
  let result = state.lensesCurrDays + stepValue.value
  result = parseFloat(numFormatter.format(result))
  if (result > state.lensesTotalDays!) result = state.lensesTotalDays!

  state.lensesCurrDays = result
}

const check = useDebounceFn(checkProgress, 500)
</script>

<template>
  <AppButton :disabled @click="check" class="shadow-glow button-hover group" size="lg">
    <div class="flex items-center gap-2">
      <svg
        class="w-5 h-5 transition-transform duration-200 group-hover:scale-110"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <polyline points="20,6 9,17 4,12" />
      </svg>
      <span class="font-medium">Check Progress</span>
    </div>
  </AppButton>
</template>
