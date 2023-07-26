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
exports.Department = void 0;
var constants_1 = require("../../constants/constants");
var Category_1 = require("../Category/Category");
var Department = /** @class */ (function () {
    function Department(current, invalidData) {
        this.data = new Map();
        this.department = current.Department__c;
        this.invalidData = invalidData;
        this.surchargeTotal = 0;
        this.numCategories = 0;
        this.total = 0;
        this.addNode(current);
    }
    /* Primary Functions */
    Department.prototype.addNode = function (current) {
        var department = current.Department__c;
        var category = current.Category__c;
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
            throw new Error("Failed to add JSON.stringify".concat(current));
        }
    };
    /* Helper Functions */
    Department.prototype.proceed = function (current) {
        this.data.get(current.Category__c).addNode(current);
    };
    Department.prototype.addCategory = function (current) {
        this.data.set(current.Category__c, new Category_1.Category(current, this.invalidData));
    };
    Department.prototype.processInvalidData = function (current) {
        this.invalidData.push(__assign(__assign({}, current), { reason: "Category ".concat(current.Category__c, " not valid for Department ").concat(current.Department__c, ".") }));
    };
    /* Getters & Setters */
    Department.prototype.getTotal = function () {
        return this.total;
    };
    Department.prototype.setTotal = function (childrenSum) {
        this.total = childrenSum;
    };
    Department.prototype.getSurchargeTotal = function () {
        return this.surchargeTotal;
    };
    Department.prototype.setSurchargeTotal = function (childrenSum) {
        this.surchargeTotal = childrenSum;
    };
    Department.prototype.getDepartment = function () {
        return this.department;
    };
    Department.prototype.getData = function () {
        return this.data;
    };
    Department.prototype.getNumChildren = function () {
        return this.numCategories;
    };
    return Department;
}());
exports.Department = Department;
