import { CsvRow } from "../CsvRow/CsvRow";

export interface Contained {
  /* Primary Functions */

  addRow(current: CsvRow): void;

  printData(): void;

  /* Getters & Setters */

  getTotal(): number;

  getType(): string;

  getDataSize(): number;
}
