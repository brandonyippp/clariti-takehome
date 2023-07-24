import { Container } from "../../interfaces/Container/Container";
import { CsvRow } from "../../interfaces/CsvRow/CsvRow";
import { Type } from "../Type/Type";

export class SubCategory implements Container<Type> {
  private data: Map<string, Type>;
  private surchargeTotal: number;
  private invalidData: CsvRow[];
  private subCategory: string;
  private department: string;
  private category: string;
  private numTypes: number;
  private total: number;

  constructor(current: CsvRow, invalidData: CsvRow[]) {
    this.subCategory = current.Sub_Category__c;
    this.department = current.Department__c;
    this.category = current.Category__c;
    this.data = new Map<string, Type>();
    this.invalidData = invalidData;
    this.surchargeTotal = 0;
    this.numTypes = 0;
    this.total = 0;
    this.addNode(current);
  }

  /* Primary Functions */

  public addNode(current: CsvRow): void {
    const type: string = current.Type__c;

    if (this.data.has(type)) {
      this.proceed(current);
    } else if (!this.data.has(type)) {
      this.addType(current);
      this.numTypes++;
    } else {
      throw new Error(`Failed to add JSON.stringify${current}`);
    }
  }

  /* Helper Functions */

  private proceed(current: CsvRow): void {
    this.data.get(current.Type__c)!.addRow(current);
  }

  private addType(current: CsvRow): void {
    this.data.set(current.Type__c, new Type(current, this.invalidData));
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

  public getSubCategory(): string {
    return this.subCategory;
  }

  public getData(): Map<string, Type> {
    return this.data;
  }

  // Returns number of types that exist within this subcategory
  public getNumChildren(): number {
    return this.numTypes;
  }

  // Returns number of .csv rows that were grouped into this specific subcategory
  public getNumRows(): number {
    let res: number = 0;

    this.data.forEach(
      (value: Type, key: string) => (res += this.data.get(key)!.getDataSize())
    );

    return res;
  }

  public getDepartment(): string {
    return this.department;
  }

  public getCategory(): string {
    return this.category;
  }
}
