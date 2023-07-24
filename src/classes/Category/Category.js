"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
var SubCategory_1 = require("../SubCategory/SubCategory");
var Category = /** @class */ (function () {
    function Category(current, department) {
        this.data = new Map();
        this.department = current.Department__c;
        this.category = current.Category__c;
        this.numSubCategories = 0;
        this.surchargeTotal = 0;
        this.total = 0;
        this.addNode(current);
    }
    /* Primary Functions */
    Category.prototype.addNode = function (current) {
        var category = current.Category__c;
        var subCategory = current.Sub_Category__c;
        if (this.data.has(subCategory)) {
            this.proceed(current);
        }
        else if (!this.data.has(category)) {
            this.addSubCategory(current);
            this.numSubCategories++;
        }
        else {
            //TODO: Probably won't happen, but maybe think of something to do here
            console.log("Category ".concat(category, " failed to add ").concat(subCategory, "."));
        }
    };
    /* Helper Functions */
    Category.prototype.proceed = function (current) {
        this.data.get(current.Sub_Category__c).addNode(current);
    };
    Category.prototype.addSubCategory = function (current) {
        this.data.set(current.Sub_Category__c, new SubCategory_1.SubCategory(current));
    };
    /* Getters & Setters */
    Category.prototype.getTotal = function () {
        return this.total;
    };
    Category.prototype.setTotal = function (childrenSum) {
        this.total = childrenSum;
    };
    Category.prototype.getSurchargeTotal = function () {
        return this.surchargeTotal;
    };
    Category.prototype.setSurchargeTotal = function (childrenSum) {
        this.surchargeTotal = childrenSum;
    };
    Category.prototype.getCategory = function () {
        return this.category;
    };
    Category.prototype.getData = function () {
        return this.data;
    };
    Category.prototype.getNumChildren = function () {
        return this.numSubCategories;
    };
    Category.prototype.getDepartment = function () {
        return this.department;
    };
    return Category;
}());
exports.Category = Category;
