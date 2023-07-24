"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const CsvProcessor_1 = require("./utils/CsvProcessor");
const Manager_1 = require("./classes/Manager/Manager");
const Output_1 = require("./classes/Output/Output");
const Type_1 = require("./classes/Type/Type");
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const filePath = "../data/raw_fees.csv";
const main = async () => {
    const csvProcessor = new CsvProcessor_1.CsvProcessor();
    const manager = new Manager_1.Manager();
    const output = new Output_1.Output(rl);
    csvProcessor.processFile(filePath, manager);
    let currentLevel = manager;
    let userChoice;
    let introOptions = [
        `All Departments`,
        `A specific Department`,
        `Category of a Department`,
        `Subcategory of a Category within a Department`,
        `Type of a Subcategory within a Category contained within a Department`,
        `Exit`,
    ];
    output.displayWelcome();
    output.printGuide();
    while (true) {
        try {
            await output.askQuestion(output.constructMenu(introOptions), introOptions.length);
            /* Based on user selection, evaluate many levels to traverse downward, and print available options */
            const steps = output.getSteps();
            for (let i = 0; i < steps; i++) {
                await output.askQuestion(output.constructMenu(currentLevel), currentLevel.getNumChildren(), true);
                /* If you're within a 'Container' class still (aka not at the bottom of hierarchy), retrieve the next subset */
                if (!(currentLevel instanceof Type_1.Type)) {
                    userChoice = parseInt(output.getUserResponse());
                    const levelKeys = Array.from(currentLevel.getData().keys());
                    currentLevel = currentLevel.getData().get(levelKeys[userChoice - 1]);
                }
            }
            output.printFeeTotals(currentLevel);
            output.printDottedLine();
            currentLevel = manager;
        }
        catch (error) {
            console.log(error instanceof Error ? error.message : error);
            break;
        }
    }
    rl.close();
};
main();
