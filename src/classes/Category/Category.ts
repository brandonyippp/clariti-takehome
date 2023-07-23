import { Container } from "../../interfaces/Container/Container";
import { CsvRow } from "../../interfaces/CsvRow/CsvRow";
import { SubCategory } from "../SubCategory/SubCategory";

export class Category implements Container<SubCategory> {
  private data: Map<string, SubCategory>;
  private numSubCategories: number;
  private total: number;
  private name: string;

  constructor(current: CsvRow) {
    this.data = new Map<string, SubCategory>();
    this.name = current.Category__c;
    this.numSubCategories = 0;
    this.total = 0;
    this.addNode(current);
  }

  /* Primary Functions */

  public addNode(current: CsvRow): void {
    const category: string = current.Category__c;
    const subCategory: string = current.Sub_Category__c;

    if (this.data.has(subCategory)) {
      this.proceed(current);
    } else if (!this.data.has(category)) {
      this.addSubCategory(current);
    } else {
      //TODO: Probably won't happen, but maybe think of something to do here
      console.log(`Category ${category} failed to add ${subCategory}.`);
    }
  }

  /* Helper Functions */

  private proceed(current: CsvRow): void {
    this.data.get(current.Sub_Category__c)!.addNode(current);
  }

  private addSubCategory(current: CsvRow): void {
    this.data.set(current.Sub_Category__c, new SubCategory(current));
  }

  /* Getters & Setters */

  public getTotal(): number {
    return this.total;
  }

  public setTotal(childrenSum: number): void {
    this.total = childrenSum;
  }

  public getName(): string {
    return this.name;
  }

  public getData(): Map<string, SubCategory> {
    return this.data;
  }

  public getNumChildren(): number {
    return this.numSubCategories;
  }
}
