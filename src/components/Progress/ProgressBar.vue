<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ progress: number }>()

const startDeg = 45
const endDeg = 225

const rotate = computed(() => startDeg + (endDeg - startDeg) * (props.progress / 100))
</script>

<template>
  <div
    class="relative overflow-hidden w-32 h-16 after:absolute after:t-0 after:l-0 after:block after:w-32 after:h-32 after:border-8 after:border-gray-200 after:rounded-full after:border-b-amber-500 after:border-r-amber-500 after:transition-transform after:ease-linear after:rotate-(--rotate)"
    :style="`--rotate:${rotate}deg`"
  ></div>
</template>
