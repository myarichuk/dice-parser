// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {maybeMultDivExpr} from '../src/maybeMultDivExpr';
import {Streams} from '@masala/parser';

describe('maybeMultExpr', () => {
  it.each`
    expr           | left                            | op     | right
    ${'66 *   12'} | ${66}                           | ${'*'} | ${12}
    ${'66 / 12'}   | ${66}                           | ${'/'} | ${12}
    ${'6d4 / 12'}  | ${{diceCount: 6, diceSides: 4}} | ${'/'} | ${12}
    ${'12 * 3d4'}  | ${12}                           | ${'*'} | ${{diceCount: 3, diceSides: 4}}
  `(
    "should successfully parse two-operand '$expr'",
    ({expr, left, op, right}) => {
      const parsed = maybeMultDivExpr().parse(Streams.ofString(expr));
      expect(parsed.isAccepted()).toBe(true); //sanity check

      const parsedRight = parsed.value.array()[2];
      const parsedLeft = parsed.value.array()[0];
      const parsedOp = parsed.value.array()[1];
      expect(parsedLeft).toEqual(left);
      expect(parsedOp).toBe(op);
      expect(parsedRight).toEqual(right);
    }
  );

  it.each`
    expr                | left                            | op1    | middle                           | op2    | right
    ${'6 * 3d12 / 4'}   | ${6}                            | ${'*'} | ${{diceCount: 3, diceSides: 12}} | ${'/'} | ${4}
    ${'2d6 * 6 * 3d10'} | ${{diceCount: 2, diceSides: 6}} | ${'*'} | ${6}                             | ${'*'} | ${{diceCount: 3, diceSides: 10}}
  `(
    "should successfully parse three-operand '$expr'",
    ({expr, left, op1, middle, op2, right}) => {
      const parsed = maybeMultDivExpr().parse(Streams.ofString(expr));
      //TODO: split this test into TWO operands and more than two operands (parsed.value is an array that contains all of the values in sequence)
      expect(parsed.isAccepted()).toBe(true); //sanity check

      const resultArray = parsed.value.array();

      const parsedLeft = resultArray[0];
      const parsedOp1 = resultArray[1];
      const parsedMiddle = resultArray[2];
      const parsedOp2 = resultArray[3];
      const parsedRight = resultArray[4];

      expect(parsedLeft).toEqual(left);
      expect(parsedMiddle).toEqual(middle);
      expect(parsedRight).toEqual(right);

      expect(parsedOp1).toBe(op1);
      expect(parsedOp2).toBe(op2);
    }
  );
});
