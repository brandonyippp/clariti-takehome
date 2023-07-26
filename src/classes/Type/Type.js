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
exports.Type = void 0;
var constants_1 = require("../../constants/constants");
var Type = /** @class */ (function () {
    function Type(current, invalidData) {
        this.subCategory = current.Sub_Category__c;
        this.department = current.Department__c;
        this.category = current.Category__c;
        this.invalidData = invalidData;
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
        var feeTotal = unitPrice * quantity;
        /**
         * If the quantity * unitPrice was negative, don't add it into the current bucket
         */
        if (feeTotal < 0) {
            this.invalidData.push(__assign(__assign({}, current), { reason: "Unit price (".concat(unitPrice, ") * quantity(").concat(quantity, ") was a negative value.") }));
        }
        else {
            this.total += feeTotal;
            this.surchargeTotal = (0, constants_1.calculateSurcharge)(this.total, this.department);
            this.data.push(current);
        }
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
    Type.prototype.getData = function () {
        return this.data;
    };
    return Type;
}());
exports.Type = Type;
