<template>
  <SectionCard title="RESULTS">
    <div v-if="results.length > 0" class="result-list">
      <div v-for="result in results" :key="result.round" class="result-list__round">
        <SectionSubHeader :title="`${result.round}. Lap`" />
        <div class="result-list__rankings">
          <HorseListItem
            v-for="(horse, index) in result.rankings"
            :key="horse.id"
            :horse="horse"
            :order="index + 1"
            :is-winner="index === 0"
          />
        </div>
      </div>
    </div>
    <EmptyMessageCard v-else message="No results yet. Start a race to see results." />
  </SectionCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'
import SectionCard from '@/components/Card/SectionCard.component.vue'
import EmptyMessageCard from '@/components/Card/EmptyMessageCard.component.vue'
import SectionSubHeader from '@/components/Header/SectionSubHeader.component.vue'
import HorseListItem from '@/components/Item/HorseListItem.component.vue'

const store = useStore()

const results = computed(() => store.state.results)
</script>

<style scoped lang="scss">
.result-list {
  display: flex;
  flex-direction: column;

  &__round-number {
    font-weight: 600;
    font-size: var(--text-sm);
    color: var(--color-gray-800);
  }

  &__rankings {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    padding: 0.5rem 0.75rem;
  }
}
</style>
