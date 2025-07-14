import { ref, type Ref } from 'vue'

export interface ConfirmOptions {
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  variant?: 'destructive' | 'primary'
}

export function useConfirm() {
  const isOpen = ref(false)
  const options: Ref<ConfirmOptions> = ref({})
  let resolveCallback: ((value: boolean) => void) | null = null

  function confirm(opts: ConfirmOptions = {}): Promise<boolean> {
    options.value = {
      title: 'Confirm',
      message: 'Are you sure?',
      confirmText: 'Confirm',
      cancelText: 'Cancel',
      variant: 'destructive',
      ...opts
    }

    isOpen.value = true

    return new Promise((resolve) => {
      resolveCallback = resolve
    })
  }

  function handleConfirm() {
    isOpen.value = false
    resolveCallback?.(true)
    resolveCallback = null
  }

  function handleCancel() {
    isOpen.value = false
    resolveCallback?.(false)
    resolveCallback = null
  }

  return {
    isOpen,
    options,
    confirm,
    handleConfirm,
    handleCancel
  }
}