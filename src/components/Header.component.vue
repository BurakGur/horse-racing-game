<template>
  <header class="header">
    <img class="header__logo" src="../assets/images/horsenow-logo.svg" alt="horsenow" />
    <nav class="header__nav">
      <Button variant="primary">Generate Program</Button>
      <Button variant="secondary">Start</Button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import Button from './Button.component.vue'
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
