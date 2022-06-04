import {diceExprParser} from '../src/diceExpr.parser';
import {Streams} from '@masala/parser';
import rollDiceExpression from '../src/diceExpr.evaluator';
import {DiceExpression} from '../src/types';

function assertResults(
  diceExpr: DiceExpression,
  expectedMin: number,
  expectedMax: number
) {
  for (let i = 0; i < 100; i++) {
    const result = rollDiceExpression(diceExpr);
    expect(result).toBeGreaterThanOrEqual(expectedMin);
    expect(result).toBeLessThanOrEqual(expectedMax);
  }
}

describe('rollDiceExpression', () => {
  it('can correctly evaluate 3d6 + 5', () => {
    const diceExpression = diceExprParser().parse(Streams.ofString('3d6+5'))
      .value as DiceExpression;

    assertResults(diceExpression, 8, 23);
  });

  it('can correctly evaluate 3d6 + 5 * 2d4', () => {
    const diceExpression = diceExprParser().parse(
      Streams.ofString('3d6 + 5 * 2d4')
    ).value as DiceExpression;
    assertResults(diceExpression, 13, 58);
  });

  it('can correctly evaluate (3d6 + 5) * 2d4', () => {
    const diceExpression = diceExprParser().parse(
      Streams.ofString('(3d6 + 5) * 2d4')
    ).value as DiceExpression;
    assertResults(diceExpression, 16, 184);
  });
});
