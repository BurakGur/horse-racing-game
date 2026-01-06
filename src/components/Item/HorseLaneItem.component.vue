<template>
  <div class="horse-lane-item">
    <div class="horse-lane-item__info">{{ laneNumber }}</div>
    <div class="horse-lane-item__track">
      <div
        class="horse-lane-item__horse-runner"
        :class="{
          'horse-lane-item__horse-runner--running': isRacing,
          'horse-lane-item__horse-runner--paused': isPaused,
        }"
        :style="{
          animationDuration: `${duration}ms`,
        }"
        @animationend="onFinish"
      >
        <div class="horse-lane-item__horse-icon">
          <IconHorse :size="40" :color="horse.colorHex" />
        </div>
      </div>
      <div class="horse-lane-item__finish-line" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import type { Horse } from '@/store/types'
import IconHorse from '@/assets/icons/IconHorse.vue'

const props = defineProps<{
  horse: Horse
  laneNumber: number
  isRacing: boolean
  isPaused: boolean
  duration: number
}>()

const emit = defineEmits<{
  (e: 'finished', horse: Horse): void
}>()

const { horse } = toRefs(props)

const onFinish = () => {
  emit('finished', horse.value)
}
</script>

<style scoped>
.horse-lane-item {
  display: flex;
  align-items: flex-start;
  padding: 0rem 0.75rem;
  background-color: var(--color-gray-50);
  border-bottom: 1px dotted var(--color-gray-200);
  height: 4rem;
}

.horse-lane-item__info {
  background: var(--color-gray-800);
  color: var(--color-white);
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--text-xs);
  font-weight: 700;
  margin-top: 0.5rem;
}

.horse-lane-item__track {
  flex-grow: 1;
  position: relative;
  height: 100%;
  margin-right: 1.5rem;
}

.horse-lane-item__finish-line {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 0.25rem;
  background: repeating-linear-gradient(
    45deg,
    var(--color-gray-900),
    var(--color-gray-900) 0.1rem,
    transparent 0.1rem,
    transparent 0.2rem
  );
  z-index: 1;
}

.horse-lane-item__horse-runner {
  position: absolute;
  left: 0.25rem;
  transform: translateX(0);
  height: 100%;
}

.horse-lane-item__horse-icon {
  transform: scaleX(-1);
  height: 100%;
  display: flex;
  align-items: flex-end;
}

@keyframes run {
  from {
    left: 0;
  }
  to {
    left: calc(100% - 2.5rem); /* 2.5rem is the width of the horse icon */
  }
}

.horse-lane-item__horse-runner--running {
  animation-name: run;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

.horse-lane-item__horse-runner--paused {
  animation-play-state: paused;
}
</style>
