<template>
  <SectionCard title="HORSE LIST">
    <div class="horse-list__table-wrapper hide-scrollbar">
      <table class="horse-list__table" v-if="horses.length > 0">
        <thead>
          <tr>
            <th class="horse-list__th horse-list__th--name">Name</th>
            <th class="horse-list__th horse-list__th--condition">Condition</th>
          </tr>
        </thead>
        <tbody class="horse-list__table-body">
          <tr v-for="horse in horses" :key="horse.id" class="horse-list__row">
            <td class="horse-list__td horse-list__td--name">
              <span class="horse-list__color-indicator" :style="{ backgroundColor: horse.colorHex }" />
              {{ horse.name }}
            </td>
            <td class="horse-list__td horse-list__td--condition">{{ horse.condition }}%</td>
          </tr>
        </tbody>
      </table>
      <EmptyMessageCard v-else message="No horses found. Please generate a program first." />
    </div>
  </SectionCard>
</template>

<script setup lang="ts">
import SectionCard from '@/components/Card/SectionCard.component.vue'
import EmptyMessageCard from '@/components/Card/EmptyMessageCard.component.vue'
import { useStore } from '@/store'
import { computed } from 'vue'

const store = useStore()

const horses = computed(() => store.state.allHorses)
</script>

<style scoped lang="scss">
@use '@/assets/style/mixin/media-query.scss' as *;

.horse-list {
  &__title {
    font-size: var(--text-base);
    font-weight: 700;
    color: var(--color-gray-800);
    padding: 0.75rem 1rem;
    margin: 0;
    border-bottom: 1px solid var(--color-gray-200);
    background-color: var(--color-gray-50);
  }

  &__table-wrapper {
    overflow: auto;
    height: 100%;

    @include respond-to(md) {
      max-height: 20rem;
    }
  }

  &__table-body {
    height: 100%;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--text-sm);
  }

  &__th {
    text-align: left;
    padding: 0.5rem 1rem;
    font-weight: 500;
    color: var(--color-gray-600);
    background-color: var(--color-gray-50);
    border-bottom: 1px solid var(--color-gray-200);
    position: sticky;
    top: 0;
    z-index: 1;

    &--name {
      width: 80%;
    }

    &--condition {
      width: 20%;
    }
  }

  &__row {
    transition: background-color 0.15s ease;

    &:hover {
      background-color: var(--color-gray-50);
    }

    &:not(:last-child) {
      border-bottom: 1px solid var(--color-gray-100);
    }
  }

  &__td {
    padding: 0.75rem 1rem;
    color: var(--color-gray-800);
    vertical-align: super;

    &--name {
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    &--condition {
      text-align: center;
      font-weight: 700;
      font-size: var(--text-base);
    }
  }

  &__color-indicator {
    display: inline-flex;
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 50%;
  }

  &__empty-message {
    text-align: center;
    padding: 0.75rem 1rem;
    color: var(--color-gray-600);
  }
}
</style>
