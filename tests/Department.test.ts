import { CsvRow } from "../src/interfaces/CsvRow/CsvRow";
import { Department } from "../src/classes/Department/Department";
import { Category } from "../src/classes/Category/Category";
import { Manager } from "../src/classes/Manager/Manager";

/**
 * Contains a map of <categoryName: string, Category: category Object>
 */

describe("Department Class", () => {
  let manager: Manager;
  let department: Department | undefined;

  beforeEach(() => {
    const row: CsvRow = {
      Id: "1",
      Name: "Muffin Batt - Blueberry Passion",
      Description__c: "Development Department",
      Department__c: "Development",
      Category__c: "Coding",
      Sub_Category__c: "Cat1",
      Type__c: "TypeC",
      Quantity__c: 2,
      Unit_Price__c: 5,
    };

    manager = new Manager();
    manager.addNode(row);
    manager.establishTotals(manager);

    department = manager.getData().get(row.Department__c);
  });

  it("Should have a defined Department object that has a map between categoryName and Category object", () => {
    expect(department).toBeDefined();
    expect(department!.getData()).toBeDefined();
  });

  it("Should have two categories after adding another row of the same department but different category", () => {
    const row: CsvRow = {
      Id: "1",
      Name: "Muffin Batt - Blueberry Passion",
      Description__c: "Development Department",
      Department__c: "Development",
      Category__c: "Quality Assurance",
      Sub_Category__c: "Cat1",
      Type__c: "TypeC",
      Quantity__c: 2,
      Unit_Price__c: 5,
    };

    manager.addNode(row);
    manager.establishTotals(manager);

    expect(department?.getNumChildren()).toBe(2);
  });

  it("Should have one category after trying to add a row that has a category not belonging to the department mentioned", () => {
    const row: CsvRow = {
      Id: "1",
      Name: "Muffin Batt - Blueberry Passion",
      Description__c: "Development Department",
      Department__c: "Development",
      Category__c: "ABM", //Marketing department
      Sub_Category__c: "Cat1",
      Type__c: "TypeC",
      Quantity__c: 2,
      Unit_Price__c: 5,
    };

    manager.addNode(row);
    manager.establishTotals(manager);

    expect(department?.getData().size).toBe(1);
    expect(department?.getNumChildren()).toBe(1);

    expect(manager.getInvalidData().length).toBe(1);
  });

  it("Should be able to get and set its total", () => {
    const row: CsvRow = {
      Id: "1",
      Name: "Muffin Batt - Blueberry Passion",
      Description__c: "Development Department",
      Department__c: "Development",
      Category__c: "Quality Assurance",
      Sub_Category__c: "Cat1",
      Type__c: "TypeC",
      Quantity__c: 2,
      Unit_Price__c: 5,
    };

    manager.addNode(row);
    manager.establishTotals(manager);

    expect(department?.getTotal()).toBe(20);

    department?.setTotal(department?.getTotal() - 1);

    const oldTotal = manager.getTotal();
    manager.establishTotals(manager);
    const newTotal = manager.getTotal();

    expect(newTotal).toBe(oldTotal);
  });

  it("Should be able to get and set its surchargeTotal", () => {
    const row: CsvRow = {
      Id: "1",
      Name: "Muffin Batt - Blueberry Passion",
      Description__c: "Development Department",
      Department__c: "Development",
      Category__c: "Quality Assurance",
      Sub_Category__c: "Cat1",
      Type__c: "TypeC",
      Quantity__c: 2,
      Unit_Price__c: 5,
    };

    manager.addNode(row);
    manager.establishTotals(manager);

    expect(department?.getSurchargeTotal()).toBe(24);

    department?.setSurchargeTotal(department?.getSurchargeTotal() - 1);

    const oldTotal = manager.getSurchargeTotal();
    manager.establishTotals(manager);
    const newTotal = manager.getSurchargeTotal();

    expect(newTotal).toBe(oldTotal);
  });

  it("Should know what department it belongs to", () => {
    expect(department?.getDepartment()).toBe("Development");
  });

  it("Should have a valid data map", () => {
    expect(department?.getData()).toBeInstanceOf(Map<string, Category>);
  });
});
