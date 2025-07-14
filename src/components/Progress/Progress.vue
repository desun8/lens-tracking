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
  <div class="flex flex-col items-center gap-4 p-4 sm:p-6 bg-card rounded-xl shadow-sm animate-fade-in progress-container card-hover">
    <div class="relative">
      <ProgressBar v-show="hasLenses" :progress />
      <div v-if="!hasLenses" class="w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
        <div class="text-center">
          <div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 rounded-full bg-muted flex items-center justify-center transition-all duration-200 hover:bg-primary hover:text-primary-foreground">
            <svg class="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>
            </svg>
          </div>
          <p class="text-sm text-muted-foreground">No lens pair added</p>
        </div>
      </div>
    </div>
    <div class="text-center">
      <p class="text-base sm:text-lg font-semibold text-card-foreground mb-1">{{ outputText }}</p>
      <p v-if="hasLenses" class="text-sm text-muted-foreground">days remaining</p>
    </div>
  </div>
</template>
