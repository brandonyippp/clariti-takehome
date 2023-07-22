import { isPermittedCategory } from "../constants/constants";
import { Container } from "../interfaces/Container";
import { Csv } from "../interfaces/Csv";
import { Category } from "./Category";

export class Department implements Container<Category> {
  private numCategories: number;
  private invalidData: Csv[];
  public data: Map<string, Category>;
  public total: number;
  public name: string;

  constructor(current: Csv, invalidData: Csv[]) {
    this.data = new Map<string, Category>();
    this.name = current.Department__c;
    this.invalidData = invalidData;
    this.numCategories = 0;
    this.total = 0;
    this.addNode(current);
  }

  /* Primary Functions */

  public addNode(current: Csv): void {
    const department: string = current.Department__c;
    const category: string = current.Category__c;

    if (!isPermittedCategory(category, department)) {
      this.addInvalidData(current);
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

  public proceed(current: Csv): void {
    this.data.get(current.Category__c)!.addNode(current);
  }

  public addCategory(current: Csv): void {
    this.data.set(current.Category__c, new Category(current));
  }

  public addInvalidData(current: Csv): void {
    this.invalidData.push({
      ...current,
      reason: `Category ${current.Category__c} not valid for Department ${current.Department__c}.`,
    });
  }

  /* Getters & Setters */

  public getFeeTotal(): number {
    return this.total;
  }

  public setFeeTotal(childrenSum: number): void {
    this.total = childrenSum;
  }

  public setTotal(childrenSum: number): void {
    this.total = childrenSum;
  }

  public getTotalCategories(): number {
    return this.numCategories;
  }
}
