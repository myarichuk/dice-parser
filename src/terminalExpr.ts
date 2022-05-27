import {F, N} from '@masala/parser';
import {diceExpr} from './diceExpr';

export function terminalExpr() {
  return F.try(diceExpr()).or(N.digits());
}
