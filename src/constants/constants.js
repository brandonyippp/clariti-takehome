"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEnumValuesAsString =
  exports.isPermittedCategory =
  exports.Types =
  exports.SubCategories =
  exports.SupportCategory =
  exports.OperationsCategory =
  exports.DevelopmentCategory =
  exports.SalesCategory =
  exports.MarketingCategory =
  exports.Departments =
    void 0;
/* Valid Departments */
var Departments;
(function (Departments) {
  Departments["MARKETING"] = "Marketing";
  Departments["SALES"] = "Sales";
  Departments["DEVELOPMENT"] = "Development";
  Departments["OPERATIONS"] = "Operations";
  Departments["SUPPORT"] = "Support";
})(Departments || (exports.Departments = Departments = {}));
/* Categories of departments - Change based on outlined hierarchy structure as required */
var MarketingCategory;
(function (MarketingCategory) {
  MarketingCategory["ABM"] = "ABM";
})(MarketingCategory || (exports.MarketingCategory = MarketingCategory = {}));
var SalesCategory;
(function (SalesCategory) {
  SalesCategory["PRESALES"] = "Pre Sales";
  SalesCategory["SALES_ENGINEERING"] = "Sales Engineering";
})(SalesCategory || (exports.SalesCategory = SalesCategory = {}));
var DevelopmentCategory;
(function (DevelopmentCategory) {
  DevelopmentCategory["CODING"] = "Coding";
  DevelopmentCategory["QUALITY_ASSURANCE"] = "Quality Assurance";
})(
  DevelopmentCategory ||
    (exports.DevelopmentCategory = DevelopmentCategory = {})
);
var OperationsCategory;
(function (OperationsCategory) {
  OperationsCategory["HUMAN_RESOURCES"] = "Human Resources";
  OperationsCategory["PERFORMANCE_MANAGEMENT"] = "Performance Management";
})(
  OperationsCategory || (exports.OperationsCategory = OperationsCategory = {})
);
var SupportCategory;
(function (SupportCategory) {
  SupportCategory["TIER_1"] = "Tier 1";
  SupportCategory["TIER_2"] = "Tier 2";
  SupportCategory["TIER_3"] = "Tier 3";
})(SupportCategory || (exports.SupportCategory = SupportCategory = {}));
/* Subcategories of Categories */
var SubCategories;
(function (SubCategories) {
  SubCategories["CAT_1"] = "Cat1";
  SubCategories["CAT_2"] = "Cat2";
  SubCategories["CAT_3"] = "Cat3";
})(SubCategories || (exports.SubCategories = SubCategories = {}));
/* Types of Sub-categories */
var Types;
(function (Types) {
  Types["TYPE_A"] = "TypeA";
  Types["TYPE_B"] = "TypeB";
  Types["TYPE_C"] = "TypeC";
})(Types || (exports.Types = Types = {}));
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
var SURCHARGE_MARKETING = {
  surchargeAmount: 0.1,
  addPercentage: true,
};
var SURCHARGE_SALES = {
  surchargeAmount: 0.15,
  addPercentage: true,
};
var SURCHARGE_DEVELOPMENT = {
  surchargeAmount: 0.2,
  addPercentage: true,
};
var SURCHARGE_OPERATIONS = {
  surchargeAmount: 0.15,
  addPercentage: false,
};
var SURCHARGE_SUPPORT = {
  surchargeAmount: 0.5,
  addPercentage: false,
};
//!Object.values(Departments).includes(department as Departments)
/* Validates that current category is permitted to be in current department (e.g) QA category belongs to Development, not Support department*/
var isPermittedCategory = function (category, department) {
  if (
    department === Departments.MARKETING &&
    !Object.values(MarketingCategory).includes(category)
  ) {
    return false;
  } else if (
    department === Departments.SALES &&
    !Object.values(SalesCategory).includes(category)
  ) {
    return false;
  } else if (
    department === Departments.DEVELOPMENT &&
    !Object.values(DevelopmentCategory).includes(category)
  ) {
    return false;
  } else if (
    department === Departments.OPERATIONS &&
    !Object.values(OperationsCategory).includes(category)
  ) {
    return false;
  } else if (
    department === Departments.SUPPORT &&
    !Object.values(SupportCategory).includes(category)
  ) {
    return false;
  }
  return true;
};
exports.isPermittedCategory = isPermittedCategory;
/**
 * Returns enum values in format { enumVal1 / enumVal2 / ... / enumVal<n> }
 */
var getAllEnumValuesAsString = function (enumObj) {
  var res = "{ ";
  for (var key in enumObj) {
    res += enumObj[key] + " / ";
  }
  res += "}";
  return res;
};
exports.getAllEnumValuesAsString = getAllEnumValuesAsString;
exports.default = {
  SURCHARGE_MARKETING: SURCHARGE_MARKETING,
  SURCHARGE_SALES: SURCHARGE_SALES,
  SURCHARGE_DEVELOPMENT: SURCHARGE_DEVELOPMENT,
  SURCHARGE_OPERATIONS: SURCHARGE_OPERATIONS,
  SURCHARGE_SUPPORT: SURCHARGE_SUPPORT,
};
