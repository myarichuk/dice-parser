import {C, F, N, SingleParser, Tuple} from '@masala/parser';
import {diceExprParser} from './diceExprParser';
import {BinaryExpression} from './types';

const operator = C.charIn('+-*/');
const whitespace = C.char(' ').optrep().drop();
const constantExprParser = N.digits();
const operand = F.try(diceExprParser).or(constantExprParser); //if not a dice expression -> backtrack

export function extDiceExprParser(): SingleParser<BinaryExpression> {
  return operand
    .then(whitespace)
    .then(operator)
    .then(whitespace)
    .then(F.try(F.lazy(extDiceExprParser)).or(operand))
    .eos()
    .map((parsed: Tuple<unknown>) => {
      return {
        left: parsed.value[0],
        operator: parsed.value[1],
        right: parsed.value[2],
      } as BinaryExpression;
    });
}

// export const extDiceExprParser = operand
//   .then(whitespace) //ignore whitespaces
//   .then(operator)
//   .then(whitespace) //ignore whitespaces
//   .then(operand)
//   .map((parsed: Tuple<unknown>) => {
//     return {
//       left: parsed.value[0],
//       operator: parsed.value[1],
//       right: parsed.value[2],
//     } as BinaryExpression;
//   });
