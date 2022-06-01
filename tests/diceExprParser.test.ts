import {Streams} from '@masala/parser';
import {diceExprParser} from '../src/diceExprParser';
describe('diceExprParser', () => {
  it('should successfully parse 2d6+3', () => {
    const parsed = diceExprParser().parse(Streams.ofString('2d6+4d8*3d9'));
    expect(parsed.isAccepted()).toBeTruthy(); //sanity check
  });
});
