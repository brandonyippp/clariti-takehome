import { DepartmentSurcharge } from "../interfaces/Surcharge";

/** Department Surcharges
 * surchargeAmount -> % of Fee Total (Unit Price * Quantity)
 * addPercentage:
 *     True -> res = Fee Total + surchargeAmount
 *     False -> res = Fee Total - surchargeAmount
 *
 *      (e.g)
 *          i. Fee Total = 100
 *          ii. { surchargeAmount: .15, addPercentage: true }
 *          iii. res = 100 + (100 * .15) = 115
 */
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

/* Valid Departments */
export enum Departments {
  MARKETING = "Marketing",
  SALES = "Sales",
  DEVELOPMENT = "Development",
  OPERATIONS = "Operations",
  SUPPORT = "Support",
}

/* Department-contained categories - used to check if category is in a valid department */
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

/* Sub-categories of Categories */
export enum SubCategories {
  CAT_1 = "Cat1",
  CAT_2 = "Cat2",
  CAT_3 = "Cat3",
}

/* Types of Sub-categories */
export enum Types {
  TYPE_A = "TypeA",
  TYPE_B = "TypeB",
  TYPE_C = "TypeC",
}

/* Validates that current category is permitted to be in current department (e.g) QA category belongs to Development, not Support department*/
export const isPermittedCategory = (category: string, department: string) => {
  if (
    department === Departments.MARKETING &&
    !(category in MarketingCategory)
  ) {
    return false;
  } else if (department === Departments.SALES && !(category in SalesCategory)) {
    return false;
  } else if (
    department === Departments.DEVELOPMENT &&
    !(category in DevelopmentCategory)
  ) {
    return false;
  } else if (
    department === Departments.OPERATIONS &&
    !(category in OperationsCategory)
  ) {
    return false;
  } else if (
    department === Departments.SUPPORT &&
    !(category in SupportCategory)
  ) {
    return false;
  }

  return true;
};

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
