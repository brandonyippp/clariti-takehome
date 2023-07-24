import readline from "readline";
import { levels } from "../../constants/constants";
import { Type } from "../Type/Type";
import { SubCategory } from "../SubCategory/SubCategory";
import { Category } from "../Category/Category";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export class Output {
  private steps: number;
  private endProgram: boolean;
  private userResponse: string;

  constructor() {
    this.steps = 0;
    this.endProgram = false;
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
    +---------+                     +---------+
    |  Sales  |    <---- 2 ---->    |Marketing|
    |  Dept.  |                     |  Dept.  |
    +---------+                     +---------+
     /       \                               |
    v         v                              v
+----------+  +---------+                  +---------+
|Sales Eng.|  |Pre Sales|  <---- 3 ---->   |   ABM   |
| Category |  |Category |                  |Category |
+----------+  +---------+                  +---------+
   |              /  \                            /  \
   |             /    \                          /    \
   v            v      v                        v      v
+-------+ +-------+ +-------+               +-------+  +-------+
|Subcat1| |Subcat1| |Subcat2|   <-- 4 -->   |Subcat1|  |Subcat2|
+-------+ +-------+ +-------+               +-------+  +-------+
   |         |       /     \                      |       |
   v         v      v       v                     v       v
+-----+   +-----+ +-----+ +-----+               +-----+ +-----+ 
|TypeA|   |TypeC| |TypeA| |TypeB|   <-- 5 -->   |TypeA| |TypeC|
+-----+   +-----+ +-----+ +-----+               +-----+ +-----+
`;

    this.printDottedLine();
    console.log(`Use the following diagram as your guide:\n`);
    console.log(structure);
  }

  public askQuestion(
    question: string,
    dataLength: number,
    intermediate?: boolean
  ): void {
    let isValidInput: boolean | null = false;

    while (!isValidInput) {
      rl.question(question, (answer) => {
        isValidInput = this.isValidInput(answer, dataLength);
        this.userResponse = answer;
      });

      if (isValidInput === null) {
        this.endProgram = true;
        break;
      } else if (!isValidInput) {
        console.log(`Invalid input received. Please try again.`);
      }
    }

    if (!intermediate) {
      this.steps = parseInt(this.userResponse) - 1;
    }
  }

  public printFeeTotals(currentLevel: levels): void {
    console.log(`Fee total without surplus: ${currentLevel.getTotal()}.`);
    if (
      !(currentLevel instanceof Category) &&
      !(currentLevel instanceof SubCategory) &&
      !(currentLevel instanceof Type)
    ) {
      console.log(
        `Fee total with surplus: ${currentLevel.getSurchargeTotal()}`
      );
    }
  }

  /* Helper Functions */

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

  public constructMenu(data: string[] | levels): string {
    let menu: string;
    if (Array.isArray(data)) {
      menu = `Pick one of the following options to calculate the Fee Total on by entering the number each option is listed as, or type \'exit\' to exit:`;

      for (let i = 0; i < data.length; i++) {
        menu += `\n\t ${i}. ${data[i]}`;
      }
    } else {
      menu = `Pick a ${data.constructor.name} from the following list:`;

      if (data instanceof Type) {
        return "";
      }

      let i = 1;
      data.getData().forEach((value: levels, key: string) => {
        menu += `\n\t ${i++}. ${key}`;
      });
    }

    return menu;
  }

  private printDottedLine(): void {
    console.log(`------------------------------------------------------------`);
  }

  /* Getters & Setters */

  public getSteps(): number {
    return this.steps;
  }

  public userExitedProgram(): boolean {
    return this.endProgram;
  }

  public getUserResponse(): string {
    return this.userResponse;
  }
}

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
