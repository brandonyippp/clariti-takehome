import { Container } from "../interfaces/Container";
import { Csv } from "../interfaces/Csv";
import { Type } from "./Type";

export class SubCategory implements Container<Type> {
  private numTypes: number;
  public data: Map<string, Type>;
  public total: number;
  public name: string;

  constructor(current: Csv) {
    this.name = current.Sub_Category__c;
    this.data = new Map<string, Type>();
    this.numTypes = 0;
    this.total = 0;
    this.addNode(current);
  }

  /* Primary Functions */

  addNode(current: Csv): void {
    const subCategory: string = current.Sub_Category__c;
    const type: string = current.Type__c;

    if (this.data.has(type)) {
      this.proceed(current);
    } else if (!this.data.has(type)) {
      this.addType(current);
    } else {
      //TODO: Probably won't happen, but maybe think of something to do here
      console.log(`Sub-category ${subCategory} failed to add ${type}.`);
    }
  }

  /* Helper Functions */

  proceed(current: Csv): void {
    this.data.get(current.Type__c)!.addRow(current);
  }

  addType(current: Csv): void {
    this.data.set(current.Type__c, new Type(current));
  }

  /* Getters & Setters */

  getFeeTotal(): number {
    return this.total;
  }

  setFeeTotal(childrenSum: number): void {
    this.total = childrenSum;
  }

  getTotalTypes(): number {
    return this.numTypes;
  }
}
