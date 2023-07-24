"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = void 0;
const constants_1 = require("../../constants/constants");
class Type {
    constructor(current) {
        this.subCategory = current.Sub_Category__c;
        this.department = current.Department__c;
        this.category = current.Category__c;
        this.type = current.Type__c;
        this.surchargeTotal = 0;
        this.total = 0;
        this.data = [];
        this.addRow(current);
    }
    /* Primary Functions */
    addRow(current) {
        const unitPrice = current.Unit_Price__c;
        const quantity = current.Quantity__c;
        this.data.push(current);
        this.total += unitPrice * quantity;
        this.surchargeTotal = (0, constants_1.calculateSurcharge)(this.total, this.department);
    }
    /* Helper Functions */
    /* Getters & Setters */
    getTotal() {
        return this.total;
    }
    getSurchargeTotal() {
        return this.surchargeTotal;
    }
    // Returns number of .csv rows that were labelled as either Type<A/B/C>
    getDataSize() {
        return this.data.length;
    }
    getDepartment() {
        return this.department;
    }
    getCategory() {
        return this.category;
    }
    getSubCategory() {
        return this.subCategory;
    }
    getType() {
        return this.type;
    }
}
exports.Type = Type;
