import { Csv } from "../interfaces/Csv";

export interface Container<T> {
  name?: string | null; //Name of the current heading, (i.e) Current .csv row department name / category name / sub-category name
  total: number; //Fee Total of the current level (e.g DepartmentManager total === Fee Total of all of its categories)
  data: Map<string, T>;

  /** Edge cases
   * Department -> Check 'name' for valid category for that department
   * Category & Sub-category -> Check 'name' for valid sub-category and type respectively
   */
  addNode(current: Csv): void;

  getFeeTotal(): number;

  setFeeTotal(childrenSum: number): void;
}
