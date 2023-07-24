"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Output = void 0;
var readline_1 = require("readline");
var Type_1 = require("../Type/Type");
var SubCategory_1 = require("../SubCategory/SubCategory");
var Category_1 = require("../Category/Category");
var rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var Output = /** @class */ (function () {
    function Output() {
        this.steps = 0;
        this.endProgram = false;
        this.userResponse = "";
    }
    /* Primary Functions */
    Output.prototype.displayWelcome = function () {
        this.printDottedLine();
        console.log("Welcome to the Fee Calculator App.\n");
    };
    Output.prototype.printGuide = function () {
        var structure = "\n         |------------- 1 -------------|  \n         v                             v\n    +---------+                     +---------+\n    |  Sales  |    <---- 2 ---->    |Marketing|\n    |  Dept.  |                     |  Dept.  |\n    +---------+                     +---------+\n     /                                      |\n    v         v                              v\n+----------+  +---------+                  +---------+\n|Sales Eng.|  |Pre Sales|  <---- 3 ---->   |   ABM   |\n| Category |  |Category |                  |Category |\n+----------+  +---------+                  +---------+\n   |              /                              /     |             /                              /       v            v      v                        v      v\n+-------+ +-------+ +-------+               +-------+  +-------+\n|Subcat1| |Subcat1| |Subcat2|   <-- 4 -->   |Subcat1|  |Subcat2|\n+-------+ +-------+ +-------+               +-------+  +-------+\n   |         |       /                           |       |\n   v         v      v       v                     v       v\n+-----+   +-----+ +-----+ +-----+               +-----+ +-----+ \n|TypeA|   |TypeC| |TypeA| |TypeB|   <-- 5 -->   |TypeA| |TypeC|\n+-----+   +-----+ +-----+ +-----+               +-----+ +-----+\n";
        this.printDottedLine();
        console.log("Use the following diagram as your guide:\n");
        console.log(structure);
    };
    Output.prototype.askQuestion = function (question, dataLength, intermediate) {
        var _this = this;
        var isValidInput = false;
        while (!isValidInput) {
            rl.question(question, function (answer) {
                isValidInput = _this.isValidInput(answer, dataLength);
                _this.userResponse = answer;
            });
            if (isValidInput === null) {
                this.endProgram = true;
                break;
            }
            else if (!isValidInput) {
                console.log("Invalid input received. Please try again.");
            }
        }
        if (!intermediate) {
            this.steps = parseInt(this.userResponse) - 1;
        }
    };
    Output.prototype.printFeeTotals = function (currentLevel) {
        console.log("Fee total without surplus: ".concat(currentLevel.getTotal(), "."));
        if (!(currentLevel instanceof Category_1.Category) &&
            !(currentLevel instanceof SubCategory_1.SubCategory) &&
            !(currentLevel instanceof Type_1.Type)) {
            console.log("Fee total with surplus: ".concat(currentLevel.getSurchargeTotal()));
        }
    };
    /* Helper Functions */
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
    Output.prototype.constructMenu = function (data) {
        var menu;
        if (Array.isArray(data)) {
            menu = "Pick one of the following options to calculate the Fee Total on by entering the number each option is listed as, or type 'exit' to exit:";
            for (var i = 0; i < data.length; i++) {
                menu += "\n\t ".concat(i, ". ").concat(data[i]);
            }
        }
        else {
            menu = "Pick a ".concat(data.constructor.name, " from the following list:");
            if (data instanceof Type_1.Type) {
                return "";
            }
            var i_1 = 1;
            data.getData().forEach(function (value, key) {
                menu += "\n\t ".concat(i_1++, ". ").concat(key);
            });
        }
        return menu;
    };
    Output.prototype.printDottedLine = function () {
        console.log("------------------------------------------------------------");
    };
    /* Getters & Setters */
    Output.prototype.getSteps = function () {
        return this.steps;
    };
    Output.prototype.userExitedProgram = function () {
        return this.endProgram;
    };
    Output.prototype.getUserResponse = function () {
        return this.userResponse;
    };
    return Output;
}());
exports.Output = Output;
/**
 * 1. Entire Department
 * 2. Category belonging to a Department
 * 3. Subcategory within a category belonging to a Department
 * 4. Specific Type of a Subcategory within a Category belonging to a Department
 *
       +---------+                     +---------+
       |  Sales  |    <---- 1 ---->    |Marketing|
       |  Dept.  |                     |  Dept.  |
       +---------+                     +---------+
        /       \                              |
       v         v                             v
  +----------+  +---------+                  +---------+
  |Sales Eng.|  |Pre Sales|  <---- 2 ---->   |   ABM   |
  | Category |  |Category |                  |Category |
  +----------+  +---------+                  +---------+
    |             /  \                             /  \
    |            /    \                           /    \
    v           v      v                         v      v
 +-------+ +-------+ +-------+              +-------+  +-------+
 |Subcat1| |Subcat1| |Subcat2|  <-- 3 -->   |Subcat1|  |Subcat2|
 +-------+ +-------+ +-------+              +-------+  +-------+
    |          |       /    \                     |       |
    |          v      v      v                    v       v
 +-----+   +-----+ +-----+ +-----+             +-----+ +-----+
 |TypeA|   |TypeC| |TypeA| |TypeB|  <-- 4 -->  |TypeA| |TypeC|
 +-----+   +-----+ +-----+ +-----+             +-----+ +-----+
 */
