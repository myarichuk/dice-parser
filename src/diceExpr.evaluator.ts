import rollDice from './dice.evaluator';
import {Dice, DiceExpression} from './types';
import {isDice, isDiceExpression, isNumeric} from './utils';

export default function evaluateDiceExpression(
  expr: DiceExpression | Dice | number
): number {
  if (isNumeric(expr)) return expr;

  if (isDice(expr)) return rollDice(expr);

  let result = 0;

  for (const operand of expr.operands) {
    if (isNumeric(operand))
      result = evaluateOperator(expr.operator, result, operand);
    else if (isDice(operand))
      result = evaluateOperator(expr.operator, result, rollDice(operand));
    else if (isDiceExpression(operand)) {
      result = evaluateOperator(
        expr.operator,
        result,
        evaluateDiceExpression(operand)
      );
    } else
      throw new Error(`Encountered unrecognized type for value ${operand}`);
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
