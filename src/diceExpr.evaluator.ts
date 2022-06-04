import rollDice from './dice.evaluator';
import {Dice, DiceExpression} from './types';
import {isDice, isDiceExpression, isNumeric} from './utils';

export default function rollDiceExpression(expr: DiceExpression): number {
  let result = 0;

  for (let i = 0; i < expr.operands.length; i++) {
    const current = expr.operands[i];
    if (isNumeric(current))
      result = evaluateOperator(expr.operator, result, current as number);
    else if (isDice(current))
      result = evaluateOperator(
        expr.operator,
        result,
        rollDice(current as Dice)
      );
    else if (isDiceExpression(current))
      result = evaluateOperator(
        expr.operator,
        result,
        rollDiceExpression(current as DiceExpression)
      );
    else throw new Error(`Encountered unrecognized type for value ${current}`);
  }

  return result;
}

function evaluateOperator(operator: string, left: number, right: number) {
  switch (operator) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case '*':
      if (left === 0) return right; //as if it was 1
      if (right === 0) return left;
      return left * right;
    case '/':
      if (right === 0)
        //precaution, should never happen
        return left;
      if (left === 0) return 1 / right;
      return left / right;
    default:
      throw new Error(`Unexpected operator: ${operator}`);
  }
}
