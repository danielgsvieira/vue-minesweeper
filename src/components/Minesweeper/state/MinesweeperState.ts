import { Ref, ref, watch } from 'vue';
import { FieldGrid } from '../models/FieldGrid'
import { MinesweeperDifficulty } from '../models/MinesweeperDfficulty.type';
import { GridCell } from '../models/GridCell';

interface MinesweeperState {
  difficulty: MinesweeperDifficulty;
  grid: FieldGrid;
  startTime: Date | null;
  endTime: Date | null;
  gameStarted: boolean;
  reveal: (cell: GridCell) => void;
  putFlag: (cell: GridCell) => void;
}

const startGameProcedure = () => {
  if (!state.value.gameStarted) {
    state.value.endTime = null;
    state.value.startTime = new Date();
    state.value.gameStarted = true;
  }
};

const endGameProcedure = (isBombClick: boolean) => {
  if (isBombClick) {
    state.value.grid.cells.forEach((el) => el.reveal());
  }

  state.value.grid.cellsWithoutBombs.forEach((cell) => cell.reveal());
  state.value.endTime = new Date();
};

const proccessGameWin = (): void => {
  const cellsWithoutBombs = state.value.grid.cellsWithoutBombs;
  const cellsWithoutBombsRevealed = cellsWithoutBombs.filter(
    (cell) => cell.revealed
  );

  if (cellsWithoutBombs.length === cellsWithoutBombsRevealed.length) {
    endGameProcedure(false);
  }
}

const reveal = (cell: GridCell): void => {
  startGameProcedure();

  if (cell.hasFlag) {
    return;
  }

  if (cell.hasBomb) {
    endGameProcedure(true);
    return;
  }

  cell.reveal();
  proccessGameWin();
};

const putFlag = (cell: GridCell): void => {
  cell.putFlag();
};

const state = ref<MinesweeperState>({
  difficulty: 'easy',
  grid: new FieldGrid('easy'),
  startTime: null,
  endTime: null,
  gameStarted: false,
  reveal,
  putFlag,
});

const useMinesweeperState = (): Ref<MinesweeperState> => {

  watch(() => state.value.difficulty, (newValue) => {
    state.value.grid = new FieldGrid(newValue)
  });

  return state;
};

export { useMinesweeperState };
