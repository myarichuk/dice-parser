import {Dice, DiceExpression} from './types';
import {Tuple} from '@masala/parser';

export function isNumeric(val: unknown): val is number {
  return !isNaN(val as number);
}

export function isDice(object: unknown): object is Dice {
  return (
    Object.prototype.hasOwnProperty.call(object, 'diceCount') &&
    Object.prototype.hasOwnProperty.call(object, 'diceSides')
  );
}

export function isDiceExpression(object: unknown): object is DiceExpression {
  return (
    Object.prototype.hasOwnProperty.call(object, 'operands') &&
    Object.prototype.hasOwnProperty.call(object, 'operator')
  );
}

export const parsedToAst = (
  parsed: Tuple<unknown>
): DiceExpression | Dice | number => {
  if (parsed.size() === 1) {
    const result = parsed.at(0);
    if (isNumeric(result)) return result as number;
    if (isDice(result)) return result as Dice;
    if (isDiceExpression(result)) return result as DiceExpression;
    throw new Error(
      'parser yielded unexpected type, expected either a Dice or a number'
    );
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
