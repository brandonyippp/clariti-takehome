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
exports.Output = void 0;
var readline = require("readline");
var Type_1 = require("../Type/Type");
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var Output = /** @class */ (function () {
    function Output() {
        /* Helper Functions */
        this.commaSeparateNonDecimal = function (number) {
            var numberStr = number.toString();
            var parts = numberStr.split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        };
        this.steps = 0;
        this.userResponse = "";
    }
    /* Primary Functions */
    Output.prototype.displayWelcome = function () {
        this.printDottedLine();
        console.log("Welcome to the Fee Calculator App.\n");
    };
    Output.prototype.printGuide = function () {
        var structure = "\n         |------------- 1 -------------|  \n         v                             v\n    +---------+                 +---------+\n    |  Sales  |  <---- 2 ---->  |Marketing|\n    |  Dept.  |                 |  Dept.  |\n    +---------+                 +---------+\n     /       \\                           |\n    v         v                          v\n+----------+  +---------+                +---------+\n|Sales Eng.|  |Pre Sales| <---- 3 ---->  |   ABM   |\n| Category |  |Category |                |Category |\n+----------+  +---------+                +---------+\n   |              /  \\                        /  \\\n   |             /    \\                      /    \\\n   v            v      v                    v      v\n+-------+ +-------+ +-------+           +-------+  +-------+\n|Subcat1| |Subcat1| |Subcat2| <-- 4 --> |Subcat1|  |Subcat2|\n+-------+ +-------+ +-------+           +-------+  +-------+\n   |         |       /     \\                   |       |\n   v         v      v       v                  v       v\n+-----+   +-----+ +-----+ +-----+             +-----+ +-----+ \n|TypeA|   |TypeC| |TypeA| |TypeB|  <-- 5 -->  |TypeA| |TypeC|\n+-----+   +-----+ +-----+ +-----+             +-----+ +-----+\n";
        console.log("Use the following diagram as your guide:\n");
        console.log(structure);
    };
    Output.prototype.askQuestion = function (question, dataLength, intermediate) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var ask = function () {
                            rl.question(question, function (answer) {
                                var isValidInput = _this.isValidInput(answer, dataLength);
                                if (isValidInput) {
                                    if (!intermediate) {
                                        _this.steps = parseInt(answer) - 1;
                                    }
                                    _this.userResponse = answer;
                                    resolve(answer);
                                }
                                else if (isValidInput === null) {
                                    rl.close();
                                    reject(new Error("User exiting program"));
                                }
                                else {
                                    console.log("Invalid input received. Please try again.");
                                    ask();
                                }
                            });
                        };
                        ask();
                    })];
            });
        });
    };
    Output.prototype.isValidInput = function (answer, dataLength) {
        var answerAsNumber = parseInt(answer);
        if (answer.toLowerCase() === "exit") {
            return null;
        }
        else if (
        // Input wasn't a number or wasn't a valid numeric selection from given menu
        isNaN(answerAsNumber) ||
            answerAsNumber < 1 ||
            answerAsNumber > dataLength) {
            return false;
        }
        return true;
    };
    Output.prototype.printFeeTotals = function (currentLevel) {
        console.log("*** Fee total without surplus: $".concat(this.commaSeparateNonDecimal(currentLevel.getTotal()), " ***"));
        console.log("*** Fee total with surplus: $".concat(this.commaSeparateNonDecimal(currentLevel.getSurchargeTotal()), " ***\n\n"));
    };
    Output.prototype.constructMenu = function (data) {
        var menu;
        if (Array.isArray(data)) {
            menu = "Pick one of the following options to calculate the Fee Total on by entering the number each option is listed as, or type 'exit' to exit:";
            for (var i = 0; i < data.length; i++) {
                menu += "\n\t ".concat(i + 1, ". ").concat(data[i]);
            }
        }
        else {
            menu = "Select the desired section from the following list:";
            if (data instanceof Type_1.Type) {
                return "";
            }
            var i_1 = 1;
            data.getData().forEach(function (value, key) {
                menu += "\n\t ".concat(i_1++, ". ").concat(key);
            });
        }
        return menu + "\n\n";
    };
    Output.prototype.printDottedLine = function () {
        console.log("----------------------------------------------------------------------------------------------------------------------------------------");
    };
    /* Getters & Setters */
    Output.prototype.getSteps = function () {
        return this.steps;
    };
    Output.prototype.getUserResponse = function () {
        return this.userResponse;
    };
    return Output;
}());
exports.Output = Output;
