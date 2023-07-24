import { CsvRow } from "../src/interfaces/CsvRow/CsvRow";
import { SubCategory } from "../src/classes/SubCategory/SubCategory";
import { Department } from "../src/classes/Department/Department";
import { Category } from "../src/classes/Category/Category";
import { Manager } from "../src/classes/Manager/Manager";

/**
 * Contains a map of <subCategoryName: string, subCategory: SubCategory Object>
 */

describe("Category Class", () => {
  let manager: Manager;
  let department: Department | undefined;
  let category: Category | undefined;

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
  });

  it("Should have a defined Category object that has a map between categoryName and Category object", () => {
    expect(category).toBeDefined();
    expect(category!.getData()).toBeDefined();
  });

  it("Should have two subcategories after adding another row of the same department and category, but different subcategories", () => {
    const row: CsvRow = {
      Id: "1",
      Name: "Muffin Batt - Blueberry Passion",
      Description__c: "Development Department",
      Department__c: "Development",
      Category__c: "Coding",
      Sub_Category__c: "Cat2",
      Type__c: "TypeC",
      Quantity__c: 2,
      Unit_Price__c: 5,
    };

    manager.addNode(row);
    manager.establishTotals(manager);

    expect(category?.getNumChildren()).toBe(2);
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
    category = department?.getData().get(row.Category__c);

    expect(category?.getTotal()).toBe(10);

    category?.setTotal(category?.getTotal() - 1);

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
    category = department?.getData().get(row.Category__c);

    expect(category?.getSurchargeTotal()).toBe(12);

    category?.setSurchargeTotal(category?.getSurchargeTotal() - 1);

    const oldTotal = manager.getSurchargeTotal();
    manager.establishTotals(manager);
    const newTotal = manager.getSurchargeTotal();

    expect(newTotal).toBe(oldTotal);
  });

  it("Should have a valid data map", () => {
    expect(category?.getData()).toBeInstanceOf(Map<string, SubCategory>);
  });

  it("Should know what Department and Category it belongs to", () => {
    expect(category?.getDepartment()).toBe("Development");
    expect(category?.getCategory()).toBe("Coding");
  });
});
