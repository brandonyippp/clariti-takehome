import { DepartmentSurcharge } from "../interfaces/Surcharge/Surcharge";
import { Manager } from "../classes/Manager/Manager";
import { Department } from "../classes/Department/Department";
import { Category } from "../classes/Category/Category";
import { SubCategory } from "../classes/SubCategory/SubCategory";
import { Type } from "../classes/Type/Type";

/* Existing Hierarchy */
export type levels = Manager | Department | Category | SubCategory | Type;

/* Valid Departments */
export enum Departments {
  MARKETING = "Marketing",
  SALES = "Sales",
  DEVELOPMENT = "Development",
  OPERATIONS = "Operations",
  SUPPORT = "Support",
}

/* Categories of departments - Change based on outlined hierarchy structure as required */
export enum MarketingCategory {
  ABM = "ABM",
}

export enum SalesCategory {
  PRESALES = "Pre Sales",
  SALES_ENGINEERING = "Sales Engineering",
}

export enum DevelopmentCategory {
  CODING = "Coding",
  QUALITY_ASSURANCE = "Quality Assurance",
}

export enum OperationsCategory {
  HUMAN_RESOURCES = "Human Resources",
  PERFORMANCE_MANAGEMENT = "Performance Management",
}

export enum SupportCategory {
  TIER_1 = "Tier 1",
  TIER_2 = "Tier 2",
  TIER_3 = "Tier 3",
}

/* Subcategories of Categories */
export enum SubCategories {
  CAT_1 = "Cat1",
  CAT_2 = "Cat2",
  CAT_3 = "Cat3",
}

/* Types of Subcategories */
export enum Types {
  TYPE_A = "TypeA",
  TYPE_B = "TypeB",
  TYPE_C = "TypeC",
}

const SURCHARGE_MARKETING: DepartmentSurcharge = {
  surchargeAmount: 0.1,
  addPercentage: true,
};

const SURCHARGE_SALES: DepartmentSurcharge = {
  surchargeAmount: 0.15,
  addPercentage: true,
};

const SURCHARGE_DEVELOPMENT: DepartmentSurcharge = {
  surchargeAmount: 0.2,
  addPercentage: true,
};

const SURCHARGE_OPERATIONS: DepartmentSurcharge = {
  surchargeAmount: 0.15,
  addPercentage: false,
};

const SURCHARGE_SUPPORT: DepartmentSurcharge = {
  surchargeAmount: 0.5,
  addPercentage: false,
};

// Determines additional surchase to Fee Total based on Department - Used in Department.ts
export const determineSurcharge = (department: string): DepartmentSurcharge => {
  if (department === Departments.MARKETING) {
    return { surchargeAmount: 10, addPercentage: true };
  } else if (department === Departments.SALES) {
    return { surchargeAmount: 15, addPercentage: true };
  } else if (department === Departments.DEVELOPMENT) {
    return { surchargeAmount: 20, addPercentage: true };
  } else if (department === Departments.OPERATIONS) {
    return { surchargeAmount: 15, addPercentage: false };
  } else if (department === Departments.SUPPORT) {
    return { surchargeAmount: 5, addPercentage: false };
  } else {
    return { surchargeAmount: 0, addPercentage: true };
  }
};

/* Validates that current category is permitted to be in current department (e.g) QA category belongs to Development, not Support department*/
export const isPermittedCategory = (
  category: string,
  department: string
): boolean => {
  if (
    department === Departments.MARKETING &&
    !Object.values(MarketingCategory).includes(category as MarketingCategory)
  ) {
    return false;
  } else if (
    department === Departments.SALES &&
    !Object.values(SalesCategory).includes(category as SalesCategory)
  ) {
    return false;
  } else if (
    department === Departments.DEVELOPMENT &&
    !Object.values(DevelopmentCategory).includes(
      category as DevelopmentCategory
    )
  ) {
    return false;
  } else if (
    department === Departments.OPERATIONS &&
    !Object.values(OperationsCategory).includes(category as OperationsCategory)
  ) {
    return false;
  } else if (
    department === Departments.SUPPORT &&
    !Object.values(SupportCategory).includes(category as SupportCategory)
  ) {
    return false;
  }

  return true;
};

/**
 * Returns enum values in format { enumVal1 / enumVal2 / ... / enumVal<n> }
 */
export const getAllEnumValuesAsString = <T extends Record<string, string>>(
  enumObj: T
): string => {
  let res: string = "{ ";
  for (const key in enumObj) {
    res += enumObj[key] + " / ";
  }

  res += "}";
  return res;
};

export default {
  SURCHARGE_MARKETING,
  SURCHARGE_SALES,
  SURCHARGE_DEVELOPMENT,
  SURCHARGE_OPERATIONS,
  SURCHARGE_SUPPORT,
};
