import {
  C,
  F,
  N,
  SingleParser,
  Tuple,
  TupleParser,
  Option,
} from '@masala/parser';
import {diceExprParser} from './diceExprParser';
import {BinaryExpression, Dice} from './types';

/*
The idea
========
Multiplicand := Number
              | "(" ^ Expression ^ ")"
Adddend      := Multiplicand ^ (("*" | "/") ^ Multiplicand)*
Expression   := Addend       ^ (("+" | "-") ^ Addend)*
*/

const addOrSubOperator = C.charIn('+-');
const multOrDivOperator = C.charIn('*/');
const whitespace = C.char(' ').optrep().drop();

function parenthesis(par: string) {
  return C.char(' ').optrep().drop().then(C.char(par));
}

//note that in this case there is no operator precedence (* or / should be evaluated before + or -)
export function extDiceExprParser(): SingleParser<BinaryExpression> {
  return expr()
    .eos()
    .map((parsed: Tuple<unknown>) => {
      return {
        left: parsed.value[0],
        operator: parsed.value[1],
        right: parsed.value[2],
      } as BinaryExpression;
    });
}

function expr(): any {
  throw new Error();
}

function parenthesisExpr() {
  return parenthesis('(')
    .then(whitespace.drop())
    .then(F.lazy(expr))
    .then(parenthesis(')').then(whitespace.drop()));
}

export const terminalExpr = F.try(diceExprParser).or(N.digits());

// eslint-disable-next-line prettier/prettier
export function maybeMultExpr(): TupleParser<unknown> {
  return terminalExpr
    .then(whitespace)
    .then(
      multOrDivOperator.then(whitespace).then(F.lazy(maybeMultExpr)).optrep()
    );
}
