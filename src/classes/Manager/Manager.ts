import {
  Departments,
  getAllEnumValuesAsString,
  levels,
} from "../../constants/constants";
import { Container } from "../../interfaces/Container/Container";
import { CsvRow } from "../../interfaces/CsvRow/CsvRow";
import { Department } from "../Department/Department";
import { Type } from "../Type/Type";

export class Manager implements Container<Department> {
  private data: Map<string, Department>;
  private numDepartments: number;
  private invalidData: CsvRow[];
  private surchargeTotal: number;
  private total: number;

  constructor() {
    this.data = new Map<string, Department>();
    this.numDepartments = 0;
    this.invalidData = [];
    this.surchargeTotal = 0;
    this.total = 0;
  }

  /* Primary Functions */

  public addNode(current: CsvRow): void {
    const department: string = current.Department__c;

    if (!Object.values(Departments).includes(department as Departments)) {
      this.processInvalidData(current);
    } else if (this.data.has(department)) {
      this.proceed(current);
    } else if (!this.data.has(department)) {
      this.addDepartment(current);
    } else {
      //TODO: Probably won't happen, but maybe think of something to do here
      console.log(`Manager failed to add ${department}.`);
    }
  }

  public establishTotals(levelObj: levels): {
    total: number;
    surchargeTotal: number;
  } {
    // Adjust to bottom levelObj of hierarchy as needed
    if (levelObj instanceof Type) {
      return {
        total: levelObj.getTotal(),
        surchargeTotal: levelObj.getSurchargeTotal(),
      };
    }

    let total: number = 0;
    let surchargeTotal: number = 0;
    const currentLevelData: Map<string, levels> = levelObj.getData();

    currentLevelData.forEach((value: levels, key: string) => {
      const obj = this.establishTotals(currentLevelData.get(key)!);
      total += obj.total;
      surchargeTotal += obj.surchargeTotal;
    });

    levelObj.setTotal(total);
    levelObj.setSurchargeTotal(surchargeTotal);
    return { total, surchargeTotal };
  }

  /* Print any .csv rows that either:
      - Don't have a valid department (e.g Department "Kentucky")
      - Don't have a category that is permitted within a Department (e.g "ABM" Category in Development Department)
      - Subject to requirements alterations -> Adjust accordingly in constants.ts
  */
  public printInvalidData(): void {
    console.log(`Invalid data found in file:`);
    for (let i = 0; i < this.invalidData.length; i++) {
      this.printInvalidDataFields(i);
    }
    console.log(`\n`);
  }

  /* Helper Functions */

  public proceed(current: CsvRow): void {
    this.data.get(current.Department__c)!.addNode(current);
  }

  public addDepartment(current: CsvRow): void {
    this.data.set(
      current.Department__c,
      new Department(current, this.invalidData)
    );
    this.numDepartments++;
  }

  public processInvalidData(current: CsvRow): void {
    this.invalidData.push({
      ...current,
      reason: `Department ${
        current.Department__c
      } not any of ${getAllEnumValuesAsString(Departments)}.`,
    });
  }

  private printInvalidDataFields(i: number): void {
    console.log(
      `Id: ${this.invalidData[i].Id}, Name: ${this.invalidData[i].Name}, Reason: ${this.invalidData[i].reason}`
    );
  }

  /* Getters & Setters */

  public getTotal(): number {
    return this.total;
  }

  public setTotal(childrenSum: number): void {
    this.total = childrenSum;
  }

  public setSurchargeTotal(childrenSum: number): void {
    this.surchargeTotal = childrenSum;
  }

  public getSurchargeTotal(): number {
    return this.surchargeTotal;
  }

  public getData(): Map<string, Department> {
    return this.data;
  }

  public getNumChildren(): number {
    return this.numDepartments;
  }
}
