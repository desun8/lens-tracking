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
  <AppButton :disabled @click="check">Check Progress</AppButton>
</template>
