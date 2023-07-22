import { Contained } from "../interfaces/Contained";
import { Csv } from "../interfaces/Csv";

export class Type implements Contained {
  public description: string;
  public total: number;
  public name: string;
  public data: Csv[];
  public id: string;

  constructor(current: Csv) {
    this.description = current.Description__c;
    this.name = current.Type__c;
    this.id = current.Id;
    this.total = 0;
    this.data = [];
    this.addRow(current);
  }

  /* Primary Functions */

  public addRow(current: Csv): void {
    const quantity: number = current.Quantity__c;
    const unitPrice: number = current.Unit_Price__c;

    this.data.push(current);
    this.total += unitPrice * quantity;
  }

  /* Helper Functions */

  /* Getters & Setters */

  public getFeeTotal(): number {
    return this.total;
  }
}
