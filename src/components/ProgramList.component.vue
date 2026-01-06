<template>
  <SectionCard title="PROGRAM">
    <div v-if="programList.length > 0" class="program-list">
      <div v-for="race in programList" :key="race.round" class="program-list__round">
        <div class="program-list__round-header">
          <span class="program-list__round-number">{{ race.round }}. Lap</span>
          <span
            class="program-list__round-distance"
            :class="{ 'bg-green-700': race.round === currentRoundNo, 'bg-gray-700': race.round !== currentRoundNo }"
            >{{ race.distance }}m</span
          >
        </div>
        <div class="program-list__horses">
          <HorseListItem v-for="(horse, index) in race.horses" :key="horse.id" :horse="horse" :order="index + 1" />
        </div>
      </div>
    </div>
    <EmptyMessageCard v-else message="No program generated yet. Click 'Generate Program' to start." />
  </SectionCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'
import SectionCard from '@/components/SectionCard.component.vue'
import EmptyMessageCard from '@/components/EmptyMessageCard.component.vue'
import HorseListItem from '@/components/HorseListItem.component.vue'

const store = useStore()

const programList = computed(() => store.state.programList)
const currentRoundNo = computed(() => store.state.currentRoundNo)
</script>

<style scoped lang="scss">
.program-list {
  display: flex;
  flex-direction: column;

  &__round-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.75rem;
    background-color: var(--color-gray-50);
    border-bottom: 1px solid var(--color-gray-200);
  }

  &__round-number {
    font-weight: 600;
    font-size: var(--text-sm);
    color: var(--color-gray-800);
  }

  &__round-distance {
    font-size: var(--text-xs);
    font-weight: 500;
    color: var(--color-white);
    padding: 0.125rem 0.5rem;
    border-radius: 1rem;

    &--active {
      background-color: var(--color-gray-100);
    }
  }

  &__horses {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    padding: 0.5rem 0.75rem;
  }
}
</style>
