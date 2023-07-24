"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Department = void 0;
const constants_1 = require("../../constants/constants");
const Category_1 = require("../Category/Category");
class Department {
    constructor(current, invalidData) {
        this.data = new Map();
        this.department = current.Department__c;
        this.invalidData = invalidData;
        this.surchargeTotal = 0;
        this.numCategories = 0;
        this.total = 0;
        this.addNode(current);
    }
    /* Primary Functions */
    addNode(current) {
        const department = current.Department__c;
        const category = current.Category__c;
        if (!(0, constants_1.isPermittedCategory)(category, department)) {
            this.processInvalidData(current);
        }
        else if (this.data.has(category)) {
            this.proceed(current);
        }
        else if (!this.data.has(category)) {
            this.addCategory(current);
            this.numCategories++;
        }
        else {
            throw new Error(`Failed to add JSON.stringify${current}`);
        }
    }
    /* Helper Functions */
    proceed(current) {
        this.data.get(current.Category__c).addNode(current);
    }
    addCategory(current) {
        this.data.set(current.Category__c, new Category_1.Category(current));
    }
    processInvalidData(current) {
        this.invalidData.push(Object.assign(Object.assign({}, current), { reason: `Category ${current.Category__c} not valid for Department ${current.Department__c}.` }));
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
    getDepartment() {
        return this.department;
    }
    getData() {
        return this.data;
    }
    getNumChildren() {
        return this.numCategories;
    }
}
exports.Department = Department;
