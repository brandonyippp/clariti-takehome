import { Container } from "../../interfaces/Container/Container";
import { CsvRow } from "../../interfaces/CsvRow/CsvRow";
import { SubCategory } from "../SubCategory/SubCategory";

export class Category implements Container<SubCategory> {
  private data: Map<string, SubCategory>;
  private numSubCategories: number;
  private surchargeTotal: number;
  private invalidData: CsvRow[];
  private department: string;
  private category: string;
  private total: number;

  constructor(current: CsvRow, invalidData: CsvRow[]) {
    this.data = new Map<string, SubCategory>();
    this.department = current.Department__c;
    this.category = current.Category__c;
    this.invalidData = invalidData;
    this.numSubCategories = 0;
    this.surchargeTotal = 0;
    this.total = 0;
    this.addNode(current);
  }

  /* Primary Functions */

  public addNode(current: CsvRow): void {
    const subCategory: string = current.Sub_Category__c;

    if (this.data.has(subCategory)) {
      this.proceed(current);
    } else if (!this.data.has(subCategory)) {
      this.addSubCategory(current);
      this.numSubCategories++;
    } else {
      throw new Error(`Failed to add JSON.stringify${current}`);
    }
  }

  /* Helper Functions */

  private proceed(current: CsvRow): void {
    this.data.get(current.Sub_Category__c)!.addNode(current);
  }

  private addSubCategory(current: CsvRow): void {
    this.data.set(
      current.Sub_Category__c,
      new SubCategory(current, this.invalidData)
    );
  }

  /* Getters & Setters */

  public getTotal(): number {
    return this.total;
  }

  public setTotal(childrenSum: number): void {
    this.total = childrenSum;
  }

  public getSurchargeTotal(): number {
    return this.surchargeTotal;
  }

  public setSurchargeTotal(childrenSum: number): void {
    this.surchargeTotal = childrenSum;
  }

  public getCategory(): string {
    return this.category;
  }

  public getData(): Map<string, SubCategory> {
    return this.data;
  }

  public getNumChildren(): number {
    return this.numSubCategories;
  }

  public getDepartment(): string {
    return this.department;
  }
}
