<script setup lang="ts">
import MinesweeperGrid from './MinesweeperGrid.vue';
import { useMinesweeperState } from './state/MinesweeperState';

const state = useMinesweeperState();
</script>

<template>
  <div class="minesweeper-container">
    <div class="minesweeper-content">
      <h1 class="minesweeper-title">
        Minesweeper
      </h1>
      <div class="minesweeper-controls">
        <label for="minesweeper-select-dificulty">
          Difficulty
        </label>
        <select v-model="state.difficulty">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div class="minesweeper-grid">
        <MinesweeperGrid />
      </div>
      <div class="minesweeper-score">
        score
      </div>
    </div>
  </div>
</template>

<style scoped>
.minesweeper-container {
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.5rem;

  max-width: 40rem;
}

@media screen and (orientation: landscape) {
  .minesweeper-container {
    width: 85vh;
  }
}

@media screen and (orientation: portrait) {
  .minesweeper-container {
    width: 85VW;
  }
}

.minesweeper-content {
  width: 100%;
  height: 100%;

  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;

  padding: 1rem;
}

.minesweeper-title {
  width: 100%;

  margin: 0;

  text-align: center;
}

.minesweeper-controls {
  width: 100%;

  text-align: center;
}

.minesweeper-grid {
  width: 100%;

  flex-grow: 1;
}
</style>
