<script setup lang="ts">
import { useTemplateRef } from 'vue'
import AppBtn from '../AppButton.vue'
import DialogUserSettings from './DialogUserSettings.vue'

const dialogRef = useTemplateRef<InstanceType<typeof DialogUserSettings>>('dialog')

function showDialog() {
  if (!dialogRef.value) return
  dialogRef.value.isOpen = true
}
</script>

<template>
  <AppBtn @click="showDialog">Settings</AppBtn>
  <DialogUserSettings ref="dialog" />
</template>
