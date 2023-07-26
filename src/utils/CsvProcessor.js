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
