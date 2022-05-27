import {C, F} from '@masala/parser';
import {whitespace} from './common';
import {diceArithmeticExpr} from './diceArithmeticExpr';

function parenthesis(par: string) {
  return C.char(' ').optrep().drop().then(C.char(par));
}

export function parenthesisExpr() {
  return parenthesis('(')
    .then(whitespace.drop())
    .then(F.lazy(diceArithmeticExpr))
    .then(parenthesis(')').then(whitespace.drop()));
}
