import { levels, USER_EXITING_PROGRAM } from "../../constants/constants";
import * as readline from "readline";
import { Type } from "../Type/Type";
import { Manager } from "../Manager/Manager";
import { Category } from "../Category/Category";
import { SubCategory } from "../SubCategory/SubCategory";

export class Output {
  private rl: readline.Interface;
  private userResponse: string;
  private steps: number;

  constructor(rl: readline.Interface) {
    this.rl = rl;
    this.steps = 0;
    this.userResponse = "";
  }

  /* Primary Functions */

  public displayWelcome(): void {
    this.printDottedLine();
    console.log(`Welcome to the Fee Calculator App.\n`);
  }

  public printGuide(): void {
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

  public async askQuestion(
    question: string,
    dataLength: number,
    intermediate?: boolean
  ): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const ask = () => {
        this.rl.question(question, (answer) => {
          const isValidInput = this.isValidInput(
            answer,
            dataLength,
            intermediate ? intermediate : null
          );
          if (isValidInput) {
            if (!intermediate) {
              this.steps = parseInt(answer) - 1;
            }

            this.userResponse = answer;
            resolve(answer);
          } else if (isValidInput === null) {
            reject(new Error(USER_EXITING_PROGRAM));
          } else {
            console.log(`Invalid input received. Please try again.`);
            ask();
          }
        });
      };

      ask();
    });
  }

  private isValidInput(
    answer: string,
    dataLength: number,
    intermediate: boolean | null
  ): boolean | null {
    const answerAsNumber: number = parseInt(answer);
    if (
      answer.toLowerCase() === "exit" ||
      (answerAsNumber === dataLength && !intermediate)
    ) {
      return null;
    } else if (
      // Input wasn't a number or wasn't a valid numeric selection from given menu
      isNaN(answerAsNumber) ||
      answerAsNumber < 1 ||
      answerAsNumber > dataLength
    ) {
      return false;
    }

    return true;
  }

  public printFeeTotals(currentLevel: levels): void {
    console.log(`${this.extractExistingFields(currentLevel)}`);
    console.log(
      `\t 1) Fee total without surplus: $${this.commaSeparateNonDecimal(
        currentLevel.getTotal()
      )} `
    );

    console.log(
      `\t 2) Fee total with surplus: $${this.commaSeparateNonDecimal(
        currentLevel.getSurchargeTotal()
      )} \n`
    );
  }

  /* Helper Functions */

  private extractExistingFields(currentLevel: levels): string {
    let res = ``;

    if (currentLevel instanceof Manager) {
      res += `Results for all departments`;
    } else {
      res += `Results for Department - ${currentLevel.getDepartment()}`;

      if (currentLevel instanceof Category) {
        res += `, Category - ${currentLevel.getCategory()}`;
      } else if (currentLevel instanceof SubCategory) {
        res += `, Category - ${currentLevel.getCategory()}, SubCategory - ${currentLevel.getSubCategory()}`;
      } else if (currentLevel instanceof Type) {
        res += `, Category - ${currentLevel.getCategory()}, SubCategory - ${currentLevel.getSubCategory()}, Type - ${currentLevel.getType()}`;
      }
    }

    return res + `:`;
  }

  private commaSeparateNonDecimal = (number: number): string => {
    const numberStr: string = number.toString();
    const parts: string[] = numberStr.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  public constructMenu(data: string[] | levels): string {
    let menu: string;
    if (Array.isArray(data)) {
      menu = `Pick one of the following options to calculate the Fee Total on by entering the number each option is listed as, or type \'exit\' to exit:`;

      for (let i = 0; i < data.length; i++) {
        menu += `\n\t ${i + 1}. ${data[i]}`;
      }
    } else {
      menu = `Select the desired section from the following list:`;

      if (data instanceof Type) {
        return "";
      }

      let i = 1;
      data.getData().forEach((value: levels, key: string) => {
        menu += `\n\t ${i++}. ${key}`;
      });
    }

    return menu + "\n\n";
  }

  public printDottedLine(): void {
    console.log(
      `----------------------------------------------------------------------------------------------------------------------------------------`
    );
  }

  /* Getters & Setters */

  public getSteps(): number {
    return this.steps;
  }

  public getUserResponse(): string {
    return this.userResponse;
  }
}
