import { CsvProcessor } from "./utils/CsvProcessor";
import { levels } from "./constants/constants";
import { Manager } from "./classes/Manager/Manager";
import { Output } from "./classes/Output/Output";
import { Type } from "./classes/Type/Type";

import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const filePath = "../data/raw_fees.csv";

const main = async () => {
  const csvProcessor = new CsvProcessor();
  const manager = new Manager();
  const output = new Output(rl);
  csvProcessor.processFile(filePath, manager);

  let currentLevel: levels = manager;
  let userChoice: number;
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
      await output.askQuestion(
        output.constructMenu(introOptions),
        introOptions.length
      );

      /* Based on user selection, evaluate many levels to traverse downward, and print available options */
      const steps = output.getSteps();
      for (let i = 0; i < steps; i++) {
        await output.askQuestion(
          output.constructMenu(currentLevel),
          currentLevel.getNumChildren(),
          true
        );

        /* If you're within a 'Container' class still (aka not at the bottom of hierarchy), retrieve the next subset */
        if (!(currentLevel instanceof Type)) {
          userChoice = parseInt(output.getUserResponse());
          const levelKeys: string[] = Array.from(currentLevel.getData().keys());
          currentLevel = currentLevel.getData().get(levelKeys[userChoice - 1])!;
        }
      }

      output.printFeeTotals(currentLevel);
      output.printDottedLine();
      currentLevel = manager;
    } catch (error) {
      console.log(error instanceof Error ? error.message : error);
      break;
    }
  }
  rl.close();
};

main();
