import { GridParameters } from '../models/GridParameters';
import { MinesweeperDifficulty } from '../models/MinesweeperDfficulty.type';


const GridParametersDifficultyMap: Record<
  MinesweeperDifficulty,
  GridParameters
> = {
  easy: {
    numberOfRows: 10,
    numberOfColumns: 10,
    bombDensity: 0.1,
  },
  medium: {
    numberOfRows: 16,
    numberOfColumns: 16,
    bombDensity: 0.16,
  },
  hard: {
    numberOfRows: 22,
    numberOfColumns: 22,
    bombDensity: 0.2,
  },
};

Object.freeze(GridParametersDifficultyMap);

export { GridParametersDifficultyMap };