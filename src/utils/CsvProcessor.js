"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvProcessor = void 0;
var csv = require("csv-parser");
var fs = require("fs");
var CsvProcessor = /** @class */ (function () {
    function CsvProcessor() {
    }
    CsvProcessor.prototype.processFile = function (filePath, manager) {
        fs.createReadStream(filePath)
            .pipe(csv())
            .on("data", function (row) { return manager.addNode(row); })
            .on("end", function () {
            manager.establishTotals(manager);
        });
    };
    return CsvProcessor;
}());
exports.CsvProcessor = CsvProcessor;
// import { CsvRow } from "../interfaces/CsvRow/CsvRow";
// import { Manager } from "../classes/Manager/Manager";
// const csv = require("csv-parser");
// import * as fs from "fs";
// export class CsvProcessor {
//   constructor() {}
//   public processFile(filePath: string, manager: Manager): void {
//     let res: number = 0;
//     fs.createReadStream(filePath)
//       .pipe(csv())
//       .on("data", (row: CsvRow) => {
//         // manager.addNode(row);
//         if (
//           row.Department__c === "Operations" &&
//           row.Category__c === "Human Resources"
//         ) {
//           res += row.Quantity__c * row.Unit_Price__c;
//         }
//       })
//       .on("end", () => {
//         // manager.establishTotals(manager);
//         console.log(res);
//       });
//   }
// }
