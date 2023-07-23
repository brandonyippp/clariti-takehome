"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
var SubCategory_1 = require("../SubCategory/SubCategory");
var Category = /** @class */ (function () {
  function Category(current) {
    this.data = new Map();
    this.name = current.Category__c;
    this.numSubCategories = 0;
    this.total = 0;
    this.addNode(current);
  }
  /* Primary Functions */
  Category.prototype.addNode = function (current) {
    var category = current.Category__c;
    var subCategory = current.Sub_Category__c;
    if (this.data.has(subCategory)) {
      this.proceed(current);
    } else if (!this.data.has(category)) {
      this.addSubCategory(current);
    } else {
      //TODO: Probably won't happen, but maybe think of something to do here
      console.log(
        "Category ".concat(category, " failed to add ").concat(subCategory, ".")
      );
    }
  };
  /* Helper Functions */
  Category.prototype.proceed = function (current) {
    this.data.get(current.Sub_Category__c).addNode(current);
  };
  Category.prototype.addSubCategory = function (current) {
    this.data.set(
      current.Sub_Category__c,
      new SubCategory_1.SubCategory(current)
    );
  };
  /* Getters & Setters */
  Category.prototype.getTotal = function () {
    return this.total;
  };
  Category.prototype.setTotal = function (childrenSum) {
    this.total = childrenSum;
  };
  Category.prototype.getName = function () {
    return this.name;
  };
  Category.prototype.getData = function () {
    return this.data;
  };
  Category.prototype.getNumChildren = function () {
    return this.numSubCategories;
  };
  return Category;
})();
exports.Category = Category;
