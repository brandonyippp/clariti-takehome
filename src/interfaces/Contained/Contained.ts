import { CsvRow } from "../CsvRow/CsvRow";

export interface Contained {
  /* Primary Functions */

  addRow(current: CsvRow): void;

  /* Getters & Setters */

  getTotal(): number;

  getType(): string;

  getData(): CsvRow[];

  getDataSize(): number;

  getDepartment(): string;
}
