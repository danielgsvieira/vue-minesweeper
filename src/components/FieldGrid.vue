<script setup lang="ts">
import { FieldGrid } from '../models/FieldGrid';
import { GridCell } from '../models/GridCell';
import { StyleValue, onMounted, ref } from 'vue';

onMounted(() => {

  setTimeout(() => {
    grid.value.cells.forEach(((el) => el.reveal()));
  }, 1000)
});

const grid = ref<FieldGrid>(new FieldGrid(24, 24));

const cellClasses = (cell: GridCell): Record<string, boolean> => {
  return {
    'grid-cell': true,
    'revealed': cell.revealed,
    'has-bomb': cell.hasBomb,
  }
};

const numberStyle = (cell: GridCell): StyleValue => {
  const textColorMap: Record<number, string> = {
    0: '#000000',
    1: '#1976D2',
    2: '#388E3C',
    3: '#D32F2F',
    4: '#7B1FA2',
    5: '#EFAD25',
    6: '#4BA491',
    7: '#424242',
    8: '#C0BDAD',
  };

  return {
    color: textColorMap[cell.numberOfSurroundingBombs],
  };
};
</script>

<template>
  <div v-for="(row, rowIndex) in grid.rows" :key="rowIndex" class="grid-row">
    <div
      v-for="(cell, cellIndex) in row"
      :key="cellIndex"
      :class="cellClasses(cell)"
      @click="cell.reveal()"
    >
      <template v-if="cell.revealed">
        <i v-if="cell.hasBomb" class="bi-circle-fill"></i>
        <span :style="numberStyle(cell)" v-else>
          {{
            (cell.numberOfSurroundingBombs > 0)
              ? cell.numberOfSurroundingBombs
              : ''
          }}
        </span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.grid-row {
  display: flex;
}

.grid-cell {
  width: 2rem;
  height: 2rem;

  border: solid 1px black;

  background-color: green;

  display: flex;
  justify-content: center;
  align-items: center;

  color: black;

  cursor: pointer;

  font-weight: bold;
  font-size: 1.5rem;
}

.grid-cell i {
  font-size: 1rem;
}

.grid-cell.revealed {
  background-color: lightgray;
}

.grid-cell.revealed.has-bomb {
  background-color: red;
}
</style>
