import { Container } from "../../interfaces/Container/Container";
import { CsvRow } from "../../interfaces/CsvRow/CsvRow";
import { Type } from "../Type/Type";

export class SubCategory implements Container<Type> {
  private data: Map<string, Type>;
  private numTypes: number;
  private total: number;
  private name: string;

  constructor(current: CsvRow) {
    this.name = current.Sub_Category__c;
    this.data = new Map<string, Type>();
    this.numTypes = 0;
    this.total = 0;
    this.addNode(current);
  }

  /* Primary Functions */

  public addNode(current: CsvRow): void {
    const subCategory: string = current.Sub_Category__c;
    const type: string = current.Type__c;

    if (this.data.has(type)) {
      this.proceed(current);
    } else if (!this.data.has(type)) {
      this.addType(current);
      this.numTypes++;
    } else {
      //TODO: Probably won't happen, but maybe think of something to do here
      console.log(`Subcategory ${subCategory} failed to add ${type}.`);
    }
  }

  /* Helper Functions */

  private proceed(current: CsvRow): void {
    this.data.get(current.Type__c)!.addRow(current);
  }

  private addType(current: CsvRow): void {
    this.data.set(current.Type__c, new Type(current));
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
}
