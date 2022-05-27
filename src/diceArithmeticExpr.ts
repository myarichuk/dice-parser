import {C, SingleParser, Tuple} from '@masala/parser';
import {maybeAddSubExpr} from './maybeAddSubExpr';
import {DiceArithmetic as DiceArithmetic} from './types';

/*
The idea
========
terminal         := Number | "(" ^ diceExpresison ^ ")"
maybemult        := terminal ^ (("*" | "/") ^ maybemult)*
diceExpresison   := maybemult       ^ (("+" | "-") ^ maybemult)*
*/

//note that in this case there is no operator precedence (* or / should be evaluated before + or -)
export function diceArithmeticExpr(): SingleParser<DiceArithmetic> {
  return maybeAddSubExpr()
    .eos()
    .map((parsed: Tuple<unknown>) => {
      return {
        left: parsed.value[0],
        operator: parsed.value[1],
        right: parsed.value[2],
      } as DiceArithmetic;
    });
}
