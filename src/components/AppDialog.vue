<script setup lang="ts">
import { useTemplateRef, ref, watch } from 'vue'
import AppButton from './AppButton.vue'

const emits = defineEmits(['apply', 'cancel'])

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
      :class="['gap-5 m-auto py-8 px-10 rounded-xl', { grid: isOpen }]"
      closedby="any"
      @close="handleClose"
      @keypress.enter="apply"
    >
      <h2 v-if="$slots.title" class="text-xl font-bold text-center">
        <slot name="title"></slot>
      </h2>

      <slot></slot>

      <div class="flex gap-3 justify-end">
        <AppButton @click="cancel" variant="text">
          <slot name="no-label">Cancel</slot>
        </AppButton>
        <AppButton @click="apply">
          <slot name="ok-label">Apply</slot>
        </AppButton>
      </div>

      <button
        class="absolute top-2 right-2 w-6 h-6 before:absolute before:top-1/2 before:left-1/2 before:w-4 before:h-px before:bg-black before:-translate-1/2 before:rotate-45 before:transition-colors after:absolute after:top-1/2 after:left-1/2 after:w-4 after:h-px after:bg-black after:-translate-1/2 after:-rotate-45 after:transition-colors hover:before:bg-amber-900 focus-visible:before:bg-amber-900 hover:after:bg-amber-900 focus-visible:after:bg-amber-900"
        type="button"
        @click="cancel"
      >
        <span class="sr-only">Закрыть.</span>
      </button>
    </dialog>
  </Teleport>
</template>
