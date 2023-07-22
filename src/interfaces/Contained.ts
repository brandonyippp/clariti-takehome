import { Csv } from "./Csv";

export interface Contained {
  id: string;
  description: string;
  name: string;
  total: number;
  data: Csv[];

  addRow(current: Csv): void;

  getFeeTotal(): number;
}
