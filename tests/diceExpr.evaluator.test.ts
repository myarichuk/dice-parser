import {diceExprParser} from '../src/diceExpr.parser';
import {Streams} from '@masala/parser';
import evaluateDiceExpression from '../src/diceExpr.evaluator';
import {DiceExpression} from '../src/types';
import exp from 'constants';

function assertResults(
  diceExpr: DiceExpression,
  expectedMin: number,
  expectedMax: number
) {
  for (let i = 0; i < 100; i++) {
    const result = evaluateDiceExpression(diceExpr);
    expect(result).toBeGreaterThanOrEqual(expectedMin);
    expect(result).toBeLessThanOrEqual(expectedMax);
  }
}

describe('rollDiceExpression', () => {
  it('can correctly evaluate scalars', () => {
    const diceExpression = diceExprParser().parse(
      Streams.ofString('123')
    ).value;

    expect(evaluateDiceExpression(diceExpression)).toBe(123);
  });

  it('can correctly evaluate 3d6', () => {
    const diceExpression = diceExprParser().parse(
      Streams.ofString('3d6')
    ).value;

    expect(evaluateDiceExpression(diceExpression)).toBeGreaterThanOrEqual(3);
    expect(evaluateDiceExpression(diceExpression)).toBeLessThanOrEqual(18);
  });

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
