<template>
  <button :class="['button', `button--${variant}`]" :type="type" :disabled="disabled">
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  type: 'button',
  disabled: false,
})
</script>

<style scoped lang="scss">
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.75rem;
  font-size: var(--text-sm);
  font-weight: 500;
  line-height: var(--text-sm--line-height);
  border-radius: 0.625rem;
  cursor: pointer;
  user-select: none;
  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &--primary {
    background-color: var(--color-gray-900);
    color: var(--color-gray-50);
    border: 1px solid var(--color-gray-900);

    &:hover {
      background-color: var(--color-gray-800);
      border-color: var(--color-gray-800);
    }

    &:active {
      background-color: var(--color-gray-950);
      border-color: var(--color-gray-950);
    }
  }

  &--secondary {
    background-color: var(--color-white);
    color: var(--color-gray-900);
    border: 1px solid var(--color-gray-200);

    &:hover {
      background-color: var(--color-gray-50);
      border-color: var(--color-gray-300);
    }

    &:active {
      background-color: var(--color-gray-100);
    }
  }
}
</style>
