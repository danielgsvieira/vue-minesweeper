<script setup lang="ts">
import { Minesweeper } from './components/Minesweeper';
</script>

<template>
  <main class="page-container">
    <Minesweeper />
  </main>
</template>

<style scoped>
.page-container {
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
