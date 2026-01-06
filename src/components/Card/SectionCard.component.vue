<template>
  <div class="section-card">
    <div class="section-card__title">{{ title }}</div>
    <div class="section-card__content"><slot /></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped lang="scss">
.section-card {
  background-color: var(--color-white);
  border-radius: 0.75rem;
  border: 1px solid var(--color-gray-200);
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: 100%;

  &__title {
    font-size: var(--text-base);
    font-weight: 700;
    color: var(--color-gray-800);
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--color-gray-200);
    background-color: var(--color-gray-50);
  }

  &__content {
    overflow: auto;
    flex: 1;
  }
}
</style>
