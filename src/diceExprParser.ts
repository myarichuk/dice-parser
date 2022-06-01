/*
The idea:
---------
terminal := dice | Number | "(" ^ Expression ^ ")"
multExpr := terminal ^ (("*" | "/") ^ terminal)*
diceExpr := multExpr ^ (("+" | "-") ^ multExpr)*
*/

import {C, F, N, SingleParser, TupleParser, Tuple} from '@masala/parser';
import {addOrSubOperator, multOrDivOperator, whitespace} from './common';
import {diceParser} from './diceParser';
import {DiceExpression} from './types';

const parenthesisExpression: TupleParser<unknown> = C.char('(')
  .drop()
  .then(whitespace)
  .then(F.lazy(diceExprParser))
  .then(whitespace)
  .then(C.char(')').drop());

function isNumeric(val: unknown): val is number {
  return !isNaN(val as number);
}

const parsedToAst = (parsed: Tuple<unknown>) => {
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

function terminal(): TupleParser<unknown> {
  return F.try(F.try(diceParser()).or(N.digits())).or(parenthesisExpression);
}

function addend(): SingleParser<unknown> {
  return terminal()
    .then(whitespace)
    .then(
      multOrDivOperator
        .then(whitespace)
        .then(terminal().then(whitespace))
        .optrep()
    )
    .map(parsedToAst);
}

export function diceExprParser(): SingleParser<unknown> {
  return addend()
    .then(whitespace)
    .then(
      addOrSubOperator.then(whitespace).then(addend().then(whitespace)).optrep()
    )
    .map(parsedToAst);
}
