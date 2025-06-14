<script setup lang="ts">
const { type = 'button', variant = 'primary' } = defineProps<{
  type?: 'submit' | 'button'
  disabled?: boolean
  variant?: 'primary' | 'text'
}>()
</script>

<template>
  <button
    class="px-4 py-2 rounded-sm transition-colors"
    :class="{
      'bg-amber-400 hover:bg-amber-500 focus-visible:bg-amber-500 disabled:bg-amber-200':
        variant === 'primary',
      'hover:bg-amber-100 focus-visible:bg-amber-100 disabled:bg-amber-50': variant === 'text',
    }"
    :type
    :disabled
  >
    <slot></slot>
  </button>
</template>
