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
  <AppButton @click="showDialog"> Add new pair </AppButton>

  <DialogAddLensesPair ref="dialog" />
</template>
