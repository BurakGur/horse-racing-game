<template>
  <div class="section-sub-header">
    <span class="section-sub-header__title">{{ title }}</span>
    <span v-if="badge" class="section-sub-header__badge" :class="{ 'section-sub-header__badge--active': isActive }">
      {{ badge }}
    </span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  badge?: string
  isActive?: boolean
}

withDefaults(defineProps<Props>(), {
  badge: '',
  isActive: false,
})
</script>

<style scoped lang="scss">
.section-sub-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.75rem;
  background-color: var(--color-gray-50);
  border-bottom: 1px solid var(--color-gray-200);

  &__title {
    font-weight: 600;
    font-size: var(--text-sm);
    color: var(--color-gray-800);
  }

  &__badge {
    font-size: var(--text-xs);
    font-weight: 500;
    color: var(--color-white);
    padding: 0.125rem 0.5rem;
    border-radius: 1rem;
    background-color: var(--color-gray-700);

    &--active {
      background-color: var(--color-green-700);
    }
  }
}
</style>
