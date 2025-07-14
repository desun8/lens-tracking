<script setup lang="ts">
import { useTemplateRef } from 'vue'
import AppButton from '../AppButton.vue'
import DialogAddLensesPair from './DialogAddLensesPair.vue'

const dialogRef = useTemplateRef<InstanceType<typeof DialogAddLensesPair>>('dialog')

function showDialog() {
  if (!dialogRef.value) return
  dialogRef.value.isOpen = true
}
</script>

<template>
  <AppButton @click="showDialog" variant="outline" class="w-full button-hover group">
    <div class="flex items-center gap-2">
      <svg
        class="w-4 h-4 transition-transform duration-200 group-hover:rotate-90"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
      <span class="font-medium">Add New Pair</span>
    </div>
  </AppButton>

  <DialogAddLensesPair ref="dialog" />
</template>
