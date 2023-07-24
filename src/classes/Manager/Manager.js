"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = void 0;
var constants_1 = require("../../constants/constants");
var Department_1 = require("../Department/Department");
var Type_1 = require("../Type/Type");
var Manager = /** @class */ (function () {
    function Manager() {
        this.data = new Map();
        this.numDepartments = 0;
        this.invalidData = [];
        this.surchargeTotal = 0;
        this.total = 0;
    }
    /* Primary Functions */
    Manager.prototype.addNode = function (current) {
        var department = current.Department__c;
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
            //TODO: Probably won't happen, but maybe think of something to do here
            console.log("Manager failed to add ".concat(department, "."));
        }
    };
    Manager.prototype.establishTotals = function (levelObj) {
        var _this = this;
        // Adjust to bottom levelObj of hierarchy as needed
        if (levelObj instanceof Type_1.Type) {
            return {
                total: levelObj.getTotal(),
                surchargeTotal: levelObj.getSurchargeTotal(),
            };
        }
        var total = 0;
        var surchargeTotal = 0;
        var currentLevelData = levelObj.getData();
        currentLevelData.forEach(function (value, key) {
            var obj = _this.establishTotals(currentLevelData.get(key));
            total += obj.total;
            surchargeTotal += obj.surchargeTotal;
        });
        levelObj.setTotal(total);
        levelObj.setSurchargeTotal(surchargeTotal);
        return { total: total, surchargeTotal: surchargeTotal };
    };
    /* Print any .csv rows that either:
        - Don't have a valid department (e.g Department "Kentucky")
        - Don't have a category that is permitted within a Department (e.g "ABM" Category in Development Department)
        - Subject to requirements alterations -> Adjust accordingly in constants.ts
    */
    Manager.prototype.printInvalidData = function () {
        console.log("Invalid data found in file:");
        for (var i = 0; i < this.invalidData.length; i++) {
            this.printInvalidDataFields(i);
        }
        console.log("\n");
    };
    /* Helper Functions */
    Manager.prototype.proceed = function (current) {
        this.data.get(current.Department__c).addNode(current);
    };
    Manager.prototype.addDepartment = function (current) {
        this.data.set(current.Department__c, new Department_1.Department(current, this.invalidData));
        this.numDepartments++;
    };
    Manager.prototype.processInvalidData = function (current) {
        this.invalidData.push(__assign(__assign({}, current), { reason: "Department ".concat(current.Department__c, " not any of ").concat((0, constants_1.getAllEnumValuesAsString)(constants_1.Departments), ".") }));
    };
    Manager.prototype.printInvalidDataFields = function (i) {
        console.log("Id: ".concat(this.invalidData[i].Id, ", Name: ").concat(this.invalidData[i].Name, ", Reason: ").concat(this.invalidData[i].reason));
    };
    /* Getters & Setters */
    Manager.prototype.getTotal = function () {
        return this.total;
    };
    Manager.prototype.setTotal = function (childrenSum) {
        this.total = childrenSum;
    };
    Manager.prototype.setSurchargeTotal = function (childrenSum) {
        this.surchargeTotal = childrenSum;
    };
    Manager.prototype.getSurchargeTotal = function () {
        return this.surchargeTotal;
    };
    Manager.prototype.getData = function () {
        return this.data;
    };
    Manager.prototype.getNumChildren = function () {
        return this.numDepartments;
    };
    return Manager;
}());
exports.Manager = Manager;
