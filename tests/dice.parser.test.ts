// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {diceParser} from '../src/dice.parser';
import {Streams} from '@masala/parser';

describe('diceParser', () => {
  it.each`
    expr     | diceCount | diceSides
    ${'d12'} | ${1}      | ${12}
    ${'3d4'} | ${3}      | ${4}
    ${'2d9'} | ${2}      | ${9}
  `("should successfully parse '$expr'", ({expr, diceCount, diceSides}) => {
    const parsed = diceParser().parse(Streams.ofString(expr));

    expect(parsed.isAccepted()).toBeTruthy(); //sanity check

    const parsedDice = parsed.value;
    expect(parsedDice.diceCount).toBe(diceCount);
    expect(parsedDice.diceSides).toBe(diceSides);
  });

  it('should fail when dice sides is missing', () => {
    const parsed = diceParser().parse(Streams.ofString('3d'));
    expect(parsed.isAccepted()).toBeFalsy();
  });
});
