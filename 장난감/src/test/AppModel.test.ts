import {describe, expect, test} from '@jest/globals';
import AppModel from "../numberguessing/AppModel";
import PositiveIntegerGeneratorSub from "./PositiveIntegerGeneratorSub";
// import


describe('AppModel test', () => {
  const NEW_LINE = '\n'
  const SELECT_MODE_MESSAGE = `1: Single player game${NEW_LINE}2: Multiplayer game${NEW_LINE}3: Exit${NEW_LINE}Enter selection`;
  test('sut is uncompleted when it is initialized', () => {
    const sut = new AppModel(new PositiveIntegerGeneratorSub([50]))
    expect(sut.isCompleted()).toBe(false);
  });

  test('sut correctly prints select mode message', () => {
    const sut = new AppModel(new PositiveIntegerGeneratorSub([50]))
    expect(sut.flushOutput()).toEqual(SELECT_MODE_MESSAGE);
  });

  test('sut correctly exists', () => {
    const sut = new AppModel(new PositiveIntegerGeneratorSub([50]));
    sut.processInput("3");

    const actual = sut.isCompleted();

    expect(actual).toBeTruthy();
  });

  test('sut correctly prints single player game start message', () => {
    const sut = new AppModel(new PositiveIntegerGeneratorSub([50]));
    sut.flushOutput();
    sut.processInput("1");

    const actual = sut.flushOutput();

    expect(actual).toEqual(`Single player game${NEW_LINE}I'm thinking of a number between 1 and 100.${NEW_LINE}Enter your guess: `);
  });

  test.each([
    {answer: 50, guess: 40},
    {answer: 30, guess: 29},
    {answer: 89, guess: 9}
  ])
  ('sut correctly prints too low message in single player game', ({answer, guess}) => {
    const sut = new AppModel(new PositiveIntegerGeneratorSub([answer]));
    sut.processInput("1");
    sut.flushOutput();
    sut.processInput(String(guess));

    const actual = sut.flushOutput();

    expect(actual).toEqual(`Your guess is too low.${NEW_LINE}Enter your guess: `);
  });

  test.each([
    {answer: 50, guess: 60},
    {answer: 80, guess: 81},
  ])
  ('sut correctly prints too high message in single player game', ({answer, guess}) => {
    const sut = new AppModel(new PositiveIntegerGeneratorSub([answer]));
    sut.processInput("1");
    sut.flushOutput();
    sut.processInput(String(guess));

    const actual = sut.flushOutput();

    expect(actual).toEqual(`Your guess is too high.${NEW_LINE}Enter your guess: `);
  });

  test.each([
    {answer: 1},
    {answer: 3},
    {answer: 10},
    {answer: 100},
  ])
  ('sut correctly prints correct message in single player game ($answer)', ({answer}) => {
    const sut = new AppModel(new PositiveIntegerGeneratorSub([answer]));
    sut.processInput("1");
    sut.flushOutput();
    sut.processInput(String(answer));

    const actual = sut.flushOutput();

    expect(actual).toEqual(`Correct! 1 guess.${NEW_LINE}1: Single player game${NEW_LINE}2: Multiplayer game${NEW_LINE}3: Exit${NEW_LINE}Enter selection`);
  });

  test.each([
    4, 10, 100
  ])
  ('sut correctly prints guess count if single player game finished', (fails) => {
    const sut = new AppModel(new PositiveIntegerGeneratorSub([50]));
    sut.processInput("1");
    for (let i = 0; i < fails; i++) {
      sut.processInput("30");
    }
    sut.flushOutput();
    sut.processInput("50");

    const actual = sut.flushOutput();

    expect(actual).toEqual(`Correct! ${fails + 1} guesses.${NEW_LINE}1: Single player game${NEW_LINE}2: Multiplayer game${NEW_LINE}3: Exit${NEW_LINE}Enter selection`);
  });

  test('sut correctly prints one guess count if single player game finished', () => {
    const sut = new AppModel(new PositiveIntegerGeneratorSub([50]));
    sut.processInput("1");
    sut.flushOutput();
    sut.processInput("50");

    const actual = sut.flushOutput();

    expect(actual).toEqual(`Correct! 1 guess.${NEW_LINE}1: Single player game${NEW_LINE}2: Multiplayer game${NEW_LINE}3: Exit${NEW_LINE}Enter selection`);
  });

  test('sut prints select mode if single player game finished', () => {
    const sut = new AppModel(new PositiveIntegerGeneratorSub([50]));
    sut.processInput("1");
    sut.flushOutput();
    sut.processInput("50");

    const actual = sut.flushOutput();

    expect(actual).toEqual(`Correct! 1 guess.${NEW_LINE}1: Single player game${NEW_LINE}2: Multiplayer game${NEW_LINE}3: Exit${NEW_LINE}Enter selection`);
  });

  test('sut returns to mode if single player game finished', () => {
    const sut = new AppModel(new PositiveIntegerGeneratorSub([50]));
    sut.processInput("1");
    sut.processInput("50");
    sut.processInput("3");

    const actual = sut.isCompleted();

    expect(actual).toBeTruthy();
  });

  test.each([
    {answers: [100, 10, 1]}
  ])('sut generates answer for each game', ({answers}) => {
    const sut = new AppModel(new PositiveIntegerGeneratorSub(answers));
    for (const answer of answers) {
      sut.processInput("1");
      sut.flushOutput();
      sut.processInput(String(answer));
    }

    const actual = sut.flushOutput();

    expect(actual).toMatch('Correct! ');
  });
});
