import {describe, expect, test} from '@jest/globals';
import AppModel from "../numberguessing/AppModel";
import PositiveIntegerGeneratorStub from "./PositiveIntegerGeneratorStub";
// import


describe('AppModelPrivateMethod test', () => {
  const NEW_LINE = '\n'
  test('print correctly appends string to outputArray ', () => {
    const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
    sut.flushOutput();

    const printMethod = (sut as any).print;
    printMethod.call(sut, 'foo');

    let outputArray = (sut as any).outputArray;

    const actual = outputArray[0];
    expect(actual).toBe('foo');
  });

  test('print correctly appends string and line seperator to outputArray ', () => {
    const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
    sut.flushOutput();

    const printlnMethod = (sut as any).println;
    printlnMethod.call(sut, 'foo');

    let outputArray = (sut as any).outputArray;

    const actual = outputArray[0];
    expect(actual).toBe('foo' + NEW_LINE);
  });
});
