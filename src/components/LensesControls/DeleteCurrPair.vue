<script setup lang="ts">
import { useStore } from '@/useStore'
import AppButton from '../AppButton.vue'

const { state } = useStore()

function deleteLensesPair() {
  if (confirm('Are you sure you want to delete current lenses pair?')) {
    state.lensesTotalDays = null
    state.lensesCurrDays = 0
  }
}
</script>

<template>
  <AppButton @click="deleteLensesPair"> Delete current pair </AppButton>
</template>
