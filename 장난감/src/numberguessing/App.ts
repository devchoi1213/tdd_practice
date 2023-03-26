import AppModel from "./AppModel";
import readline from "readline/promises";
import { stdin as input, stdout as output } from 'node:process';
import PositiveIntegerGeneratorSub from "../test/PositiveIntegerGeneratorSub";

const rl = readline.createInterface({ input, output, terminal: true });

class App {
  static async runLoop(model: AppModel) {
    while (!model.isCompleted()) {
      console.log(model.flushOutput());
      model.processInput(await rl.question(''))
    }
    console.log('finished')
  }
}


const appModel = new AppModel(new PositiveIntegerGeneratorSub([50]));

(async function () {
  return await App.runLoop(appModel);
}())
