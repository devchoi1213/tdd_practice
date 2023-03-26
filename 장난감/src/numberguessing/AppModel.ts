import PositiveIntegerGenerator from "./PositiveIntegerGenerator";

// interface Processor {
//   run(input: string): Processor;
// }

type Processor = (input: string) => Processor;

export default class AppModel {
  private NEW_LINE = '\n'
  private readonly SELECT_MODE_MESSAGE = `1: Single player game${(this.NEW_LINE)}2: Multiplayer game${(this.NEW_LINE)}3: Exit${(this.NEW_LINE)}Enter selection`;

  private completed: boolean;
  private output: string;
  private processor: Processor;

  constructor(private generator: PositiveIntegerGenerator) {
    this.completed = false;
    this.output = this.SELECT_MODE_MESSAGE;
    this.processor = this.processModeSelection;
  }

  public isCompleted(): boolean {
    return this.completed;
  }

  public flushOutput(): string {
    return this.output;
  }

  public processInput(input: string): void {
    this.processor = this.processor(input);
  }

  private processModeSelection(input: string): Processor {
    if (input === "1") {
      this.output = `Single player game${this.NEW_LINE}I'm thinking of a number between 1 and 100.${this.NEW_LINE}Enter your guess: `;
      const answer = this.generator.generateLessThanOrEqualToHundred();
      return this.getSinglePlayerGameProcessor(answer, 1);
    }

    if (input === "3") {
      this.completed = true;
      return null;
    }
  }

  private getSinglePlayerGameProcessor(answer: number, tries: number): Processor {
    return (input: string) => {
      const guess = Number(input);
      if (guess < answer) {
        this.output = `Your guess is too low.${this.NEW_LINE}Enter your guess: `;
        return this.getSinglePlayerGameProcessor(answer, tries + 1);
      } else if (guess > answer) {
        this.output = `Your guess is too high.${this.NEW_LINE}Enter your guess: `;
        return this.getSinglePlayerGameProcessor(answer, tries + 1);
      } else {
        this.output = `Correct! ${tries} ${tries === 1 ? 'guess' : 'guesses'}.${this.NEW_LINE}${this.SELECT_MODE_MESSAGE}`;
        return this.processModeSelection
      }
    }
  }
}
