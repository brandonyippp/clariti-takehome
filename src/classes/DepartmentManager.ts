import { Departments, getAllEnumValuesAsString } from "../constants/constants";
import { Container } from "../interfaces/Container";
import { Csv } from "../interfaces/Csv";
import { Department } from "./Department";

export class DepartmentManager implements Container<Department> {
  private numDepartments: number;
  private invalidData: Csv[];
  public data: Map<string, Department>;
  public total: number;

  constructor() {
    this.data = new Map<string, Department>();
    this.numDepartments = 0;
    this.invalidData = [];
    this.total = 0;
  }

  /* Primary Functions */

  public addNode(current: Csv): void {
    const department: string = current.Department__c;

    if (!(department in Departments)) {
      this.addInvalidData(current);
    } else if (this.data.has(department)) {
      this.proceed(current);
    } else if (!this.data.has(department)) {
      this.addDepartment(current);
    } else {
      //TODO: Probably won't happen, but maybe think of something to do here
      console.log(`DepartmentManager failed to add ${department}.`);
    }
  }

  /* Helper Functions */

  public proceed(current: Csv): void {
    this.data.get(current.Department__c)!.addNode(current);
  }

  public addDepartment(current: Csv): void {
    this.data.set(
      current.Department__c,
      new Department(current, this.invalidData)
    );
  }

  public addInvalidData(current: Csv): void {
    this.invalidData.push({
      ...current,
      reason: `Department ${
        current.Department__c
      } not any of ${getAllEnumValuesAsString(Departments)}.`,
    });
  }

  /* Getters & Setters */

  public getFeeTotal(): number {
    return this.total;
  }

  public setFeeTotal(childrenSum: number): void {
    this.total = childrenSum;
  }

  public getTotalDepartments(): number {
    return this.numDepartments;
  }
}

/**
 * Each addNode function should chain to one another
 * e.g pass in departmentName first, if manager.map does not contain this key, call addNode function in manager
 * Then the constructor (? probably) should call the addnode function to create the category etc.
 *
 * Pass the .csv row into each constructor so each level can create the necessary value for its map
 * e.g manager should pass the department name into the department constructor
 */
