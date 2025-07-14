<script setup lang="ts">
import { useTemplateRef, ref, watch } from 'vue'
import AppButton from './AppButton.vue'

const emits = defineEmits(['apply', 'cancel'])

const { disabled = false } = defineProps<{
  disabled?: boolean
}>()

const dialogEl = useTemplateRef('dialog')
const isOpen = ref(false)

watch(isOpen, () => {
  if (!dialogEl.value) return
  dialogEl.value[isOpen.value ? 'showModal' : 'close']()
})

function handleClose() {
  if (isOpen.value) isOpen.value = false
}

function cancel() {
  emits('cancel')
  handleClose()
}

function apply() {
  emits('apply')
}

defineExpose({
  isOpen,
})
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="dialog"
      class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-0 p-0 border-none bg-transparent max-w-none max-h-none w-full backdrop:bg-black/50 backdrop:backdrop-blur-sm"
      @close="handleClose"
      @keydown.escape="cancel"
      @keydown.enter="apply"
    >
      <div class="mx-auto flex flex-col gap-6 w-full max-w-md min-w-96 p-6 border border-slate-200 dark:border-slate-700 shadow-lg rounded-xl glass animate-scale-in bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <div class="flex items-center justify-between">
          <h2 v-if="$slots.title" class="text-lg font-semibold text-slate-900 dark:text-slate-100">
            <slot name="title"></slot>
          </h2>
          <button
            class="rounded-sm opacity-70 ring-offset-background transition-all duration-200 hover:opacity-100 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:pointer-events-none cursor-pointer"
            type="button"
            @click="cancel"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
            <span class="sr-only">Close</span>
          </button>
        </div>

        <div class="text-slate-900 dark:text-slate-100">
          <slot></slot>
        </div>

        <div class="flex gap-3 justify-end">
          <AppButton @click="cancel" variant="outline" size="sm" class="button-hover">
            <slot name="no-label">Cancel</slot>
          </AppButton>
          <AppButton @click="apply" size="sm" class="button-hover" :disabled="disabled">
            <slot name="ok-label">Apply</slot>
          </AppButton>
        </div>
      </div>
    </dialog>
  </Teleport>
</template>

