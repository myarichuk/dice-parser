import {F, TupleParser} from '@masala/parser';
import {whitespace, multOrDivOperator} from './common';
import {terminalExpr} from './terminalExpr';

// eslint-disable-next-line prettier/prettier
export function maybeMultDivExpr(): TupleParser<unknown> {
  return terminalExpr()
    .then(whitespace)
    .then(
      multOrDivOperator.then(whitespace).then(F.lazy(maybeMultDivExpr)).optrep()
    );
}
