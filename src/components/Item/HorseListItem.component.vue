<template>
  <div class="horse-list-item" :class="{ 'horse-list-item--winner': isWinner }">
    <span v-if="order" class="horse-list-item__order">{{ order }}.</span>
    <span class="horse-list-item__name">{{ horse.name }}</span>
    <span class="horse-list-item__color" :style="{ backgroundColor: horse.colorHex }" />
  </div>
</template>

<script setup lang="ts">
import type { Horse } from '@/types'

interface Props {
  horse: Horse
  order?: number
  isWinner?: boolean
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.horse-list-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: var(--text-xs);
  color: var(--color-gray-700);
  background-color: var(--color-gray-50);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;

  &--winner {
    background-color: var(--color-green-100);
  }

  &__order {
    font-weight: 700;
    color: var(--color-gray-800);
  }

  &__color {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    flex-shrink: 0;
  }
}
</style>
