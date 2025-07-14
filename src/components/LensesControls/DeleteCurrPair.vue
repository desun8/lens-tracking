<script setup lang="ts">
import { useStore } from '@/useStore'
import { useTemplateRef } from 'vue'
import AppButton from '../AppButton.vue'
import AppConfirmDialog from '../AppConfirmDialog.vue'

const { state } = useStore()
const confirmDialogRef = useTemplateRef<InstanceType<typeof AppConfirmDialog>>('confirmDialog')

function showDeleteDialog() {
  confirmDialogRef.value?.show()
}

function deleteLensesPair() {
  state.lensesTotalDays = null
  state.lensesCurrDays = 0
}
</script>

<template>
  <AppButton @click="showDeleteDialog" variant="destructive" class="w-full button-hover group">
    <div class="flex items-center gap-2">
      <svg class="w-4 h-4 transition-transform duration-200 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="3,6 5,6 21,6"/>
        <path d="M19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6M8,6V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"/>
        <line x1="10" y1="11" x2="10" y2="17"/>
        <line x1="14" y1="11" x2="14" y2="17"/>
      </svg>
      <span class="font-medium">Delete Current Pair</span>
    </div>
  </AppButton>

  <AppConfirmDialog 
    ref="confirmDialog"
    title="Delete Lens Pair"
    message="Are you sure you want to delete the current lens pair? This action cannot be undone."
    confirm-text="Delete"
    cancel-text="Cancel"
    variant="destructive"
    @confirm="deleteLensesPair"
  />
</template>
