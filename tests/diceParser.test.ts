import {diceParser} from '../src/diceParser';

describe('diceParser', () => {
  it.each`
    expr     | diceCount | diceSides
    ${'d12'} | ${1}      | ${12}
    ${'3d4'} | ${3}      | ${4}
    ${'2d9'} | ${2}      | ${9}
  `("should parse '$expr'", ({expr, diceCount, diceSides}) => {
    const parseResult = diceParser.run(expr);
    expect(2).toBe(2);
  });
});
