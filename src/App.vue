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
  <div class="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background">
    <TheHeader />
    <main class="space-y-6">
      <Progress
        :curr-days="state.lensesCurrDays"
        :total-days="state.lensesTotalDays"
        class="animate-fade-in"
      />

      <div class="flex flex-col items-center gap-4 animate-fade-in">
        <BtnCheck :disabled="!hasLensesPair || state.lensesCurrDays === state.lensesTotalDays" />

        <div class="flex flex-col sm:flex-row gap-3 w-full max-w-xs button-group">
          <LensesControls :has-pair="hasLensesPair" class="flex-1" />
          <UserSettings class="flex-1" />
        </div>
      </div>
    </main>
  </div>
</template>
