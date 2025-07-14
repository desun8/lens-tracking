<script setup lang="ts">
import { useTemplateRef, ref, watch } from 'vue'
import AppButton from './AppButton.vue'

const emits = defineEmits(['confirm', 'cancel'])

const dialogEl = useTemplateRef('dialog')
const isOpen = ref(false)

const {
  title = 'Confirm',
  message = 'Are you sure?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'destructive',
} = defineProps<{
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  variant?: 'destructive' | 'primary'
}>()

watch(isOpen, () => {
  if (!dialogEl.value) return
  if (isOpen.value) {
    dialogEl.value.showModal()
  } else {
    dialogEl.value.close()
  }
})

function show() {
  isOpen.value = true
}

function hide() {
  isOpen.value = false
}

function handleClose() {
  isOpen.value = false
}

function confirm() {
  emits('confirm')
  hide()
}

function cancel() {
  emits('cancel')
  hide()
}

defineExpose({
  show,
  hide,
})
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="dialog"
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0 p-0 border-none bg-transparent max-w-none max-h-none backdrop:bg-black/50 backdrop:backdrop-blur-sm"
      @close="handleClose"
      @keydown.escape="cancel"
      @keydown.enter="confirm"
    >
      <div
        class="flex flex-col gap-6 w-full max-w-md min-w-80 p-6 border border-slate-200 dark:border-slate-700 shadow-lg rounded-xl glass animate-scale-in bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {{ title }}
          </h2>
          <button
            class="rounded-sm opacity-70 transition-all duration-200 hover:opacity-100 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:pointer-events-none cursor-pointer"
            type="button"
            @click="cancel"
          >
            <svg
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span class="sr-only">Close</span>
          </button>
        </div>

        <div class="text-slate-900 dark:text-slate-100">
          <div class="flex items-center gap-3 mb-3">
            <div
              class="w-10 h-10 rounded-full flex items-center justify-center"
              :class="{
                'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400':
                  variant === 'destructive',
                'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400':
                  variant === 'primary',
              }"
            >
              <svg
                v-if="variant === 'destructive'"
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              <svg
                v-else
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <p class="text-sm text-slate-700 dark:text-slate-300">{{ message }}</p>
          </div>
        </div>

        <div class="flex gap-3 justify-end">
          <AppButton @click="cancel" variant="outline" size="sm" class="button-hover">
            {{ cancelText }}
          </AppButton>
          <AppButton @click="confirm" :variant="variant" size="sm" class="button-hover">
            {{ confirmText }}
          </AppButton>
        </div>
      </div>
    </dialog>
  </Teleport>
</template>
