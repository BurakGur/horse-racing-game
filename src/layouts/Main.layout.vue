<template>
  <div class="main-layout">
    <Header />
    <div class="main-layout__container">
      <div class="main__horse-list">
        <HorseList />
      </div>
      <div class="main__race-track">
        <RaceTrack />
      </div>
      <div class="main__program-list">
        <ProgramList />
      </div>
      <div class="main__result-list">
        <ResultList />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '../components/Header.component.vue'
import HorseList from '../components/HorseList.component.vue'
</script>

<style scoped lang="scss">
.main-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
}

.main-layout__container {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  flex: 1;
}

.main-layout__content {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.main__horse-list {
  max-width: 25%;
  margin: 0 1.5rem 1rem;
  flex: 1;
  max-height: 100%;
}

.main__race-track {
  flex: 1;
}

.main__program-list {
  flex: 15%;
}

.main__result-list {
  flex: 15%;
}
</style>
