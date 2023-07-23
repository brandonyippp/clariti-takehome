import { Contained } from "../../interfaces/Contained/Contained";
import { CsvRow } from "../../interfaces/CsvRow/CsvRow";

export class Type implements Contained {
  private department: string;
  private category: string;
  private subCategory: string;
  private type: string;
  private total: number;
  private data: CsvRow[];

  constructor(current: CsvRow) {
    this.department = current.Department__c;
    this.category = current.Category__c;
    this.subCategory = current.Sub_Category__c;
    this.type = current.Type__c;
    this.total = 0;
    this.data = [];
    this.addRow(current);
  }

  /* Primary Functions */

  public addRow(current: CsvRow): void {
    const quantity: number = current.Quantity__c;
    const unitPrice: number = current.Unit_Price__c;

    this.data.push(current);
    this.total += unitPrice * quantity;
  }

  /* Displays all .csv data for current hierarchy bucket
    (e.g)
      -Development
        -Coding
          -Cat1
            -TypeA
  */
  public printData(): void {
    this.printDataIntro();
    for (let i = 0; i < this.data.length; i++) {
      this.printDataFields(i);
    }
    console.log(`\n`);
  }

  /* Helper Functions */

  private printDataIntro(): void {
    console.log(
      `Data for the following section:\n\tDepartment: ${this.department}\n\tCategory: ${this.category}\n\tSubcategory: ${this.subCategory}\n\tType: ${this.type}`
    );
  }

  private printDataFields(i: number): void {
    console.log(
      `Id: ${this.data[i].Id}, Name: ${this.data[i].Name}, Quantity: ${this.data[i].Quantity__c}, Unit Price: ${this.data[i].Unit_Price__c}`
    );
  }

  /* Getters & Setters */

  public getTotal(): number {
    return this.total;
  }

  public getType(): string {
    return this.type;
  }

  // Returns number of .csv rows that were labelled as either Type<A/B/C>
  public getDataSize(): number {
    return this.data.length;
  }
}
