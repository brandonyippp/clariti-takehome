"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategory = void 0;
const Type_1 = require("../Type/Type");
class SubCategory {
    constructor(current) {
        this.subCategory = current.Sub_Category__c;
        this.department = current.Department__c;
        this.category = current.Category__c;
        this.data = new Map();
        this.surchargeTotal = 0;
        this.numTypes = 0;
        this.total = 0;
        this.addNode(current);
    }
    /* Primary Functions */
    addNode(current) {
        const type = current.Type__c;
        if (this.data.has(type)) {
            this.proceed(current);
        }
        else if (!this.data.has(type)) {
            this.addType(current);
            this.numTypes++;
        }
        else {
            throw new Error(`Failed to add JSON.stringify${current}`);
        }
    }
    /* Helper Functions */
    proceed(current) {
        this.data.get(current.Type__c).addRow(current);
    }
    addType(current) {
        this.data.set(current.Type__c, new Type_1.Type(current));
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
    getSubCategory() {
        return this.subCategory;
    }
    getData() {
        return this.data;
    }
    // Returns number of types that exist within this subcategory
    getNumChildren() {
        return this.numTypes;
    }
    // Returns number of .csv rows that were grouped into this specific subcategory
    getNumRows() {
        let res = 0;
        this.data.forEach((value, key) => (res += this.data.get(key).getDataSize()));
        return res;
    }
    getDepartment() {
        return this.department;
    }
    getCategory() {
        return this.category;
    }
}
exports.SubCategory = SubCategory;
