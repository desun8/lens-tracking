<script setup lang="ts">
import { useId } from 'vue'

const { type = 'text' } = defineProps<{
  placeholder?: string
  type?: 'text' | 'number' | 'email' | 'password'
  errorMsg?: string
}>()

const value = defineModel<string | number>({ required: true })
const id = useId()
</script>

<template>
  <div class="relative grid gap-2 pb-5">
    <label v-if="$slots.label" :for="id">
      <slot name="label"></slot>
    </label>
    <input
      v-model="value"
      :id
      :type
      :placeholder
      class="px-2 py-1 border rounded-sm"
      :class="{ 'border-red-700': errorMsg }"
    />
    <span v-show="errorMsg" class="absolute left-0 bottom-0 text-xs text-red-700">{{
      errorMsg
    }}</span>
  </div>
</template>
