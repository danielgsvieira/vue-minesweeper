import { GridCell } from './GridCell';
import { GridCellPosition } from './GridCellPosition.interface';
import { MinesweeperDifficulty } from './MinesweeperDfficulty.type';

export class FieldGrid {
  public numberOfRows: number;

  public numberOfColumns: number;

  public rows: GridCell[][];

  public constructor(difficulty: MinesweeperDifficulty) {
    let bombDensity = 0
    switch (difficulty) {
      case 'easy':
        this.numberOfRows = 10;
        this.numberOfColumns = 10;
        bombDensity = 0.1;
        break;

      case 'medium':
        this.numberOfRows = 16;
        this.numberOfColumns = 16;
        bombDensity = 0.16;
        break;

      case 'hard':
        this.numberOfRows = 22;
        this.numberOfColumns = 22;
        bombDensity = 0.2;
        break;
    }

    this.rows = [];

    for (let row = 1; row <= this.numberOfRows; row += 1) {
      this.rows.push([]);

      for (let column = 1; column <= this.numberOfColumns; column += 1) {
        const hasBomb = Math.random() < bombDensity;
        const position: GridCellPosition = { row, column };

        const cell = new GridCell(hasBomb, position);

        this.rows[row - 1].push(cell);
      }
    }

    this.rows.forEach((row) => {
      row.forEach((cell) => {
        cell.setSurroundingCells(this);
      });
    });
  }

  public get cells(): GridCell[] {
    return this.rows.reduce((accumulator, row) => {
      return [...accumulator, ...row];
    }, []);
  };

  public getCellByPosition(row: number, column: number): GridCell {
    if (row > this.numberOfRows || column > this.numberOfColumns) {
      throw new Error('Invalid position for a cell');
    }

    return this.rows[row - 1][column - 1];
  }
}
