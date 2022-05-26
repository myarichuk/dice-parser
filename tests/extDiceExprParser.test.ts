import {extDiceExprParser} from '../src/extDiceExprParser';
import {Streams} from '@masala/parser';

describe('extDiceExprParser', () => {
  it.each`
    expr           | left                            | op     | right
    ${'3+4'}       | ${3}                            | ${'+'} | ${4}
    ${'66 *   12'} | ${66}                           | ${'*'} | ${12}
    ${'6d4 - 12'}  | ${{diceCount: 6, diceSides: 4}} | ${'-'} | ${12}
    ${'6 + 3d12'}  | ${6}                            | ${'+'} | ${{diceCount: 3, diceSides: 12}}
  `("should successfully parse '$expr'", ({expr, left, op, right}) => {
    const parsed = extDiceExprParser.parse(Streams.ofString(expr));

    expect(parsed.isAccepted()).toBeTruthy(); //sanity check
    expect(parsed.value.operator).toBe(op);
    expect(parsed.value.left).toEqual(left);
    expect(parsed.value.right).toEqual(right);
  });
});
