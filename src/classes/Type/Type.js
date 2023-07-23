"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type = void 0;
var Type = /** @class */ (function () {
    function Type(current) {
        this.department = current.Department__c;
        this.category = current.Category__c;
        this.subCategory = current.Sub_Category__c;
        this.type = current.Type__c;
        this.total = 0;
        this.data = [];
        this.addRow(current);
    }
    /* Primary Functions */
    Type.prototype.addRow = function (current) {
        var quantity = current.Quantity__c;
        var unitPrice = current.Unit_Price__c;
        this.data.push(current);
        this.total += unitPrice * quantity;
    };
    /* Displays all .csv data for current hierarchy bucket
      (e.g)
        -Development
          -Coding
            -Cat1
              -TypeA
    */
    Type.prototype.printData = function () {
        this.printDataIntro();
        for (var i = 0; i < this.data.length; i++) {
            this.printDataFields(i);
        }
        console.log("\n");
    };
    /* Helper Functions */
    Type.prototype.printDataIntro = function () {
        console.log("Data for the following section:\n\tDepartment: ".concat(this.department, "\n\tCategory: ").concat(this.category, "\n\tSub-category: ").concat(this.subCategory, "\n\tType: ").concat(this.type));
    };
    Type.prototype.printDataFields = function (i) {
        console.log("Id: ".concat(this.data[i].Id, ", Name: ").concat(this.data[i].Name, ", Quantity: ").concat(this.data[i].Quantity__c, ", Unit Price: ").concat(this.data[i].Unit_Price__c));
    };
    /* Getters & Setters */
    Type.prototype.getTotal = function () {
        return this.total;
    };
    Type.prototype.getType = function () {
        return this.type;
    };
    // Returns number of .csv rows that were labelled as either Type<A/B/C>
    Type.prototype.getDataSize = function () {
        return this.data.length;
    };
    return Type;
}());
exports.Type = Type;
