import { levels } from "../src/constants/constants";
import { CsvRow } from "../src/interfaces/CsvRow/CsvRow";
import { Department } from "../src/classes/Department/Department";
import { Manager } from "../src/classes/Manager/Manager";

/**
 * Contains a map of <departmentName: string, Department: department Object>
 */

describe("Manager Class", () => {
  let manager: Manager;

  beforeEach(() => {
    manager = new Manager();
  });

  it("Should add a new departmment", () => {
    const row: CsvRow = {
      Id: "1",
      Name: "Muffin Batt - Blueberry Passion",
      Description__c: "Marketing Department",
      Department__c: "Marketing",
      Category__c: "ABM",
      Sub_Category__c: "Cat1",
      Type__c: "TypeC",
      Quantity__c: 2,
      Unit_Price__c: 5,
    };

    manager.addNode(row);
    manager.establishTotals(manager);

    const data: Map<string, levels> = manager.getData();

    expect(data.size).toBe(1);
    expect(manager.getNumChildren()).toBe(1);

    expect(manager.getTotal()).toBe(10);
    expect(manager.getSurchargeTotal()).toBe(11); // 10% surcharge for marketing
  });

  it("Should add two department objects due to different departments on the rows being added", () => {
    const row1: CsvRow = {
      Id: "1",
      Name: "Muffin Batt - Blueberry Passion",
      Description__c: "Marketing Department",
      Department__c: "Marketing",
      Category__c: "ABM",
      Sub_Category__c: "Cat1",
      Type__c: "TypeC",
      Quantity__c: 2,
      Unit_Price__c: 5,
    };

    const row2: CsvRow = {
      Id: "2",
      Name: "Muffin Batt - Blueberry Passion",
      Description__c: "Marketing Department",
      Department__c: "Sales",
      Category__c: "Pre Sales",
      Sub_Category__c: "Cat1",
      Type__c: "TypeC",
      Quantity__c: 2,
      Unit_Price__c: 5,
    };

    manager.addNode(row1);
    manager.addNode(row2);
    manager.establishTotals(manager);

    const data: Map<string, levels> = manager.getData();

    expect(data.size).toBe(2);
    expect(manager.getNumChildren()).toBe(2);

    expect(manager.getTotal()).toBe(20);
    expect(manager.getSurchargeTotal()).toBe(22.5); // 10% surcharge for marketing
  });

  it("Should only add one department object due to same department names between rows", () => {
    const row1: CsvRow = {
      Id: "1",
      Name: "Muffin Batt - Blueberry Passion",
      Description__c: "Sales Department",
      Department__c: "Sales",
      Category__c: "Pre Sales",
      Sub_Category__c: "Cat1",
      Type__c: "TypeC",
      Quantity__c: 2,
      Unit_Price__c: 5,
    };

    const row2: CsvRow = {
      Id: "2",
      Name: "Muffin Batt - Blueberry Passion",
      Description__c: "Sales Department",
      Department__c: "Sales",
      Category__c: "Sales Engineering",
      Sub_Category__c: "Cat1",
      Type__c: "TypeC",
      Quantity__c: 2,
      Unit_Price__c: 5,
    };

    manager.addNode(row1);
    manager.addNode(row2);
    manager.establishTotals(manager);
    const data: Map<string, levels> = manager.getData();

    expect(data.size).toBe(1);

    expect(data.get(row1.Department__c)).toBeInstanceOf(Department);
    expect(manager.getNumChildren()).toBe(1);

    expect(manager.getTotal()).toBe(20);
    expect(manager.getSurchargeTotal()).toBe(23); // 10% surcharge for marketing
  });

  it("Should add no department object, and instead add it into invalidData[]", () => {
    const row: CsvRow = {
      Id: "1",
      Name: "Muffin Batt - Blueberry Passion",
      Description__c: "Marketing Department",
      Department__c: "MarketingABC",
      Category__c: "ABM",
      Sub_Category__c: "Cat1",
      Type__c: "TypeC",
      Quantity__c: 5,
      Unit_Price__c: 5,
    };

    manager.addNode(row);
    manager.establishTotals(manager);
    expect(manager.getData().size).toBe(0);
    expect(manager.getInvalidData().length).toBe(1);
  });

  it("Should be able to get and set its total", () => {
    const row: CsvRow = {
      Id: "1",
      Name: "Muffin Batt - Blueberry Passion",
      Description__c: "Marketing Department",
      Department__c: "Marketing",
      Category__c: "ABM",
      Sub_Category__c: "Cat1",
      Type__c: "TypeC",
      Quantity__c: 5,
      Unit_Price__c: 5,
    };

    manager.addNode(row);
    manager.establishTotals(manager);
    const total = manager.getTotal();
    expect(total).toBe(25);

    manager.setTotal(100);
    expect(manager.getTotal()).toBe(100);
  });

  it("Should be able to get and set its surchargeTotal", () => {
    const row: CsvRow = {
      Id: "1",
      Name: "Muffin Batt - Blueberry Passion",
      Description__c: "Marketing Department",
      Department__c: "Marketing",
      Category__c: "ABM",
      Sub_Category__c: "Cat1",
      Type__c: "TypeC",
      Quantity__c: 2,
      Unit_Price__c: 10,
    };

    manager.addNode(row);
    manager.establishTotals(manager);
    const surchargeTotal = manager.getSurchargeTotal();
    expect(surchargeTotal).toBe(22);

    manager.setSurchargeTotal(100);
    expect(manager.getSurchargeTotal()).toBe(100);
  });

  it("Should have a valid data map", () => {
    expect(manager.getData()).toBeInstanceOf(Map<string, Department>);
  });

  it("Should be able to see how many key:value pairs it has for <departmentName, Department object>", () => {
    expect(manager.getNumChildren()).toBe(manager.getData().size);
  });
});
