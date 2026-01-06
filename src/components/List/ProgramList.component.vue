<template>
  <SectionCard title="PROGRAM">
    <div v-if="programList.length > 0" class="program-list">
      <div v-for="race in programList" :key="race.round" class="program-list__round">
        <SectionSubHeader
          :title="`${race.round}. Lap`"
          :badge="`${race.distance}m`"
          :is-active="race.round === currentRoundNo"
        />
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
import SectionCard from '@/components/Card/SectionCard.component.vue'
import EmptyMessageCard from '@/components/Card/EmptyMessageCard.component.vue'
import HorseListItem from '@/components/Item/HorseListItem.component.vue'
import SectionSubHeader from '@/components/Header/SectionSubHeader.component.vue'

const store = useStore()

const programList = computed(() => store.state.programList)
const currentRoundNo = computed(() => store.state.currentRoundNo)
</script>

<style scoped lang="scss">
.program-list {
  display: flex;
  flex-direction: column;

  &__horses {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    padding: 0.5rem 0.75rem;
  }
}
</style>
