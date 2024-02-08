import { GridCell } from "./GridCell";

export interface SurroundingCells {
  up: GridCell | null;
  upRight: GridCell | null;
  right: GridCell | null;
  downRight: GridCell | null;
  down: GridCell | null;
  downLeft: GridCell | null;
  left: GridCell | null;
  upLeft: GridCell | null;
}
