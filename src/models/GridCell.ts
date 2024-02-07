import { FieldGrid } from "./FieldGrid";
import { GridCellPosition } from "./GridCellPosition.interface";
import { SurroundingCells } from "./SurroundingCells.interface";

export class GridCell {
  public hasBomb: boolean;

  public position: GridCellPosition;

  public surroundingCells: SurroundingCells;

  public revealed: boolean = false;

  public constructor(
    hasBomb: boolean,
    position: GridCellPosition,
    surroundingCells?: SurroundingCells
  ) {
    this.hasBomb = hasBomb;
    this.position = position;

    if (surroundingCells !== undefined) {
      this.surroundingCells = surroundingCells;
    } else {
      this.surroundingCells = {
        up: null,
        upRight: null,
        right: null,
        downRight: null,
        down: null,
        downLeft: null,
        left: null,
        upLeft: null,
      }
    }
  }

  public reveal(): void {
    this.revealed = true;
  }

  public setSurroundingCells(grid: FieldGrid): void {
    this.setUpLeftNeighbor(grid);
    this.setUpNeighbor(grid);
    this.setUpRightNeighbor(grid);
    this.setRightNeighbor(grid);
    this.setDownRightNeighbor(grid);
    this.setDownNeighbor(grid);
    this.setDownLeftNeighbor(grid);
    this.setLeftNeighbor(grid);
  }

  public setUpLeftNeighbor(grid: FieldGrid): void {
    if (this.position.row === 1 || this.position.column === 1) {
      this.surroundingCells.upLeft = null;
    } else {
      this.surroundingCells.upLeft = grid.getCellByPosition(
        this.position.row - 1,
        this.position.column - 1,
      );
    }
  }

  public setUpNeighbor(grid: FieldGrid): void {
    if (this.position.row === 1) {
      this.surroundingCells.up = null;
    } else {
      this.surroundingCells.up = grid.getCellByPosition(
        this.position.row - 1,
        this.position.column,
      );
    }
  }

  public setUpRightNeighbor(grid: FieldGrid): void {
    if (
      this.position.row === 1
      || this.position.column === grid.numberOfColumns
    ) {
      this.surroundingCells.upRight = null;
    } else {
      this.surroundingCells.upRight = grid.getCellByPosition(
        this.position.row - 1,
        this.position.column + 1,
      );
    }
  }

  public setRightNeighbor(grid: FieldGrid): void {
    if (this.position.column === grid.numberOfColumns) {
      this.surroundingCells.right = null;
    } else {
      this.surroundingCells.right = grid.getCellByPosition(
        this.position.row,
        this.position.column + 1,
      );
    }
  }

  public setDownRightNeighbor(grid: FieldGrid): void {
    if (
      this.position.row === grid.numberOfRows
      || this.position.column === grid.numberOfColumns
    ) {
      this.surroundingCells.downRight = null;
    } else {
      this.surroundingCells.downRight = grid.getCellByPosition(
        this.position.row + 1,
        this.position.column + 1,
      );
    }
  }

  public setDownNeighbor(grid: FieldGrid): void {
    if (this.position.row === grid.numberOfRows) {
      this.surroundingCells.up = null;
    } else {
      this.surroundingCells.up = grid.getCellByPosition(
        this.position.row + 1,
        this.position.column,
      );
    }
  }

  public setDownLeftNeighbor(grid: FieldGrid): void {
    if (
      this.position.row === grid.numberOfRows
      || this.position.column === 1
    ) {
      this.surroundingCells.downRight = null;
    } else {
      this.surroundingCells.downRight = grid.getCellByPosition(
        this.position.row + 1,
        this.position.column - 1,
      );
    }
  }

  public setLeftNeighbor(grid: FieldGrid): void {
    if (this.position.column === 1) {
      this.surroundingCells.up = null;
    } else {
      this.surroundingCells.up = grid.getCellByPosition(
        this.position.row,
        this.position.column - 1,
      );
    }
  }

  public get numberOfSurroundingBombs(): number {
    return Object.values(this.surroundingCells).reduce<number>(
      (accumulator, cell) => {
        return (cell !== null && cell.hasBomb)
          ? accumulator + 1
          : accumulator;
      },
      0,
    );
  }
}