<template>
  <div class="empty-message-card">
    <slot>{{ message }}</slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message?: string
}

withDefaults(defineProps<Props>(), {
  message: 'No data available.',
})
</script>

<style scoped lang="scss">
.empty-message-card {
  text-align: center;
  padding: 2rem 1rem;
  color: var(--color-gray-500);
  font-size: var(--text-sm);
}
</style>
