import {describe, expect, test} from '@jest/globals';
import AppModel from "../numberguessing/AppModel";
import PositiveIntegerGeneratorStub from "./PositiveIntegerGeneratorStub";
// import


describe('AppModel test', () => {
  const NEW_LINE = '\n'
  const SELECT_MODE_MESSAGE = `1: Single player game${NEW_LINE}2: Multiplayer game${NEW_LINE}3: Exit${NEW_LINE}Enter selection`;
  test('sut is uncompleted when it is initialized', () => {
    const sut = new AppModel(new PositiveIntegerGeneratorStub([50]))
    expect(sut.isCompleted()).toBe(false);
  });

  test('sut correctly prints select mode message', () => {
    const sut = new AppModel(new PositiveIntegerGeneratorStub([50]))
    expect(sut.flushOutput()).toEqual(SELECT_MODE_MESSAGE);
  });

  test('sut correctly exists', () => {
    const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
    sut.processInput("3");

    const actual = sut.isCompleted();

    expect(actual).toBeTruthy();
  });

  test('sut correctly prints single player game start message', () => {
    const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
    sut.flushOutput();
    sut.processInput("1");

    const actual = sut.flushOutput();

    expect(actual).toMatch(`Single player game${NEW_LINE}I'm thinking of a number between 1 and 100.${NEW_LINE}Enter your guess: `);
  });

  test.each([
    {answer: 50, guess: 40},
    {answer: 30, guess: 29},
    {answer: 89, guess: 9}
  ])
  ('sut correctly prints too low message in single player game', ({answer, guess}) => {
    const sut = new AppModel(new PositiveIntegerGeneratorStub([answer]));
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
    const sut = new AppModel(new PositiveIntegerGeneratorStub([answer]));
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
    const sut = new AppModel(new PositiveIntegerGeneratorStub([answer]));
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
    const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
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
    const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
    sut.processInput("1");
    sut.flushOutput();
    sut.processInput("50");

    const actual = sut.flushOutput();

    expect(actual).toEqual(`Correct! 1 guess.${NEW_LINE}1: Single player game${NEW_LINE}2: Multiplayer game${NEW_LINE}3: Exit${NEW_LINE}Enter selection`);
  });

  test('sut prints select mode if single player game finished', () => {
    const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
    sut.processInput("1");
    sut.flushOutput();
    sut.processInput("50");

    const actual = sut.flushOutput();

    expect(actual).toEqual(`Correct! 1 guess.${NEW_LINE}1: Single player game${NEW_LINE}2: Multiplayer game${NEW_LINE}3: Exit${NEW_LINE}Enter selection`);
  });

  test('sut returns to mode if single player game finished', () => {
    const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
    sut.processInput("1");
    sut.processInput("50");
    sut.processInput("3");

    const actual = sut.isCompleted();

    expect(actual).toBeTruthy();
  });

  test.each([
    {answers: [100, 10, 1]}
  ])('sut generates answer for each game', ({answers}) => {
    const sut = new AppModel(new PositiveIntegerGeneratorStub(answers));
    for (const answer of answers) {
      sut.processInput("1");
      sut.flushOutput();
      sut.processInput(String(answer));
    }

    const actual = sut.flushOutput();

    expect(actual).toMatch('Correct! ');
  });

  test('sut correctly prints multiplayer game setup message', () => {
    const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
    sut.flushOutput();
    sut.processInput("2");

    const actual = sut.flushOutput();

    expect(actual).toEqual(`Multiplayer game${NEW_LINE}Enter player names seperated with commas: `);
  });

  test('sut correctly prints multiplayer game start message', () => {
    const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
    sut.processInput("2");
    sut.flushOutput();
    sut.processInput("Foo, Bar");

    const actual = sut.flushOutput();

    expect(actual).toMatch(`I'm thinking of a number between 1 and 100.${NEW_LINE}`);
  });

  test.each([
    {
      player1: "Foo",
      player2: "Bar",
      player3: "Baz",
    },
    {
      player1: "Bar",
      player2: "Baz",
      player3: "Foo",
    },
    {
      player1: "Baz",
      player2: "Foo",
      player3: "Bar",
    }
  ])('sut correctly prompts first player name ($player1)', ({player1, player2, player3}) => {
    const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
    sut.processInput("2");
    sut.flushOutput();
    sut.processInput(`${player1},${player2},${player3}`)

    const actual = sut.flushOutput();

    expect(actual).toMatch(`Enter ${player1}'s guess: `);
  });

  test.each([
    {
      player1: "Foo",
      player2: "Bar",
      player3: "Baz",
    },
    {
      player1: "Bar",
      player2: "Baz",
      player3: "Foo",
    },
    {
      player1: "Baz",
      player2: "Foo",
      player3: "Bar",
    }
  ])('sut correctly prompts second player name ($player2)', ({player1, player2, player3}) => {
    const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
    sut.processInput("2");
    sut.flushOutput();
    sut.processInput(`${player1},${player2},${player3}`)
    sut.flushOutput();
    sut.processInput(`10`)

    const actual = sut.flushOutput();

    expect(actual).toMatch(`Enter ${player2}'s guess: `);
  });

  test.each([
    {
      player1: "Foo",
      player2: "Bar",
      player3: "Baz",
    },
    {
      player1: "Bar",
      player2: "Baz",
      player3: "Foo",
    },
    {
      player1: "Baz",
      player2: "Foo",
      player3: "Bar",
    }
  ])('sut correctly prompts third player name ($player3)', ({player1, player2, player3}) => {
    const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
    sut.processInput("2");
    sut.flushOutput();
    sut.processInput(`${player1},${player2},${player3}`)
    sut.flushOutput();
    sut.processInput(`10`)
    sut.flushOutput();
    sut.processInput(`10`)

    const actual = sut.flushOutput();

    expect(actual).toMatch(`Enter ${player3}'s guess: `);
  });

  test.each([
    {
      player1: "Foo",
      player2: "Bar",
      player3: "Baz",
    },
    {
      player1: "Bar",
      player2: "Baz",
      player3: "Foo",
    },
    {
      player1: "Baz",
      player2: "Foo",
      player3: "Bar",
    }
  ])('sut correctly rounds players ($player3)', ({player1, player2, player3}) => {
    const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
    sut.processInput("2");
    sut.flushOutput();
    sut.processInput(`${player1},${player2},${player3}`)
    sut.flushOutput();
    sut.processInput(`10`)
    sut.flushOutput();
    sut.processInput(`10`)
    sut.flushOutput();
    sut.processInput(`10`)

    const actual = sut.flushOutput();

    expect(actual).toMatch(`Enter ${player1}'s guess: `);
  });

  test.each([
    {
      answer: 50,
      guess: 40,
      fails: 1,
      lastPlayer: "Foo",
    },
    {
      answer: 30,
      guess: 29,
      fails: 2,
      lastPlayer: "Bar",
    },
  ])('sut correctly prints too low message in multiplayer game (lastPlayer)', ({answer, guess, fails, lastPlayer}) => {
    const sut = new AppModel(new PositiveIntegerGeneratorStub([answer]));
    sut.processInput("2");
    sut.flushOutput();
    sut.processInput(`Foo,Bar,Baz`)
    for (let i = 0; i < fails - 1; i++) {
      sut.processInput(String(guess));
    }
    sut.flushOutput();
    sut.processInput(String(guess));

    const actual = sut.flushOutput();

    expect(actual).toMatch(`${lastPlayer}'s guess is too low.${NEW_LINE}`);
  });

  test.each([
    {
      answer: 50,
      guess: 60,
      fails: 1,
      lastPlayer: "Foo",
    },
    {
      answer: 9,
      guess: 81,
      fails: 2,
      lastPlayer: "Bar",
    },
  ])('sut correctly prints too high message in multiplayer game (lastPlayer)', ({answer, guess, fails, lastPlayer}) => {
    const sut = new AppModel(new PositiveIntegerGeneratorStub([answer]));
    sut.processInput("2");
    sut.flushOutput();
    sut.processInput(`Foo,Bar,Baz`)
    for (let i = 0; i < fails - 1; i++) {
      sut.processInput(String(guess));
    }
    sut.flushOutput();
    sut.processInput(String(guess));

    const actual = sut.flushOutput();

    expect(actual).toMatch(`${lastPlayer}'s guess is too high.${NEW_LINE}`);
  });

  test.each([
    {
      answer: 60,
      guess: 60,
      fails: 1,
      lastPlayer: "Foo",
    },
    {
      answer: 81,
      guess: 81,
      fails: 2,
      lastPlayer: "Bar",
    },
  ])('sut correctly prints correct message in multiplayer game (lastPlayer)', ({answer, guess, fails}) => {
    const sut = new AppModel(new PositiveIntegerGeneratorStub([answer]));
    sut.processInput("2");
    sut.flushOutput();
    sut.processInput(`Foo,Bar,Baz`)
    for (let i = 0; i < fails - 1; i++) {
      sut.processInput(String(guess));
    }
    sut.flushOutput();
    sut.processInput(String(guess));

    const actual = sut.flushOutput();

    expect(actual).toMatch(`Correct!`);
  });

  test.each([
    {
      fails: 0,
      winner: "Foo",
    },
    {
      fails: 1,
      winner: "Bar",
    },
    {
      fails: 2,
      winner: "Baz",
    },
    {
      fails: 99,
      winner: "Foo",
    },
    {
      fails: 100,
      winner: "Bar",
    },
  ])('sut correctly prints winner if multiplayer game finished (lastPlayer)', ({fails, winner}) => {
    const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
    sut.processInput("2");
    sut.flushOutput();
    sut.processInput(`Foo,Bar,Baz`)
    for (let i = 0; i < fails - 1; i++) {
      sut.processInput("30");
    }
    sut.flushOutput();
    sut.processInput("50");

    const actual = sut.flushOutput();

    expect(actual).toMatch(`${winner} wins.${NEW_LINE}`);
  });

  test('sut prints select mode if multiplayer game finished', () => {
    const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
    sut.processInput("2");
    sut.processInput(`Foo,Bar,Baz`)
    sut.flushOutput();
    sut.processInput("50");

    const actual = sut.flushOutput();

    expect(actual).toMatch(`1: Single player game${(NEW_LINE)}2: Multiplayer game${(NEW_LINE)}3: Exit${(NEW_LINE)}Enter selection`);
  });

  test('sut returns to mode select mode if multiplayer game finished', () => {
    const sut = new AppModel(new PositiveIntegerGeneratorStub([50]));
    sut.processInput("2");
    sut.processInput(`Foo,Bar,Baz`)
    sut.processInput("20");
    sut.processInput("50");
    sut.processInput("3");

    const actual = sut.isCompleted();

    expect(actual).toBeTruthy();
  });
});
