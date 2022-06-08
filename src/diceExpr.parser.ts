/*
The idea:
---------
terminal := dice | number | "(" ^ diceExpr ^ ")"
multExpr := terminal ^ (("*" | "/") ^ terminal)*
diceExpr := multExpr ^ (("+" | "-") ^ multExpr)*
credit for the awesome explanation: https://medium.com/@armin.heller/parser-combinator-gotchas-2792deac4531
*/

import {C, F, N, SingleParser, TupleParser, Tuple} from '@masala/parser';
import {diceParser} from './dice.parser';
import {Dice, DiceExpression} from './types';
import {parsedToAst as parseToAst} from './utils';

const addOrSubOperator = C.charIn('+-');
const multOrDivOperator = C.charIn('*/');
const whitespace = C.char(' ').optrep().drop();

function terminal(): TupleParser<unknown> {
  return F.try(F.try(diceParser()).or(N.digits())).or(parenthesis());
}

function multExpr(): SingleParser<unknown> {
  return terminal()
    .then(whitespace)
    .then(
      multOrDivOperator
        .then(whitespace)
        .then(terminal().then(whitespace))
        .optrep()
    )
    .map(parseToAst);
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
  return multExpr()
    .then(whitespace)
    .then(
      addOrSubOperator
        .then(whitespace)
        .then(multExpr().then(whitespace))
        .optrep()
    )
    .map((parsed: Tuple<unknown>) => parseToAst(parsed));
}
