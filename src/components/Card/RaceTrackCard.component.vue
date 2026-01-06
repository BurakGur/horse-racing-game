<template>
  <SectionCard title="RACE TRACK">
    <SectionSubHeader
      v-if="currentRace"
      :title="`Round ${currentRace.round} - ${currentRace.distance}m`"
      badge="Finish Line"
    />
    <div class="race-track-card__lanes" v-if="currentRace">
      <HorseLaneItem
        v-for="(horse, index) in currentRace.horses"
        :key="horse.id"
        :horse="horse"
        :lane-number="index + 1"
        :is-racing="isRacing"
        :is-paused="isPaused"
        :duration="durations[horse.id] || 0"
        @finished="handleHorseFinish"
      />
    </div>
    <EmptyMessageCard v-else message="Please generate a program to start racing." />
  </SectionCard>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import type { Horse } from '@/types'
import { calculateRaceDurations } from '@/utils/race.utils'
import HorseLaneItem from '@/components/Item/HorseLaneItem.component.vue'
import EmptyMessageCard from '@/components/Card/EmptyMessageCard.component.vue'
import SectionSubHeader from '@/components/Header/SectionSubHeader.component.vue'
import SectionCard from '@/components/Card/SectionCard.component.vue'

const store = useStore()

const currentRace = computed(() => store.getters.currentRace)
const isRacing = computed(() => store.state.isRacing)
const isPaused = computed(() => store.state.isPaused)

const durations = ref<Record<number, number>>({})
const finishedHorses = ref<Horse[]>([])

watch(isRacing, (newValue) => {
  if (newValue && currentRace.value) {
    if (finishedHorses.value.length === 0) {
      calculateDurations()
    }
  } else if (!newValue && finishedHorses.value.length === 10) {
    finishedHorses.value = []
    durations.value = {}
  }
})

const calculateDurations = () => {
  if (!currentRace.value) return
  durations.value = calculateRaceDurations(currentRace.value.horses, currentRace.value.distance)
}

const handleHorseFinish = (horse: Horse) => {
  finishedHorses.value.push(horse)
  if (finishedHorses.value.length === currentRace.value?.horses.length) {
    finishRace()
  }
}

const finishRace = () => {
  if (!currentRace.value) return

  const result = {
    round: currentRace.value.round,
    winner: finishedHorses.value[0],
    rankings: [...finishedHorses.value],
  }

  setTimeout(() => {
    store.dispatch('finishCurrentRace', result)
  }, 500) // Wait for 500ms to let the user see the last horse finish
}
</script>

<style scoped>
.race-track-card__lanes {
  padding: 10px;
}
</style>
