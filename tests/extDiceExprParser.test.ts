// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {extDiceExprParser} from '../src/extDiceExprParser';
import {Streams} from '@masala/parser';

describe('extDiceExprParser', () => {
  it.each`
    expr                | left                            | op     | right
    ${'3+4'}            | ${3}                            | ${'+'} | ${4}
    ${'66 *   12'}      | ${66}                           | ${'*'} | ${12}
    ${'6d4 - 12'}       | ${{diceCount: 6, diceSides: 4}} | ${'-'} | ${12}
    ${'6 + 3d12'}       | ${6}                            | ${'+'} | ${{diceCount: 3, diceSides: 12}}
    ${'6 + 3d12 * 4'}   | ${6}                            | ${'+'} | ${{left: {diceCount: 3, diceSides: 12}, operator: '*', right: 4}}
    ${'2d6 + 6 * 3d10'} | ${{diceCount: 2, diceSides: 6}} | ${'+'} | ${{left: 6, operator: '*', right: {diceCount: 3, diceSides: 10}}}
  `("should successfully parse '$expr'", ({expr, left, op, right}) => {
    const parsed = extDiceExprParser().parse(Streams.ofString(expr));

    expect(parsed.isAccepted()).toBe(true); //sanity check
    expect(parsed.value.operator).toBe(op);
    expect(parsed.value.left).toEqual(left);
    expect(parsed.value.right).toEqual(right);
  });

  it.each(['3+', '+4', '2d6+', '2d6+4d', '+ 4d6'])(
    'should fail parsing %s',
    expr => {
      const parsed = extDiceExprParser().parse(Streams.ofString(expr));
      expect(parsed.isAccepted()).toBe(false);
    }
  );
});
