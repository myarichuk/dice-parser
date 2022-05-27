import {Streams} from '@masala/parser';
import {terminalExpr} from '../src/terminalExpr';

describe('terminalExpr', () => {
  it('should parse constant number', () => {
    const parsed = terminalExpr().parse(Streams.ofString('1234'));

    expect(parsed.isAccepted()).toBe(true);
    expect(parsed.value).toBe(1234);
  });

  it('should parse simple dice expr', () => {
    const parsed = terminalExpr().parse(Streams.ofString('3d6'));

    expect(parsed.isAccepted()).toBe(true);
    expect(parsed.value).toEqual({diceCount: 3, diceSides: 6});
  });
});
