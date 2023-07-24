import { Container } from "../../interfaces/Container/Container";
import { CsvRow } from "../../interfaces/CsvRow/CsvRow";
import { SubCategory } from "../SubCategory/SubCategory";

export class Category implements Container<SubCategory> {
  private data: Map<string, SubCategory>;
  private numSubCategories: number;
  private surchargeTotal: number;
  private total: number;
  private department: string;
  private category: string;

  constructor(current: CsvRow, department: string) {
    this.data = new Map<string, SubCategory>();
    this.department = current.Department__c;
    this.category = current.Category__c;
    this.numSubCategories = 0;
    this.surchargeTotal = 0;
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
      this.numSubCategories++;
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
