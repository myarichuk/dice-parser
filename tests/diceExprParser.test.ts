// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {diceExprParser} from '../src/diceExprParser';
import {Streams} from '@masala/parser';

describe('diceExprParser', () => {
  it.each`
    expr     | diceCount | diceSides
    ${'d12'} | ${1}      | ${12}
    ${'3d4'} | ${3}      | ${4}
    ${'2d9'} | ${2}      | ${9}
  `("should successfully parse '$expr'", ({expr, diceCount, diceSides}) => {
    const parsed = diceExprParser.parse(Streams.ofString(expr));

    expect(parsed.isAccepted()).toBeTruthy(); //sanity check

    const parsedDice = parsed.value;
    expect(parsedDice.diceCount).toBe(diceCount);
    expect(parsedDice.diceSides).toBe(diceSides);
  });

  it('should fail when dice sides is missing', () => {
    const parsed = diceExprParser.parse(Streams.ofString('3d'));
    expect(parsed.isAccepted()).toBeFalsy();
  });
});
