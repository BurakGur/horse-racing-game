<template>
  <div class="main-layout">
    <Header />
    <div class="main-layout__container">
      <div class="main__horse-list">
        <HorseList />
      </div>
      <div class="main__race-track">
        <RaceTrackCard />
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
import Header from '../components/Header/Header.component.vue'
import HorseList from '../components/List/HorseList.component.vue'
import ProgramList from '../components/List/ProgramList.component.vue'
import ResultList from '../components/List/ResultList.component.vue'
import RaceTrackCard from '../components/Card/RaceTrackCard.component.vue'
</script>

<style scoped lang="scss">
@use '@/assets/style/mixin/media-query.scss' as *;

.main-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;

  @include respond-to(md) {
    height: auto;
    max-height: none;
  }
}

.main-layout__container {
  display: flex;
  flex-direction: row;
  overflow: hidden;
  flex: 1;
  padding: 0 1.5rem 1.5rem;
  gap: 1rem;

  @include respond-to(md) {
    flex-direction: column;
    overflow: scroll;
  }
}

.main__horse-list {
  max-width: 25%;
  flex: 1;

  @include respond-to(md) {
    max-width: 100%;
  }
}

.main__race-track {
  flex: 1;

  @include respond-to(md) {
    width: 100%;
  }
}

.main__program-list {
  max-width: 15%;
  flex: 1;

  @include respond-to(md) {
    max-width: 100%;
  }
}

.main__result-list {
  max-width: 15%;
  flex: 1;

  @include respond-to(md) {
    max-width: 100%;
  }
}
</style>
