import { Ref, ref, watch } from 'vue';
import { FieldGrid } from '../models/FieldGrid'
import { MinesweeperDifficulty } from '../models/MinesweeperDfficulty.type';

interface MinesweeperState {
  difficulty: MinesweeperDifficulty;
  grid: FieldGrid;
}

const state = ref<MinesweeperState>({
  difficulty: 'easy',
  grid: new FieldGrid('easy'),
});

const useMinesweeperState = (): Ref<MinesweeperState> => {

  watch(() => state.value.difficulty, (newValue) => {
    state.value.grid = new FieldGrid(newValue)
  });

  return state;
};

export { useMinesweeperState };
