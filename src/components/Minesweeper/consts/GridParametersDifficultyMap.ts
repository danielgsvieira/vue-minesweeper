import { GridParameters } from '../models/GridParameters';
import { MinesweeperDifficulty } from '../models/MinesweeperDfficulty.type';

const GridParametersDifficultyMap =
  new Map<MinesweeperDifficulty, GridParameters>();
GridParametersDifficultyMap.set('easy', {
  numberOfRows: 10,
  numberOfColumns: 10,
  bombDensity: 0.1,
});
GridParametersDifficultyMap.set('medium', {
  numberOfRows: 16,
  numberOfColumns: 16,
  bombDensity: 0.16,
});
GridParametersDifficultyMap.set('hard', {
  numberOfRows: 22,
  numberOfColumns: 22,
  bombDensity: 0.2,
});

export { GridParametersDifficultyMap };