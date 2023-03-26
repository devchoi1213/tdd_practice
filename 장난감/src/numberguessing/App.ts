import AppModel from "./AppModel";
import * as readline from "readline/promises";
import { stdin as input, stdout as output } from 'node:process';

const rl = readline.createInterface({ input, output });

class App {
  private static async runLoop(model: AppModel) {
    while (!model.isCompleted()) {
      console.log(model.flushOutput());
      model.processInput(await rl.question('test'))
    }
  }
}
