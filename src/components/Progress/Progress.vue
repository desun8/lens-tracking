<script setup lang="ts">
import { computed } from 'vue'
import ProgressBar from './ProgressBar.vue'
import { numFormatter } from '@/utils/numFormatter'

const { totalDays, currDays } = defineProps<{
  totalDays: number | null
  currDays: number
}>()

const hasLenses = computed(() => totalDays !== null && totalDays !== undefined)

const outputText = computed(() =>
  hasLenses.value ? numFormatter.format(totalDays! - currDays) : 'No lens pair added',
)

const progress = computed(() => {
  if (!hasLenses.value) return 0
  const percent = (currDays / totalDays!) * 100
  return Math.max(0, 100 - percent)
})
</script>

<template>
  <div class="grid justify-center items-end text-center">
    <ProgressBar v-show="hasLenses" class="col-[1/2] row-[1/2]" :progress />
    <output class="col-[1/2] row-[1/2]">{{ outputText }}</output>
  </div>
</template>
