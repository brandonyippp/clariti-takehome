import { calculateSurcharge } from "../../constants/constants";
import { Contained } from "../../interfaces/Contained/Contained";
import { CsvRow } from "../../interfaces/CsvRow/CsvRow";

export class Type implements Contained {
  private surchargeTotal: number;
  private invalidData: CsvRow[];
  private subCategory: string;
  private department: string;
  private category: string;
  private data: CsvRow[];
  private total: number;
  private type: string;

  constructor(current: CsvRow, invalidData: CsvRow[]) {
    this.subCategory = current.Sub_Category__c;
    this.department = current.Department__c;
    this.category = current.Category__c;
    this.invalidData = invalidData;
    this.type = current.Type__c;
    this.surchargeTotal = 0;
    this.total = 0;
    this.data = [];
    this.addRow(current);
  }

  /* Primary Functions */

  public addRow(current: CsvRow): void {
    const unitPrice: number = current.Unit_Price__c;
    const quantity: number = current.Quantity__c;

    const feeTotal = unitPrice * quantity;

    /**
     * If the quantity * unitPrice was negative, don't add it into the current bucket
     */
    if (feeTotal < 0) {
      this.invalidData.push({
        ...current,
        reason: `Unit price (${unitPrice}) * quantity(${quantity}) was a negative value.`,
      });
    } else {
      this.total += feeTotal;
      this.surchargeTotal = calculateSurcharge(this.total, this.department);
      this.data.push(current);
    }
  }

  /* Helper Functions */

  /* Getters & Setters */

  public getTotal(): number {
    return this.total;
  }

  public getSurchargeTotal(): number {
    return this.surchargeTotal;
  }

  // Returns number of .csv rows that were labelled as either Type<A/B/C>
  public getDataSize(): number {
    return this.data.length;
  }

  public getDepartment(): string {
    return this.department;
  }

  public getCategory(): string {
    return this.category;
  }

  public getSubCategory(): string {
    return this.subCategory;
  }

  public getType(): string {
    return this.type;
  }

  public getData(): CsvRow[] {
    return this.data;
  }
}
