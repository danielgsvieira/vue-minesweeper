<script setup lang="ts">
import { NumberOfBombsTextColorMap } from './consts/NumberOfBombsTextMap';
import { GridCell } from './models/GridCell';
import { StyleValue, computed } from 'vue';
import { useMinesweeperState } from './state/MinesweeperState';

const state = useMinesweeperState();

const cellClasses = (cell: GridCell): Record<string, boolean> => {
  const isEvenRow = (cell.position.row % 2) === 0;
  const isEvenColumn = (cell.position.column % 2) === 0;
  const chessPatternCondition = (!isEvenRow && !isEvenColumn)
    || (isEvenRow && isEvenColumn);

  return {
    'grid-cell': true,
    'revealed': cell.revealed,
    'has-bomb': cell.revealed && cell.hasBomb,
    'light-green': !cell.revealed && chessPatternCondition,
    'light-grey': cell.revealed && chessPatternCondition,
  }
};

const numberStyle = (cell: GridCell): StyleValue => ({
  color: NumberOfBombsTextColorMap.get(cell.numberOfSurroundingBombs),
});

const handleCellClick = (cell: GridCell): void => {
  if (!cell.hasFlag) {
    if (cell.hasBomb) {
      state.value.grid.cells.forEach((el) => el.reveal());
    } else {
      cell.reveal();
    }
  }
};

const handleCellRightClick = (cell: GridCell): void => {
  cell.putFlag();
};

const numberOfRows = computed<number>(() => state.value.grid.numberOfRows);
const numberOfColumns = computed<number>(() => state.value.grid.numberOfColumns);
</script>

<template>
  <div class="field-grid-sizer">
    <div class="field-grid">
      <div
        v-for="(cell, cellIndex) in state.grid.cells"
        :key="cellIndex"
        :class="cellClasses(cell)"
        @click="handleCellClick(cell)"
        @contextmenu.prevent="handleCellRightClick(cell)"
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
        <template v-else>
          <i v-if="cell.hasFlag" class="bi-flag-fill minesweeper-flag"></i>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.field-grid-sizer {
  width: 100%;
  padding-top: 100%;

  position: relative;
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(v-bind(numberOfColumns), 1fr);
  grid-template-rows: repeat(v-bind(numberOfRows), 1fr);

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}


.grid-row {
  display: flex;

  flex-grow: 1;
}

.grid-cell {
  background-color: #8ECC39;

  display: flex;
  flex-grow: 1;
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

.grid-cell.light-green {
  background-color: #A7D948;
}

.grid-cell.revealed {
  background-color: #bbbbbb;
}

.grid-cell.revealed.light-grey {
  background-color: #cccccc;
}

.grid-cell.revealed.has-bomb {
  background-color: red;
}

.minesweeper-flag {
  color: red;
}
</style>
