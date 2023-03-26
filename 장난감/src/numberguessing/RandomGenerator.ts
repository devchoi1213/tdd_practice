import PositiveIntegerGenerator from "./PositiveIntegerGenerator";

class RandomGenerator implements PositiveIntegerGenerator {
  generateLessThanOrEqualToHundred(): number {
    return Math.floor(Math.random() * 101);
  }
}
