/*
The idea:
---------
terminal := dice | number | "(" ^ diceExpr ^ ")"
multExpr := terminal ^ (("*" | "/") ^ terminal)*
diceExpr := multExpr ^ (("+" | "-") ^ multExpr)*
*/

import {C, F, N, SingleParser, TupleParser, Tuple} from '@masala/parser';
import {addOrSubOperator, multOrDivOperator, whitespace} from './common';
import {diceParser} from './diceParser';
import {Dice, DiceExpression} from './types';
import {parsedToAst} from './utils';

function terminal(): TupleParser<unknown> {
  return F.try(F.try(diceParser()).or(N.digits())).or(parenthesis());
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

function parenthesis(): TupleParser<unknown> {
  return C.char('(')
    .drop()
    .then(whitespace)
    .then(F.lazy(diceExprParser))
    .then(whitespace)
    .then(C.char(')').drop());
}

export function diceExprParser(): SingleParser<DiceExpression | Dice | number> {
  return addend()
    .then(whitespace)
    .then(
      addOrSubOperator.then(whitespace).then(addend().then(whitespace)).optrep()
    )
    .map((parsed: Tuple<unknown>) => parsedToAst(parsed));
}
