"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Output = void 0;
const constants_1 = require("../../constants/constants");
const Type_1 = require("../Type/Type");
const Manager_1 = require("../Manager/Manager");
const Category_1 = require("../Category/Category");
const SubCategory_1 = require("../SubCategory/SubCategory");
class Output {
    constructor(rl) {
        this.commaSeparateNonDecimal = (number) => {
            const numberStr = number.toString();
            const parts = numberStr.split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        };
        this.rl = rl;
        this.steps = 0;
        this.userResponse = "";
    }
    /* Primary Functions */
    displayWelcome() {
        this.printDottedLine();
        console.log(`Welcome to the Fee Calculator App.\n`);
    }
    printGuide() {
        const structure = `
         |------------- 1 -------------|  
         v                             v
    +---------+                 +---------+
    |  Sales  |  <---- 2 ---->  |Marketing|
    |  Dept.  |                 |  Dept.  |
    +---------+                 +---------+
     /       \\                           |
    v         v                          v
+----------+  +---------+                +---------+
|Sales Eng.|  |Pre Sales| <---- 3 ---->  |   ABM   |
| Category |  |Category |                |Category |
+----------+  +---------+                +---------+
   |              /  \\                        /  \\
   |             /    \\                      /    \\
   v            v      v                    v      v
+-------+ +-------+ +-------+           +-------+  +-------+
|Subcat1| |Subcat1| |Subcat2| <-- 4 --> |Subcat1|  |Subcat2|
+-------+ +-------+ +-------+           +-------+  +-------+
   |         |       /     \\                   |       |
   v         v      v       v                  v       v
+-----+   +-----+ +-----+ +-----+             +-----+ +-----+ 
|TypeA|   |TypeC| |TypeA| |TypeB|  <-- 5 -->  |TypeA| |TypeC|
+-----+   +-----+ +-----+ +-----+             +-----+ +-----+
`;
        console.log(`Use the following diagram as your guide:\n`);
        console.log(structure);
    }
    async askQuestion(question, dataLength, intermediate) {
        return new Promise((resolve, reject) => {
            const ask = () => {
                this.rl.question(question, (answer) => {
                    const isValidInput = this.isValidInput(answer, dataLength, intermediate ? intermediate : null);
                    if (isValidInput) {
                        if (!intermediate) {
                            this.steps = parseInt(answer) - 1;
                        }
                        this.userResponse = answer;
                        resolve(answer);
                    }
                    else if (isValidInput === null) {
                        reject(new Error(constants_1.USER_EXITING_PROGRAM));
                    }
                    else {
                        console.log(`Invalid input received. Please try again.`);
                        ask();
                    }
                });
            };
            ask();
        });
    }
    isValidInput(answer, dataLength, intermediate) {
        const answerAsNumber = parseInt(answer);
        if (answer.toLowerCase() === "exit" ||
            (answerAsNumber === dataLength && !intermediate)) {
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
    }
    printFeeTotals(currentLevel) {
        console.log(`${this.extractExistingFields(currentLevel)}`);
        console.log(`\t 1) Fee total without surplus: $${this.commaSeparateNonDecimal(currentLevel.getTotal())} `);
        console.log(`\t 2) Fee total with surplus: $${this.commaSeparateNonDecimal(currentLevel.getSurchargeTotal())} \n`);
    }
    /* Helper Functions */
    extractExistingFields(currentLevel) {
        let res = ``;
        if (currentLevel instanceof Manager_1.Manager) {
            res += `Results for all departments`;
        }
        else {
            res += `Results for Department - ${currentLevel.getDepartment()}`;
            if (currentLevel instanceof Category_1.Category) {
                res += `, Category - ${currentLevel.getCategory()}`;
            }
            else if (currentLevel instanceof SubCategory_1.SubCategory) {
                res += `, Category - ${currentLevel.getCategory()}, SubCategory - ${currentLevel.getSubCategory()}`;
            }
            else if (currentLevel instanceof Type_1.Type) {
                res += `, Category - ${currentLevel.getCategory()}, SubCategory - ${currentLevel.getSubCategory()}, Type - ${currentLevel.getType()}`;
            }
        }
        return res + `:`;
    }
    constructMenu(data) {
        let menu;
        if (Array.isArray(data)) {
            menu = `Pick one of the following options to calculate the Fee Total on by entering the number each option is listed as, or type \'exit\' to exit:`;
            for (let i = 0; i < data.length; i++) {
                menu += `\n\t ${i + 1}. ${data[i]}`;
            }
        }
        else {
            menu = `Select the desired section from the following list:`;
            if (data instanceof Type_1.Type) {
                return "";
            }
            let i = 1;
            data.getData().forEach((value, key) => {
                menu += `\n\t ${i++}. ${key}`;
            });
        }
        return menu + "\n\n";
    }
    printDottedLine() {
        console.log(`----------------------------------------------------------------------------------------------------------------------------------------`);
    }
    /* Getters & Setters */
    getSteps() {
        return this.steps;
    }
    getUserResponse() {
        return this.userResponse;
    }
}
exports.Output = Output;
