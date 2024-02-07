import { GridCell } from "./GridCell";
import { GridCellPosition } from "./GridCellPosition.interface";

export class FieldGrid {
  public numberOfRows: number;

  public numberOfColumns: number;

  public rows: GridCell[][];

  public constructor(numberOfLines: number, numberOfColumns: number) {
    this.numberOfRows = numberOfLines;
    this.numberOfColumns = numberOfColumns;

    this.rows = [];

    for (let row = 1; row <= numberOfLines; row += 1) {
      this.rows.push([]);

      for (let column = 1; column <= numberOfColumns; column += 1) {
        const hasBomb = Math.random() > 0.8;
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
