<template>
  <header class="header">
    <img class="header__logo" src="../../assets/images/horsenow-logo.svg" alt="horsenow" />
    <nav class="header__nav">
      <Button variant="primary" @click="handleGenerateProgram">Generate Program</Button>
      <Button variant="secondary" @click="toggleStartPause" :disabled="!isProgramGenerated">
        {{ isRacing ? (isPaused ? 'Resume' : 'Pause') : 'Start New Race' }}
      </Button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'
import Button from '@/components/Button/Button.component.vue'

const store = useStore()

const isRacing = computed(() => store.state.isRacing)
const isPaused = computed(() => store.state.isPaused)
const isProgramGenerated = computed(() => store.state.isProgramGenerated)
const currentRound = computed(() => store.getters.currentRound)
const totalRounds = computed(() => store.getters.totalRounds)

const handleGenerateProgram = () => {
  store.dispatch('generateNewProgram')
}

const handleStartRace = () => {
  store.dispatch('startCurrentRace')
}

const toggleStartPause = () => {
  if (isRacing.value) {
    store.dispatch('togglePause')
  } else {
    store.dispatch('startCurrentRace')
  }
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
}

.header__logo {
  width: 120px;
  height: auto;
}

.header__nav {
  display: flex;
  gap: 1rem;
}
</style>
