import { SubCategory } from "../src/classes/SubCategory/SubCategory";
import { Department } from "../src/classes/Department/Department";
import { Category } from "../src/classes/Category/Category";
import { Manager } from "../src/classes/Manager/Manager";
import { Output } from "../src/classes/Output/Output";
import { Type } from "../src/classes/Type/Type";

describe("Output Class", () => {
  let output: Output;

  beforeEach(() => {
    const readlineInterface = {
      question: jest.fn(),
    } as any;

    output = new Output(readlineInterface);
  });

  it("Should display welcome message correctly", () => {
    const consoleLogSpy = jest.spyOn(console, "log");
    output.displayWelcome();
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.stringContaining("Welcome to the Fee Calculator App.")
    );
    consoleLogSpy.mockRestore();
  });

  it("Should print guide correctly", () => {
    const consoleLogSpy = jest.spyOn(console, "log");
    output.printGuide();
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.any(String));
    consoleLogSpy.mockRestore();
  });

  it("Should resolve with a valid user response", async () => {
    // Mock readline.question to resolve with a valid input
    const readlineInterface = {
      question: jest.fn((_, cb) => cb("1")),
    } as any;

    const output = new Output(readlineInterface);
    const response = await output.askQuestion("Pick one option:", 3);
    expect(response).toBe("1");
  });

  it("Should reject with the correct error message on user exit", async () => {
    // Mock readline.question to resolve with "exit"
    const readlineInterface = {
      question: jest.fn((_, cb) => cb("exit" || "6")),
    } as any;

    const output = new Output(readlineInterface);
    await expect(output.askQuestion("Pick one option:", 3)).rejects.toThrow(
      "Exiting program."
    );
  });
});
