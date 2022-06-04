import {C, N, F, Tuple, SingleParser} from '@masala/parser';
import {Dice} from './types';

export function diceParser(): SingleParser<Dice> {
  return F.try(N.digits())
    .or(F.returns(1)) //try fails -> this means no digit -> then return constant value
    .then(C.charIn('dD').drop())
    .then(N.digits())
    .map((parsed: Tuple<number>) => {
      return {
        diceCount: parsed.first(),
        diceSides: parsed.last(),
      } as Dice;
    });
}
