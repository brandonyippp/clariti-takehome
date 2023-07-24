import {
  isPermittedCategory,
  determineSurcharge,
} from "../../constants/constants";
import { DepartmentSurcharge } from "../../interfaces/Surcharge/Surcharge";
import { Container } from "../../interfaces/Container/Container";
import { CsvRow } from "../../interfaces/CsvRow/CsvRow";
import { Category } from "../Category/Category";

export class Department implements Container<Category> {
  private surcharge: DepartmentSurcharge;
  private data: Map<string, Category>;
  private numCategories: number;
  private invalidData: CsvRow[];
  private total: number;
  private surchargeTotal: number;
  private name: string;

  constructor(current: CsvRow, invalidData: CsvRow[]) {
    this.surcharge = determineSurcharge(current.Department__c);
    this.data = new Map<string, Category>();
    this.name = current.Department__c;
    this.invalidData = invalidData;
    this.surchargeTotal = 0;
    this.numCategories = 0;
    this.total = 0;
    this.addNode(current);
  }

  /* Primary Functions */

  public addNode(current: CsvRow): void {
    const department: string = current.Department__c;
    const category: string = current.Category__c;

    if (!isPermittedCategory(category, department)) {
      this.processInvalidData(current);
    } else if (this.data.has(category)) {
      this.proceed(current);
    } else if (!this.data.has(category)) {
      this.addCategory(current);
    } else {
      //TODO: Probably won't happen, but maybe think of something to do here
      console.log(`Department ${department} failed to add ${category}.`);
    }
  }

  /* Helper Functions */

  private proceed(current: CsvRow): void {
    this.data.get(current.Category__c)!.addNode(current);
  }

  private addCategory(current: CsvRow): void {
    this.data.set(current.Category__c, new Category(current));
  }

  private processInvalidData(current: CsvRow): void {
    this.invalidData.push({
      ...current,
      reason: `Category ${current.Category__c} not valid for Department ${current.Department__c}.`,
    });
  }

  /* Getters & Setters */

  public getTotal(): number {
    return this.total;
  }

  public setTotal(childrenSum: number): void {
    this.total = childrenSum;

    if (this.surcharge.addPercentage) {
      this.surchargeTotal =
        childrenSum + this.total * this.surcharge.surchargeAmount;
    } else {
      this.surchargeTotal =
        childrenSum - this.total * this.surcharge.surchargeAmount;
    }
  }

  public getSurchargeTotal(): number {
    return this.surchargeTotal;
  }

  public getName(): string {
    return this.name;
  }

  public getData(): Map<string, Category> {
    return this.data;
  }

  public getNumChildren(): number {
    return this.numCategories;
  }
}
