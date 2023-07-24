import { Manager } from "./classes/Manager/Manager";
import { Output } from "./classes/Output/Output";
import { Type } from "./classes/Type/Type";
import { levels } from "./constants/constants";
import { CsvProcessor } from "./utils/CsvProcessor";

const filePath = "../data/raw_fees.csv";

const main = async () => {
  const csvProcessor = new CsvProcessor();
  const manager = new Manager();
  const output = new Output();
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

      const steps = output.getSteps();
      for (let i = 0; i < steps; i++) {
        await output.askQuestion(
          output.constructMenu(currentLevel),
          currentLevel.getNumChildren(),
          true
        );

        if (!(currentLevel instanceof Type)) {
          userChoice = parseInt(output.getUserResponse());
          const arr: string[] = Array.from(currentLevel.getData().keys());
          currentLevel = currentLevel.getData().get(arr[userChoice - 1])!;
        }
      }

      output.printFeeTotals(currentLevel);
      output.printDottedLine();
      currentLevel = manager;
    } catch (error) {
      //   console.log(error);
      break;
    }
  }
  console.log("Exiting program.");
};

main();
