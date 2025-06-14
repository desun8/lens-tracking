<script setup lang="ts">
import TheHeader from './components/TheHeader/TheHeader.vue'
import Progress from './components/Progress/Progress.vue'
import BtnCheck from './components/BtnCheck.vue'
import LensesControls from './components/LensesControls/LensesControls.vue'
import UserSettings from './components/UserSettings/UserSettings.vue'
import { useStore } from './useStore'

const { state, hasLensesPair } = useStore()
</script>

<template>
  <TheHeader />
  <main>
    <Progress :curr-days="state.lensesCurrDays" :total-days="state.lensesTotalDays" />

    <div class="mt-5 grid justify-center justify-items-center gap-3">
      <BtnCheck
        class="col-span-2 w-32"
        :disabled="!hasLensesPair || state.lensesCurrDays === state.lensesTotalDays"
      />

      <LensesControls class="col-span-1" :has-pair="hasLensesPair" />
      <UserSettings class="col-span-1" />
    </div>
  </main>
</template>
