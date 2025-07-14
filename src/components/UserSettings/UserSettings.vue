<script setup lang="ts">
import { useTemplateRef } from 'vue'
import AppButton from '../AppButton.vue'
import DialogUserSettings from './DialogUserSettings.vue'

const dialogRef = useTemplateRef<InstanceType<typeof DialogUserSettings>>('dialog')

function showDialog() {
  if (!dialogRef.value) return
  dialogRef.value.isOpen = true
}
</script>

<template>
  <AppButton @click="showDialog" variant="secondary" class="w-full button-hover group">
    <div class="flex items-center gap-2">
      <svg class="w-4 h-4 transition-transform duration-200 group-hover:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/>
      </svg>
      <span class="font-medium">Settings</span>
    </div>
  </AppButton>
  <DialogUserSettings ref="dialog" />
</template>
