"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategory = void 0;
var Type_1 = require("../Type/Type");
var SubCategory = /** @class */ (function () {
    function SubCategory(current) {
        this.name = current.Sub_Category__c;
        this.data = new Map();
        this.numTypes = 0;
        this.total = 0;
        this.addNode(current);
    }
    /* Primary Functions */
    SubCategory.prototype.addNode = function (current) {
        var subCategory = current.Sub_Category__c;
        var type = current.Type__c;
        if (this.data.has(type)) {
            this.proceed(current);
        }
        else if (!this.data.has(type)) {
            this.addType(current);
            this.numTypes++;
        }
        else {
            //TODO: Probably won't happen, but maybe think of something to do here
            console.log("Subcategory ".concat(subCategory, " failed to add ").concat(type, "."));
        }
    };
    /* Helper Functions */
    SubCategory.prototype.proceed = function (current) {
        this.data.get(current.Type__c).addRow(current);
    };
    SubCategory.prototype.addType = function (current) {
        this.data.set(current.Type__c, new Type_1.Type(current));
    };
    /* Getters & Setters */
    SubCategory.prototype.getTotal = function () {
        return this.total;
    };
    SubCategory.prototype.setTotal = function (childrenSum) {
        this.total = childrenSum;
    };
    SubCategory.prototype.getName = function () {
        return this.name;
    };
    SubCategory.prototype.getData = function () {
        return this.data;
    };
    // Returns number of types that exist within this subcategory
    SubCategory.prototype.getNumChildren = function () {
        return this.numTypes;
    };
    // Returns number of .csv rows that were grouped into this specific subcategory
    SubCategory.prototype.getNumRows = function () {
        var _this = this;
        var res = 0;
        this.data.forEach(function (value, key) { return (res += _this.data.get(key).getDataSize()); });
        return res;
    };
    return SubCategory;
}());
exports.SubCategory = SubCategory;
