import PositiveIntegerGenerator from "./PositiveIntegerGenerator";
import { Buffer } from 'node:buffer';

type Processor = (input: string) => Processor;
export default class AppModel {
  private NEW_LINE = '\n'
  private readonly SELECT_MODE_MESSAGE = `1: Single player game${(this.NEW_LINE)}2: Multiplayer game${(this.NEW_LINE)}3: Exit${(this.NEW_LINE)}Enter selection`;

  //TODO 데이터의 크기에 맞게 사이즈를 동적으로 설정하는 방법 찾아보기
  private outputBuffer: Buffer = Buffer.alloc(1000, 0, 'utf8');
  private outputArray: string[] = [];
  private completed: boolean;
  private processor: Processor;

  constructor(private generator: PositiveIntegerGenerator) {
    this.outputArray.push(this.SELECT_MODE_MESSAGE)
    this.completed = false;
    this.processor = this.processModeSelection;
  }

  public isCompleted(): boolean {
    return this.completed;
  }

  public flushOutput(): string {
    let output: string = '';
    const result = this.outputArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      output
    )
    this.outputArray = [];

    return result;
  }

  public processInput(input: string): void {
    this.processor = this.processor(input);
  }

  private print(message: string) {
    this.outputArray.push(message);
  }

  private println(message: string) {
    this.outputArray.push(`${message}${this.NEW_LINE}`);
  }

  private processModeSelection(input: string): Processor {
    if (input === "1") {
      this.println(`Single player game`);
      this.println(`I'm thinking of a number between 1 and 100.`);
      this.print(`Enter your guess: `);
      const answer = this.generator.generateLessThanOrEqualToHundred();
      return this.getSinglePlayerGameProcessor(answer, 1);
    } else if(input === "2") {
      this.println(`Multiplayer game`)
      this.print(`Enter player names seperated with commas: `);
      return this.startMultiplayerGame();
    } else {
      this.completed = true;
      return null;
    }
  }

  private startMultiplayerGame(): Processor {
    return input => {
      const players = input.split(',').map(player => {
        return player.trim();
      });
      this.println(`I'm thinking of a number between 1 and 100.`);
      const answer = this.generator.generateLessThanOrEqualToHundred();
      return this.getMultiplayerGameProcessor(players, answer, 1);
    };
  }

  private getMultiplayerGameProcessor(players: string[], answer: number, tries: number): Processor {
    const player = players[(tries - 1) % players.length];
    this.print(`Enter ${player}'s guess: `);
    return input => {
      const guess = Number(input);
      if(guess < answer) {
        this.println(`${player}'s guess is too low.${this.NEW_LINE}`);
        return this.getMultiplayerGameProcessor(players, answer, tries + 1);
      } else if(guess > answer) {
        this.println(`${player}'s guess is too high.${this.NEW_LINE}`);
        return this.getMultiplayerGameProcessor(players, answer, tries + 1);
      } else {
        this.print(`Correct!`);
        this.println(`${player} wins.${this.NEW_LINE}`);
        this.print(`${this.SELECT_MODE_MESSAGE}`);
        return this.processModeSelection;
      }
    };
  }

  private getSinglePlayerGameProcessor(answer: number, tries: number): Processor {
    return (input: string) => {
      const guess = Number(input);
      if (guess < answer) {
        this.println(`Your guess is too low.`);
        this.print(`Enter your guess: `);
        return this.getSinglePlayerGameProcessor(answer, tries + 1);
      } else if (guess > answer) {
        this.println(`Your guess is too high.`);
        this.print(`Enter your guess: `);
        return this.getSinglePlayerGameProcessor(answer, tries + 1);
      } else {
        this.println(`Correct! ${tries} ${tries === 1 ? 'guess' : 'guesses'}.`);
        this.print(`${this.SELECT_MODE_MESSAGE}`);
        return this.processModeSelection
      }
    }
  }
}
