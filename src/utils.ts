import {DiceExpression} from './types';
import {Tuple} from '@masala/parser';

export function isNumeric(val: unknown): val is number {
  return !isNaN(val as number);
}

export const parsedToAst = (parsed: Tuple<unknown>) => {
  if (parsed.size() === 1) {
    return parsed.at(0);
  } else {
    return {
      operands: parsed
        .array()
        .filter(val => typeof val === 'object' || isNumeric(val)),
      operator: parsed
        .array()
        .find(val => typeof val !== 'object' && !isNumeric(val)),
    } as DiceExpression;
  }
};
