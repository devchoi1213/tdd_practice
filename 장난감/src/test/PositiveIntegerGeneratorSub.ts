import PositiveIntegerGenerator from "../numberguessing/PositiveIntegerGenerator";

export default class PositiveIntegerGeneratorSub implements PositiveIntegerGenerator {
  private index: number;
  constructor(private numbers: number[]) {
    this.index = 0;
  }

  generateLessThanOrEqualToHundred(): number {
    const number = this.numbers[this.index];
    this.index = (this.index + 1) % this.numbers.length;
    return number;
  }
}
