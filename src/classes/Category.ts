import { Container } from "../interfaces/Container";
import { Csv } from "../interfaces/Csv";
import { SubCategory } from "./SubCategory";

export class Category implements Container<SubCategory> {
  private numSubCategories: number;
  public data: Map<string, SubCategory>;
  public total: number;
  public name: string;

  constructor(current: Csv) {
    this.data = new Map<string, SubCategory>();
    this.name = current.Category__c;
    this.numSubCategories = 0;
    this.total = 0;
    this.addNode(current);
  }

  /* Primary Functions */

  public addNode(current: Csv): void {
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

  public proceed(current: Csv): void {
    this.data.get(current.Sub_Category__c)!.addNode(current);
  }

  public addSubCategory(current: Csv): void {
    this.data.set(current.Sub_Category__c, new SubCategory(current));
  }

  /* Getters & Setters */

  public getFeeTotal(): number {
    return this.total;
  }

  public setFeeTotal(childrenSum: number): void {
    this.total = childrenSum;
  }

  public getTotalSubCategories(): number {
    return this.numSubCategories;
  }
}
