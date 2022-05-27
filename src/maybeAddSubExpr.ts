import {F, TupleParser} from '@masala/parser';
import {whitespace, addOrSubOperator} from './common';
import {maybeMultDivExpr} from './maybeMultDivExpr';

// eslint-disable-next-line prettier/prettier
export function maybeAddSubExpr(): TupleParser<unknown> {
  return maybeMultDivExpr()
    .then(whitespace)
    .then(
      addOrSubOperator.then(whitespace).then(F.lazy(maybeMultDivExpr)).optrep()
    );
}
