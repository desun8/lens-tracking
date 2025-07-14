<script setup lang="ts">
import { useId, ref, computed } from 'vue'

const {
  type = 'text',
  disabled = false,
  errorMsg,
} = defineProps<{
  placeholder?: string
  type?: 'text' | 'number' | 'email' | 'password'
  errorMsg?: string
  disabled?: boolean
}>()

const value = defineModel<string | number>({ required: true })
const id = useId()
const inputRef = ref<HTMLInputElement>()

const hasValue = computed(
  () => value.value !== '' && value.value !== null && value.value !== undefined,
)
const hasError = computed(() => !!errorMsg)
</script>

<template>
  <div class="relative grid gap-2 pb-5">
    <div class="relative group">
      <input
        ref="inputRef"
        v-model="value"
        :id
        :type
        :placeholder
        :disabled
        class="w-full px-4 py-3 text-sm bg-transparent border rounded-lg transition-all duration-200 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-text input-hover"
        :class="{
          'border-destructive focus:ring-destructive input-error': hasError,
          'border-input': !hasError,
          'pt-6': $slots.label,
        }"
      />
      <label
        v-if="$slots.label"
        :for="id"
        class="absolute left-4 transition-all duration-200 text-slate-500 dark:text-slate-400 pointer-events-none group-hover:text-indigo-600 dark:group-hover:text-indigo-400"
        :class="{
          'top-2 text-xs': hasValue || inputRef?.matches?.(':focus'),
          'top-3 text-sm': !hasValue && !inputRef?.matches?.(':focus'),
        }"
      >
        <slot name="label"></slot>
      </label>
    </div>
    <div v-show="hasError" class="flex items-center gap-1 text-xs text-destructive animate-fade-in">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {{ errorMsg }}
    </div>
  </div>
</template>
