"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = void 0;
var constants_1 = require("../../constants/constants");
var Type = /** @class */ (function () {
    function Type(current) {
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
    Type.prototype.addRow = function (current) {
        var unitPrice = current.Unit_Price__c;
        var quantity = current.Quantity__c;
        this.data.push(current);
        this.total += unitPrice * quantity;
        this.surchargeTotal = (0, constants_1.calculateSurcharge)(this.total, this.department);
    };
    /* Helper Functions */
    /* Getters & Setters */
    Type.prototype.getTotal = function () {
        return this.total;
    };
    Type.prototype.getSurchargeTotal = function () {
        return this.surchargeTotal;
    };
    // Returns number of .csv rows that were labelled as either Type<A/B/C>
    Type.prototype.getDataSize = function () {
        return this.data.length;
    };
    Type.prototype.getDepartment = function () {
        return this.department;
    };
    Type.prototype.getCategory = function () {
        return this.category;
    };
    Type.prototype.getSubCategory = function () {
        return this.subCategory;
    };
    Type.prototype.getType = function () {
        return this.type;
    };
    return Type;
}());
exports.Type = Type;
