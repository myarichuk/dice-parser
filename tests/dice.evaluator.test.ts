import {diceParser} from '../src/dice.parser';
import {Streams} from '@masala/parser';
import rollDice from '../src/dice.evaluator';
import {getDiceMinMax} from '../src/utils';

describe('rollDice', () => {
  it.each(['2d6', '3d9', 'd6', '12d12', '12d100'])(
    'should succeed rolling dice for %s',
    diceAsString => {
      const dice = diceParser().parse(Streams.ofString(diceAsString)).value;
      const minMax = getDiceMinMax(dice);
      const roll = rollDice(dice);

      expect(roll).toBeGreaterThanOrEqual(minMax.min);
      expect(roll).toBeLessThanOrEqual(minMax.max);
    }
  );

  it('should throw if dice count is zero', () => {
    expect(() => rollDice({diceCount: 0, diceSides: 5})).toThrow(
      'invalid dice count, cannot be zero!'
    );
  });

  it.each([0, 1])('should throw if dice sides is %d', diceSidesCount => {
    expect(() => rollDice({diceCount: 4, diceSides: diceSidesCount})).toThrow(
      'invalid dice side count, cannot be less or equal than one!'
    );
  });
});
