"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Manager_1 = require("./classes/Manager/Manager");
var Output_1 = require("./classes/Output/Output");
var Type_1 = require("./classes/Type/Type");
var CsvProcessor_1 = require("./utils/CsvProcessor");
var filePath = "../data/raw_fees.csv";
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var csvProcessor, manager, output, currentLevel, userChoice, introOptions, steps, i, arr, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                csvProcessor = new CsvProcessor_1.CsvProcessor();
                manager = new Manager_1.Manager();
                output = new Output_1.Output();
                csvProcessor.processFile(filePath, manager);
                currentLevel = manager;
                introOptions = [
                    "All Departments",
                    "A specific Department",
                    "Category of a Department",
                    "Subcategory of a Category within a Department",
                    "Type of a Subcategory within a Category contained within a Department",
                    "Exit",
                ];
                output.displayWelcome();
                output.printGuide();
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 10];
                _a.label = 2;
            case 2:
                _a.trys.push([2, 8, , 9]);
                return [4 /*yield*/, output.askQuestion(output.constructMenu(introOptions), introOptions.length)];
            case 3:
                _a.sent();
                steps = output.getSteps();
                i = 0;
                _a.label = 4;
            case 4:
                if (!(i < steps)) return [3 /*break*/, 7];
                return [4 /*yield*/, output.askQuestion(output.constructMenu(currentLevel), currentLevel.getNumChildren(), true)];
            case 5:
                _a.sent();
                if (!(currentLevel instanceof Type_1.Type)) {
                    userChoice = parseInt(output.getUserResponse());
                    arr = Array.from(currentLevel.getData().keys());
                    currentLevel = currentLevel.getData().get(arr[userChoice - 1]);
                }
                _a.label = 6;
            case 6:
                i++;
                return [3 /*break*/, 4];
            case 7:
                output.printFeeTotals(currentLevel);
                output.printDottedLine();
                currentLevel = manager;
                return [3 /*break*/, 9];
            case 8:
                error_1 = _a.sent();
                //   console.log(error);
                return [3 /*break*/, 10];
            case 9: return [3 /*break*/, 1];
            case 10:
                console.log("Exiting program.");
                return [2 /*return*/];
        }
    });
}); };
main();
