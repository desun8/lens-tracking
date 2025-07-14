<script setup lang="ts">
const {
  type = 'button',
  variant = 'primary',
  size = 'md',
} = defineProps<{
  type?: 'submit' | 'button'
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <button
    class="inline-flex items-center justify-center whitespace-nowrap rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 cursor-pointer disabled:cursor-not-allowed"
    :class="[
      {
        'bg-primary text-primary-foreground shadow hover:bg-primary/90 hover:shadow-glow':
          variant === 'primary',
        'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80':
          variant === 'secondary',
        'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground':
          variant === 'outline',
        'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
        'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90':
          variant === 'destructive',
      },
      {
        'h-8 px-3 text-sm': size === 'sm',
        'h-10 px-4 py-2': size === 'md',
        'h-12 px-6 text-lg': size === 'lg',
      },
    ]"
    :type
    :disabled
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.animate-scale-95 {
  animation: scale-95 0.1s ease-out;
}

@keyframes scale-95 {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0.95);
  }
}
</style>
