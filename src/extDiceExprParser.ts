import {C, F, Tuple} from '@masala/parser';
import {diceExprParser} from './diceExprParser';
import {constantExprParser} from './constantExprParser';
import {Dice} from './types';

export interface BinaryExpression {
  left: number | Dice;
  operator: string;
  right: number | Dice;
}

const binaryOperator = () => C.charIn('+-*/');

const operand = F.try(diceExprParser).or(constantExprParser);

export const extDiceExprParser = operand
  .then(C.char(' ').optrep().drop()) //ignore whitespaces
  .then(binaryOperator())
  .then(C.char(' ').optrep().drop()) //ignore whitespaces
  .then(operand)
  .map((parsed: Tuple<unknown>) => {
    return {
      left: parsed.value[0],
      operator: parsed.value[1],
      right: parsed.value[2],
    } as BinaryExpression;
  });