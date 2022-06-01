/*
The idea:
---------
terminal := dice | number | "(" ^ diceExpr ^ ")"
multExpr := terminal ^ (("*" | "/") ^ terminal)*
diceExpr := multExpr ^ (("+" | "-") ^ multExpr)*
*/

import {C, F, N, SingleParser, TupleParser} from '@masala/parser';
import {addOrSubOperator, multOrDivOperator, whitespace} from './common';
import {diceParser} from './diceParser';
import {parsedToAst} from './utils';

const parenthesisExpression: TupleParser<unknown> = C.char('(')
  .drop()
  .then(whitespace)
  .then(F.lazy(diceExprParser))
  .then(whitespace)
  .then(C.char(')').drop());

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
