import { Manager } from "./classes/Manager/Manager";
import { Output } from "./classes/Output/Output";
import { levels } from "./constants/constants";
import { CsvProcessor } from "./utils/CsvProcessor";

const filePath = "../data/raw_fees.csv";

const main = () => {
  const csvProcessor = new CsvProcessor();
  const manager = new Manager();
  const output = new Output();
  csvProcessor.processFile(filePath, manager);

  let currentLevel: levels = manager;
  let userResponse: string = "";
  let introOptions = [
    `All Departments`,
    `A specific Department`,
    `Category of a Department`,
    `Subcategory of a Category within a Department`,
    `Type of a Subcategory within a Category contained within a Department`,
    `Exit`,
  ];

  output.displayWelcome();
  while (true) {
    output.printGuide();
    output.askQuestion(output.constructMenu(introOptions), introOptions.length);

    if (output.userExitedProgram()) {
      break;
    }

    const steps = output.getSteps();
    for (let i = 0; i < steps; i++) {
      output.askQuestion(
        output.constructMenu(currentLevel),
        currentLevel.getNumChildren(),
        true
      );

      userResponse = output.getUserResponse();

      // Get the corresponding key:value pair in currentLevel hashmap based on the users selection of <1 / 2 / etc.>
      const currentLevelData: levels = currentLevel.getData();
      const arr = Array.from(currentLevelData.entries());
      const [key, value] = arr[parseInt(userResponse) - 1];
      currentLevel = currentLevelData.get(key);
    }

    output.printFeeTotals(currentLevel);
  }

  console.log("Exiting program.");
};

main();
