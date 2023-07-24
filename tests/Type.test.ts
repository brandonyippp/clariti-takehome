import { CsvRow } from "../src/interfaces/CsvRow/CsvRow";
import { SubCategory } from "../src/classes/SubCategory/SubCategory";
import { Department } from "../src/classes/Department/Department";
import { Category } from "../src/classes/Category/Category";
import { Manager } from "../src/classes/Manager/Manager";
import { Type } from "../src/classes/Type/Type";

/**
 * Contains an array CsvRow[], containing every element that matches the Department && Category && SubCategory && Type
 */

describe("Type Class", () => {
  let manager: Manager;
  let department: Department | undefined;
  let category: Category | undefined;
  let subCategory: SubCategory | undefined;
  let type: Type | undefined;

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
    type = subCategory?.getData().get(row.Type__c);
  });

  it("Should have a defined type object that will store every row that matches", () => {
    expect(type).toBeDefined();
    expect(type?.getDataSize()).toBe(1);
  });

  it("Should have two elements in its data[] array if another row with the same department, category, subcategory, and type is added", () => {
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

    expect(type?.getDataSize()).toBe(2);
  });

  it("Should be able to get its total", () => {
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
    type = subCategory?.getData().get(row.Type__c);

    expect(type?.getTotal()).toBe(20);
  });

  it("Should be able to get its surchargeTotal", () => {
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
    type = subCategory?.getData().get(row.Type__c);

    expect(type?.getSurchargeTotal()).toBe(24);
  });

  it("Should know what Department, Category, SubCategory, and Type it belongs to", () => {
    expect(type?.getDepartment()).toBe("Development");
    expect(type?.getCategory()).toBe("Coding");
    expect(type?.getSubCategory()).toBe("Cat1");
    expect(type?.getType()).toBe("TypeC");
  });
});
