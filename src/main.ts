import { Manager } from "./classes/Manager/Manager";
import { CsvProcessor } from "./utils/CsvProcessor";

const filePath = "../data/raw_fees.csv";

const main = () => {
  const manager = new Manager();
  const csvProcessor = new CsvProcessor();

  csvProcessor.processFile(filePath, manager);

  setTimeout(() => {
    console.log("total: " + manager.getTotal());
  }, 5000);
};

main();

/**
 * Import .csv
 * Update current .csv row (in a loop)
 *  - Pass that row into Manager
 */
