<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const AddNewPair = defineAsyncComponent(() => import('./AddNewPair.vue'))
const DeleteCurrPair = defineAsyncComponent(() => import('./DeleteCurrPair.vue'))

defineProps<{ hasPair: boolean }>()
</script>

<template>
  <DeleteCurrPair v-if="hasPair" />
  <AddNewPair v-else />
</template>
