<script setup lang="ts">
import { onMounted } from "vue";
import { useJokeStore } from "~/store/jokes";

const jokeStore = useJokeStore();

onMounted(async () => {
  await jokeStore.setTypes();
});
</script>

<template>
  <div class="space-y-6">
    <jokes-header-table />
    <jokes-view-table />
  </div>
</template>
