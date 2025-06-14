<script setup lang="ts">
import { useId } from 'vue'

defineProps<{
  items: { value: string; label: string }[]
}>()
const value = defineModel<string>({ required: true })
const id = useId()
</script>

<template>
  <div class="relative grid gap-2">
    <label v-if="$slots.default" :for="id">
      <slot></slot>
    </label>

    <select v-model="value" :id>
      <option v-for="item in items" :key="item.value" :value="item.value">{{ item.label }}</option>
    </select>
  </div>
</template>
