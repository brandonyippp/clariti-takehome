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
        this.surchargeTotal = 0;
        this.invalidData = [];
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
            throw new Error("Failed to add JSON.stringify".concat(current));
        }
    };
    /* Recursively travels down into each level of hierarchy and:
        -retrieves sum from the lowest level
        -sums all of lowest level into the level directly above it
    */
    Manager.prototype.establishTotals = function (levelObj) {
        var _this = this;
        // Adjust to bottom levelObj of hierarchy as needed
        if (levelObj instanceof Type_1.Type) {
            return {
                total: levelObj.getTotal(),
                surchargeTotal: levelObj.getSurchargeTotal(),
            };
        }
        var currentLevelData = levelObj.getData();
        var surchargeTotal = 0;
        var total = 0;
        currentLevelData.forEach(function (value, key) {
            var obj = _this.establishTotals(currentLevelData.get(key));
            surchargeTotal += obj.surchargeTotal;
            total += obj.total;
        });
        levelObj.setSurchargeTotal(surchargeTotal);
        levelObj.setTotal(total);
        return { total: total, surchargeTotal: surchargeTotal };
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
    Manager.prototype.getInvalidData = function () {
        return this.invalidData;
    };
    return Manager;
}());
exports.Manager = Manager;
