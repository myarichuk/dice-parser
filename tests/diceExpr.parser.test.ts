import {Streams} from '@masala/parser';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {diceExprParser} from '../src/diceExpr.parser';

describe('diceExprParser', () => {
  it.each`
    expr              | result
    ${'123'}          | ${123}
    ${'2d6'}          | ${{diceCount: 2, diceSides: 6}}
    ${'3+4'}          | ${{operands: [3, 4], operator: '+'}}
    ${'3+(4)'}        | ${{operands: [3, 4], operator: '+'}}
    ${'3+((4))'}      | ${{operands: [3, 4], operator: '+'}}
    ${'(3-((4)))'}    | ${{operands: [3, 4], operator: '-'}}
    ${'6*5+3'}        | ${{operands: [{operands: [6, 5], operator: '*'}, 3], operator: '+'}}
    ${'(6* 5)+3'}     | ${{operands: [{operands: [6, 5], operator: '*'}, 3], operator: '+'}}
    ${'2d9+  4'}      | ${{operands: [{diceCount: 2, diceSides: 9}, 4], operator: '+'}}
    ${'2d9 +4+ 5d8'}  | ${{operands: [{diceCount: 2, diceSides: 9}, 4, {diceCount: 5, diceSides: 8}], operator: '+'}}
    ${'(2d9 +4)*5d8'} | ${{operands: [{operands: [{diceCount: 2, diceSides: 9}, 4], operator: '+'}, {diceCount: 5, diceSides: 8}], operator: '*'}}
    ${'2d9 +4* 5d8'}  | ${{operands: [{diceCount: 2, diceSides: 9}, {operands: [4, {diceCount: 5, diceSides: 8}], operator: '*'}], operator: '+'}}
  `("should successfully parse '$expr'", ({expr, result}) => {
    const parsed = diceExprParser().parse(Streams.ofString(expr));

    expect(parsed.isAccepted()).toBeTruthy(); //sanity check

    const parsedDice = parsed.value;
    expect(parsedDice).toEqual(result);
  });
});
