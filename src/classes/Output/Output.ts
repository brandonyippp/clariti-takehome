import * as readline from "readline";
import { Type } from "../Type/Type";
import { levels } from "../../constants/constants";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export class Output {
  private steps: number;
  private userResponse: string;

  constructor() {
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
        rl.question(question, (answer) => {
          const isValidInput = this.isValidInput(answer, dataLength);
          if (isValidInput) {
            if (!intermediate) {
              this.steps = parseInt(answer) - 1;
            }

            this.userResponse = answer;
            resolve(answer);
          } else if (isValidInput === null) {
            rl.close();
            reject(new Error("User exiting program"));
          } else {
            console.log(`Invalid input received. Please try again.`);
            ask();
          }
        });
      };

      ask();
    });
  }

  private isValidInput(answer: string, dataLength: number): boolean | null {
    const answerAsNumber: number = parseInt(answer);
    if (answer.toLowerCase() === "exit") {
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
    console.log(
      `*** Fee total without surplus: $${this.commaSeparateNonDecimal(
        currentLevel.getTotal()
      )} ***`
    );

    console.log(
      `*** Fee total with surplus: $${this.commaSeparateNonDecimal(
        currentLevel.getSurchargeTotal()
      )} ***\n\n`
    );
  }

  /* Helper Functions */

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
