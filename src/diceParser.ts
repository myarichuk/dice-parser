import {C, N, F, Tuple} from '@masala/parser';

export interface Dice {
  diceCount: number;
  diceSides: number;
}

export const diceParser = F.try(N.digits())
  .or(F.returns(1))
  .then(C.charIn('dD').drop())
  .then(N.integer())
  .map((parsed: Tuple<number>) => {
    return {
      diceCount: parsed.value.length === 1 ? 1 : parsed.first(),
      diceSides: parsed.last(),
    } as Dice;
  });
