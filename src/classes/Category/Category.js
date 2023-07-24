"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const SubCategory_1 = require("../SubCategory/SubCategory");
class Category {
    constructor(current) {
        this.data = new Map();
        this.department = current.Department__c;
        this.category = current.Category__c;
        this.numSubCategories = 0;
        this.surchargeTotal = 0;
        this.total = 0;
        this.addNode(current);
    }
    /* Primary Functions */
    addNode(current) {
        const subCategory = current.Sub_Category__c;
        if (this.data.has(subCategory)) {
            this.proceed(current);
        }
        else if (!this.data.has(subCategory)) {
            this.addSubCategory(current);
            this.numSubCategories++;
        }
        else {
            throw new Error(`Failed to add JSON.stringify${current}`);
        }
    }
    /* Helper Functions */
    proceed(current) {
        this.data.get(current.Sub_Category__c).addNode(current);
    }
    addSubCategory(current) {
        this.data.set(current.Sub_Category__c, new SubCategory_1.SubCategory(current));
    }
    /* Getters & Setters */
    getTotal() {
        return this.total;
    }
    setTotal(childrenSum) {
        this.total = childrenSum;
    }
    getSurchargeTotal() {
        return this.surchargeTotal;
    }
    setSurchargeTotal(childrenSum) {
        this.surchargeTotal = childrenSum;
    }
    getCategory() {
        return this.category;
    }
    getData() {
        return this.data;
    }
    getNumChildren() {
        return this.numSubCategories;
    }
    getDepartment() {
        return this.department;
    }
}
exports.Category = Category;
