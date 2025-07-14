<script setup lang="ts">
import { useId } from 'vue'

const { disabled = false } = defineProps<{
  items: { value: string; label: string }[]
  disabled?: boolean
}>()
const value = defineModel<string>({ required: true })
const id = useId()
</script>

<template>
  <div class="relative grid gap-2 group">
    <label v-if="$slots.default" :for="id" class="text-sm font-medium text-slate-900 dark:text-slate-100 transition-colors duration-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
      <slot></slot>
    </label>

    <div class="relative group">
      <select 
        v-model="value" 
        :id
        :disabled
        class="w-full px-4 py-3 text-sm bg-transparent border border-input rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer select-hover"
      >
        <option v-for="item in items" :key="item.value" :value="item.value">{{ item.label }}</option>
      </select>
      <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg class="w-4 h-4 text-slate-500 dark:text-slate-400 transition-colors duration-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6,9 12,15 18,9"/>
        </svg>
      </div>
    </div>
  </div>
</template>
