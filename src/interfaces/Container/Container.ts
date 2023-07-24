import { levels } from "../../constants/constants";
import { CsvRow } from "../CsvRow/CsvRow";

export interface Container<T> {
  /* Primary Functions */

  addNode(current: CsvRow): void;

  /* Getters & Setters */

  getTotal(): number; // Fee total

  setTotal(childrenSum: number): void; // Fee total

  getSurchargeTotal(): number; // Fee Total +/- surcharge %

  setSurchargeTotal(childrenSum: number): void; // Fee Total +/- surcharge %

  getData(): Map<string, levels>; // Hashmap between <string, Department | Category | SubCategory | Type>

  getNumChildren(): number; // Number of containers contained within current level (e.g Department contains 2 Categories)

  getDepartment?(): string;
}
