/*
The idea:
---------
terminal := dice | Number | "(" ^ Expression ^ ")"
multExpr      := terminal ^ (("*" | "/") ^ terminal)*
diceExpr   := multExpr    ^ (("+" | "-") ^ multExpr)*
*/

import {C, F, N, SingleParser, TupleParser, Tuple} from '@masala/parser';
import {addOrSubOperator, multOrDivOperator} from './common';
import {diceParser} from './diceParser';
import {BinaryExpression} from './types';

const parenthesisExpression: TupleParser<unknown> = C.char('(')
  .drop()
  .then(F.lazy(diceExprParser))
  .then(C.char(')').drop());

export function terminal(): TupleParser<unknown> {
  return F.try(F.try(diceParser()).or(N.digits())).or(parenthesisExpression);
}

export function addend(): TupleParser<unknown> {
  return F.lazy(terminal).then(
    multOrDivOperator.then(F.lazy(terminal)).optrep()
  );
}

export function diceExprParser(): TupleParser<unknown> {
  return F.lazy(addend).then(addOrSubOperator.then(F.lazy(addend)).optrep());
}
