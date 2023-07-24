"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
const constants_1 = require("../../constants/constants");
const Department_1 = require("../Department/Department");
const Type_1 = require("../Type/Type");
class Manager {
    constructor() {
        this.data = new Map();
        this.numDepartments = 0;
        this.surchargeTotal = 0;
        this.invalidData = [];
        this.total = 0;
    }
    /* Primary Functions */
    addNode(current) {
        const department = current.Department__c;
        if (!Object.values(constants_1.Departments).includes(department)) {
            this.processInvalidData(current);
        }
        else if (this.data.has(department)) {
            this.proceed(current);
        }
        else if (!this.data.has(department)) {
            this.addDepartment(current);
        }
        else {
            throw new Error(`Failed to add JSON.stringify${current}`);
        }
    }
    /* Recursively travels down into each level of hierarchy and:
        -retrieves sum from the lowest level
        -sums all of lowest level into the level directly above it
    */
    establishTotals(levelObj) {
        // Adjust to bottom levelObj of hierarchy as needed
        if (levelObj instanceof Type_1.Type) {
            return {
                total: levelObj.getTotal(),
                surchargeTotal: levelObj.getSurchargeTotal(),
            };
        }
        const currentLevelData = levelObj.getData();
        let surchargeTotal = 0;
        let total = 0;
        currentLevelData.forEach((value, key) => {
            const obj = this.establishTotals(currentLevelData.get(key));
            surchargeTotal += obj.surchargeTotal;
            total += obj.total;
        });
        levelObj.setSurchargeTotal(surchargeTotal);
        levelObj.setTotal(total);
        return { total, surchargeTotal };
    }
    /* Helper Functions */
    proceed(current) {
        this.data.get(current.Department__c).addNode(current);
    }
    addDepartment(current) {
        this.data.set(current.Department__c, new Department_1.Department(current, this.invalidData));
        this.numDepartments++;
    }
    processInvalidData(current) {
        this.invalidData.push(Object.assign(Object.assign({}, current), { reason: `Department ${current.Department__c} not any of ${(0, constants_1.getAllEnumValuesAsString)(constants_1.Departments)}.` }));
    }
    /* Getters & Setters */
    getTotal() {
        return this.total;
    }
    setTotal(childrenSum) {
        this.total = childrenSum;
    }
    setSurchargeTotal(childrenSum) {
        this.surchargeTotal = childrenSum;
    }
    getSurchargeTotal() {
        return this.surchargeTotal;
    }
    getData() {
        return this.data;
    }
    getNumChildren() {
        return this.numDepartments;
    }
    getInvalidData() {
        return this.invalidData;
    }
}
exports.Manager = Manager;
