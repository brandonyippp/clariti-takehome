"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Manager_1 = require("./classes/Manager/Manager");
var Output_1 = require("./classes/Output/Output");
var CsvProcessor_1 = require("./utils/CsvProcessor");
var filePath = "../data/raw_fees.csv";
var main = function () {
    var csvProcessor = new CsvProcessor_1.CsvProcessor();
    var manager = new Manager_1.Manager();
    var output = new Output_1.Output();
    csvProcessor.processFile(filePath, manager);
    var currentLevel = manager;
    var userResponse = "";
    var introOptions = [
        "All Departments",
        "A specific Department",
        "Category of a Department",
        "Subcategory of a Category within a Department",
        "Type of a Subcategory within a Category contained within a Department",
        "Exit",
    ];
    output.displayWelcome();
    while (true) {
        output.printGuide();
        output.askQuestion(output.constructMenu(introOptions), introOptions.length);
        if (output.userExitedProgram()) {
            break;
        }
        var steps = output.getSteps();
        for (var i = 0; i < steps; i++) {
            output.askQuestion(output.constructMenu(currentLevel), currentLevel.getNumChildren(), true);
            userResponse = output.getUserResponse();
            // Get the corresponding key:value pair in currentLevel hashmap based on the users selection of <1 / 2 / etc.>
            var currentLevelData = currentLevel.getData();
            var arr = Array.from(currentLevelData.entries());
            var _a = arr[parseInt(userResponse) - 1], key = _a[0], value = _a[1];
            currentLevel = currentLevelData.get(key);
        }
        output.printFeeTotals(currentLevel);
    }
    console.log("Exiting program.");
};
main();
