<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ progress: number }>()

const startDeg = 45
const endDeg = 225

const rotate = computed(() => startDeg + (endDeg - startDeg) * (props.progress / 100))
const strokeDasharray = computed(() => {
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (props.progress / 100) * circumference
  return `${circumference} ${circumference}`
})

const strokeDashoffset = computed(() => {
  const radius = 45
  const circumference = 2 * Math.PI * radius
  return circumference - (props.progress / 100) * circumference
})
</script>

<template>
  <div class="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto progress-circle">
    <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="rgb(var(--muted))"
        stroke-width="6"
        fill="none"
        class="opacity-20"
      />
      <circle
        cx="50"
        cy="50"
        r="45"
        stroke="url(#gradient)"
        stroke-width="6"
        fill="none"
        stroke-linecap="round"
        :stroke-dasharray="strokeDasharray"
        :stroke-dashoffset="strokeDashoffset"
        class="transition-all duration-500 ease-out"
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgb(var(--primary))" />
          <stop offset="100%" stop-color="rgb(var(--accent))" />
        </linearGradient>
      </defs>
    </svg>
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="text-center">
        <div class="text-xl sm:text-2xl font-bold text-primary progress-text">{{ Math.round(progress) }}%</div>
        <div class="text-xs text-muted-foreground">remaining</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes progress-animation {
  from {
    stroke-dashoffset: 283;
  }
  to {
    stroke-dashoffset: var(--target-offset);
  }
}
</style>
