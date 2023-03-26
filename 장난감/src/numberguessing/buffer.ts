import { Buffer } from 'node:buffer';

const NEW_LINE = '\n'
const SELECT_MODE_MESSAGE = `1: Single player game${(NEW_LINE)}2: Multiplayer game${(NEW_LINE)}3: Exit${(NEW_LINE)}Enter selection`;

// let buffer = Buffer.from(SELECT_MODE_MESSAGE);
let buffer = Buffer.alloc(1000).fill(0);
buffer.write(SELECT_MODE_MESSAGE);
console.log(`buffer: ${buffer.toString()}`);

buffer.write(`Single player game${NEW_LINE}I'm thinking of a number between 1 and 100.${NEW_LINE}Enter your guess: `);
console.log(`buffer: ${buffer.toString()}`);
