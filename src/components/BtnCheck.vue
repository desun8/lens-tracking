<script setup lang="ts">
import { useStore } from '@/useStore'
import AppButton from './AppButton.vue'
import { numFormatter } from '@/utils/numFormatter'

const { disabled = false } = defineProps<{ disabled?: boolean }>()
const { state, stepValue } = useStore()

function check() {
  let result = state.lensesCurrDays + stepValue.value
  result = parseFloat(numFormatter.format(result))
  if (result > state.lensesTotalDays!) result = state.lensesTotalDays!

  state.lensesCurrDays = result
}
</script>

<template>
  <AppButton :disabled @click="check">Check</AppButton>
</template>
