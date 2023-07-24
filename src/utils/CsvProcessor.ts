import { CsvRow } from "../interfaces/CsvRow/CsvRow";
import { Manager } from "../classes/Manager/Manager";
const csv = require("csv-parser");
import * as fs from "fs";

export class CsvProcessor {
  constructor() {}

  public processFile(filePath: string, manager: Manager): void {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row: CsvRow) => manager.addNode(row))
      .on("end", () => {
        manager.establishTotals(manager);
      });
  }
}

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
