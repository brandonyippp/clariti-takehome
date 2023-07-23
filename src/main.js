"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Manager_1 = require("./classes/Manager/Manager");
var CsvProcessor_1 = require("./utils/CsvProcessor");
var filePath = "../data/raw_fees.csv";
var main = function () {
  var manager = new Manager_1.Manager();
  var csvProcessor = new CsvProcessor_1.CsvProcessor();
  csvProcessor.processFile(filePath, manager);
  setTimeout(function () {
    console.log("total: " + manager.getTotal());
  }, 5000);
};
main();
/**
 * Import .csv
 * Update current .csv row (in a loop)
 *  - Pass that row into Manager
 */
