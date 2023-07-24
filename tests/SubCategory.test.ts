import { CsvRow } from "../src/interfaces/CsvRow/CsvRow";
import { SubCategory } from "../src/classes/SubCategory/SubCategory";
import { Department } from "../src/classes/Department/Department";
import { Category } from "../src/classes/Category/Category";
import { Manager } from "../src/classes/Manager/Manager";
import { Type } from "../src/classes/Type/Type";

/**
 * Contains a map of <typeName: string, type: Type Object>
 */

describe("SubCategory Class", () => {
  let manager: Manager;
  let department: Department | undefined;
  let category: Category | undefined;
  let subCategory: SubCategory | undefined;

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
    category = department?.getData().get(row.Category__c);
    subCategory = category?.getData().get(row.Sub_Category__c);
  });

  it("Should have a defined SubCategory object that has a map between subCategoryName and SubCategory object", () => {
    expect(subCategory).toBeDefined();
    expect(subCategory!.getData()).toBeDefined();
  });

  it("Should have two types after adding another row of the same department, category, and subcategory, but different types", () => {
    const row: CsvRow = {
      Id: "1",
      Name: "Muffin Batt - Blueberry Passion",
      Description__c: "Development Department",
      Department__c: "Development",
      Category__c: "Coding",
      Sub_Category__c: "Cat1",
      Type__c: "TypeA",
      Quantity__c: 2,
      Unit_Price__c: 5,
    };

    manager.addNode(row);
    manager.establishTotals(manager);

    expect(subCategory?.getNumChildren()).toBe(2);
  });

  it("Should be able to get and set its total", () => {
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

    manager.addNode(row);
    manager.establishTotals(manager);
    subCategory = category?.getData().get(row.Sub_Category__c);

    expect(subCategory?.getTotal()).toBe(20);

    subCategory?.setTotal(subCategory?.getTotal() - 1);

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
      Category__c: "Coding",
      Sub_Category__c: "Cat1",
      Type__c: "TypeC",
      Quantity__c: 2,
      Unit_Price__c: 5,
    };

    manager.addNode(row);
    manager.establishTotals(manager);
    subCategory = category?.getData().get(row.Sub_Category__c);

    expect(subCategory?.getSurchargeTotal()).toBe(24);

    subCategory?.setSurchargeTotal(subCategory?.getSurchargeTotal() - 1);

    const oldTotal = manager.getSurchargeTotal();
    manager.establishTotals(manager);
    const newTotal = manager.getSurchargeTotal();

    expect(newTotal).toBe(oldTotal);
  });

  it("Should have a valid data map", () => {
    expect(subCategory?.getData()).toBeInstanceOf(Map<string, Type>);
  });

  it("Should know what Department, Category, and SubCategory it belongs to", () => {
    expect(subCategory?.getDepartment()).toBe("Development");
    expect(subCategory?.getCategory()).toBe("Coding");
    expect(subCategory?.getSubCategory()).toBe("Cat1");
  });
});
