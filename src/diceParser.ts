import {digits, choice, char, sequenceOf} from 'arcsecond';

// char and str will parse specific sequences
const diceLetter = choice([char('d'), char('D')]);
export const diceParser = sequenceOf([digits, diceLetter, digits]);
